import { question_sections } from '@/database/schema'
import { CRUDBaseService, TGetPagingQuery } from '@/libs/api/crud-service'
import { eq } from 'drizzle-orm'
import { Service } from 'typedi'
import {
    CreateQuestionDto,
    QueryQuestionSectionDto,
} from './question-section.dto'
import { TQuestionSection } from './question-section.type'
import { QuestionService } from './question.service'

@Service()
export class QuestionSectionService extends CRUDBaseService<
    CreateQuestionDto,
    Partial<CreateQuestionDto>,
    TQuestionSection
> {
    constructor(private readonly questionService: QuestionService) {
        super(question_sections, 'Question')
    }

    async create<T = TQuestionSection>(data: CreateQuestionDto) {
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

            await this.questionService.createMany(questionSection.id, questions)

            return questionSection as T
        })

        return questionSection
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
            },
        })

        return {
            items,
            total,
        }
    }
}
