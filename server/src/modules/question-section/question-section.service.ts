import { REDIS_KEYS } from '@/constants/common'
import { getTableColumnsInQuery, jsonBuildObject } from '@/database/helper'
import {
    question_sections,
    questions as sQuestions,
    tests,
} from '@/database/schema'
import { HttpException } from '@/exceptions/http-exception'
import { CRUDBaseService, TGetPagingQuery } from '@/libs/api'
import { redis } from '@/libs/redis'
import { getFirstNumberInString } from '@/utils/common'
import {
    and,
    asc,
    eq,
    getTableColumns,
    inArray,
    notInArray,
    sql,
} from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'
import { isEmpty } from 'lodash'
import { Service } from 'typedi'
import { TPracticePart } from '../history'
import { HistoryService } from '../history/history.service'
import { KitTestService } from '../kit-test'
import { SectionService, TSection } from '../section'
import {
    CreateQuestionDto,
    QueryQuestionSectionDto,
} from './question-section.dto'
import { TQuestionSection } from './question-section.type'

@Service()
export class QuestionSectionService extends CRUDBaseService<
    CreateQuestionDto,
    Partial<CreateQuestionDto>,
    TQuestionSection
> {
    constructor(
        private readonly historyService: HistoryService,
        private readonly sectionService: SectionService,
        private readonly kitTestService: KitTestService,
    ) {
        super(question_sections)
    }

    async create<T = TQuestionSection>(data: CreateQuestionDto) {
        try {
            const {
                imageUrls,
                location,
                part,
                questions,
                teaser,
                audioUrl,
                testKitId,
            } = data

            const questionSection = await this.db.transaction(async (trx) => {
                const [questionSection] = await trx
                    .insert(question_sections)
                    .values({
                        imageUrls,
                        location,
                        part,
                        teaser,
                        audioUrl,
                        testKitId,
                    })
                    .returning()

                if (questions.length > 0) {
                    await trx.insert(sQuestions).values(
                        questions.map((question) => ({
                            ...question,
                            question_section_id: questionSection.id,
                        })),
                    )
                }

                return questionSection as T
            })

            return questionSection
        } catch (error) {
            if (error?.code === '23505') {
                throw new HttpException(
                    StatusCodes.CONFLICT,
                    'This question section already exists.',
                )
            }

            throw error
        }
    }

    async getPaging({ query }: TGetPagingQuery<QueryQuestionSectionDto>) {
        const { testKitId, part, ...rest } = query
        const { items, total } = await super.getPaging({
            query: rest,
            opts: {
                wheres: [
                    testKitId
                        ? eq(question_sections.testKitId, testKitId)
                        : undefined,
                    part ? eq(question_sections.part, part) : undefined,
                ],
                selectFields: {
                    ...getTableColumns(question_sections),
                    test_kit: jsonBuildObject(getTableColumns(tests)),
                },
            },
            callback(query) {
                return query.leftJoin(
                    tests,
                    eq(tests.id, question_sections.testKitId),
                )
            },
        })

        return {
            items,
            total,
        }
    }

    async getOneById(
        id: string,
        opts?: {
            throwIfNotFound?: boolean
            message?: string
        },
    ) {
        const sectionQuestion = await this.db.query.question_sections.findFirst(
            {
                where: eq(question_sections.id, id),
                with: {
                    questions: true,
                    test_kit: true,
                },
            },
        )

        if (isEmpty(sectionQuestion) && opts?.throwIfNotFound) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                opts?.message || `Could not find question with this id.`,
            )
        }

        return sectionQuestion
    }

    async getForPractice({
        numOfQuestions,
        part,
        userId,
        ref,
    }: {
        numOfQuestions: number
        part: any
        userId: string
        ref?: string
    }) {
        part = Number(part) as TPracticePart['part']

        // get questions to practice again base on history ref
        if (ref) {
            const sectionQuestionIds =
                await this.historyService.getQuestionIdsToPracticeAgain(ref)

            if (!sectionQuestionIds.length) {
                return []
            }

            return this.getSectionQuestionsByIds(sectionQuestionIds)
        }

        const sectionQuestionsPracticed =
            await this.historyService.getQuestionIdsInPartPracticed({
                part,
                userId,
            })

        const sectionQuestions = await this.db.query.question_sections.findMany(
            {
                where: and(
                    eq(question_sections.part, part),
                    sectionQuestionsPracticed.length > 0
                        ? notInArray(
                              question_sections.id,
                              sectionQuestionsPracticed,
                          )
                        : undefined,
                ),
                with: {
                    questions: true,
                },
                limit: numOfQuestions,
                orderBy: sql`random()`,
            },
        )

        return sectionQuestions
    }

    async getSectionQuestionsByIds(ids: string[]) {
        const section_questions =
            await this.db.query.question_sections.findMany({
                where: inArray(question_sections.id, ids),
                with: {
                    questions: true,
                },
            })

        return section_questions.sort((a, b) => {
            return ids.indexOf(a.id) - ids.indexOf(b.id)
        })
    }

    async getSectionQuestionsByTestIdAndPart({
        part,
        testId,
    }: {
        testId: string
        part: TQuestionSection['part']
    }) {
        const sectionQuestions = await this.db.query.question_sections.findMany(
            {
                where: and(
                    eq(question_sections.testKitId, testId),
                    eq(question_sections.part, part),
                ),
                with: {
                    questions: {
                        columns: getTableColumnsInQuery(sQuestions),
                        orderBy: asc(sQuestions.location),
                    },
                },
            },
        )

        return sectionQuestions.sort((a, b) => {
            const aNumber = a.location.includes('-')
                ? getFirstNumberInString(a.location)
                : Number(a.location)
            const bNumber = b.location.includes('-')
                ? getFirstNumberInString(b.location)
                : Number(b.location)
            return aNumber - bNumber
        })
    }

    async getForTest({ kitTestId }: { kitTestId: string }) {
        const cached = await redis.get(REDIS_KEYS.TEST_QUESTIONS(kitTestId))

        if (cached) {
            return JSON.parse(cached) as Array<TQuestionSection | TSection>
        }

        await this.kitTestService.getOneById(kitTestId, {
            throwIfNotFound: true,
        })

        const parts = [1, 2, 3, 4, 5, 6, 7] as TQuestionSection['part'][]

        const partsQuestions = await Promise.all(
            parts.map((part) =>
                this.getSectionQuestionsByTestIdAndPart({
                    part,
                    testId: kitTestId,
                }),
            ),
        )

        const sections = await this.sectionService.getSectionsMapPart()

        const result: Array<
            | TQuestionSection
            | {
                  type?: any
                  section?: TSection
              }
        > = []

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i]
            const section = sections[part]
            const sectionQuestions = partsQuestions[i]

            result.push(
                ...[
                    {
                        type: 'info',
                        section,
                    },
                    ...sectionQuestions,
                ],
            )
        }

        await redis.set(
            REDIS_KEYS.TEST_QUESTIONS(kitTestId),
            JSON.stringify(result),
            'EX',
            60 * 60 * 24,
        )

        return result
    }
}
