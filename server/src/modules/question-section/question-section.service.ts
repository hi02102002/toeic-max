import { jsonBuildObject } from '@/database/helper'
import {
    question_sections,
    questions as sQuestions,
    tests,
} from '@/database/schema'
import { HttpException } from '@/exceptions/http-exception'
import { CRUDBaseService, TGetPagingQuery } from '@/libs/api/crud-service'
import { and, eq, getTableColumns, inArray, notInArray, sql } from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'
import { isEmpty } from 'lodash'
import { Service } from 'typedi'
import { TPracticePart } from '../history'
import { HistoryService } from '../history/history.service'
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
    constructor(private readonly historyService: HistoryService) {
        super(question_sections, 'Question')
    }

    async create<T = TQuestionSection>(data: CreateQuestionDto) {
        try {
            const {
                image_urls,
                location,
                part,
                questions,
                teaser,
                audio_url,
                test_kit_id,
            } = data

            const questionSection = await this.db.transaction(async (trx) => {
                const [questionSection] = await trx
                    .insert(question_sections)
                    .values({
                        image_urls,
                        location,
                        part,
                        teaser,
                        audio_url,
                        test_kit_id,
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
        const { test_kit_id, part, ...rest } = query
        const { items, total } = await super.getPaging({
            query: rest,
            opts: {
                wheres: [
                    test_kit_id
                        ? eq(question_sections.test_kit_id, test_kit_id)
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
                    eq(tests.id, question_sections.test_kit_id),
                )
            },
        })

        return {
            items,
            total,
        }
    }

    async getOneById<T = any>(
        id: string,
        opts?: {
            throwIfNotFound?: boolean
            message?: string
        },
    ): Promise<T> {
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
                opts?.message ||
                    `Could not find ${this.modelName} with this id.`,
            )
        }

        return sectionQuestion as T
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
}
