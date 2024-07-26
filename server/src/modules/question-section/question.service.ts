import { questions } from '@/database/schema'
import { CRUDBaseService } from '@/libs/api/crud.service'
import { Service } from 'typedi'
import { QuestionDto } from './question-section.dto'
import { TQuestion } from './question-section.type'

@Service()
export class QuestionService extends CRUDBaseService<
    any,
    Partial<any>,
    TQuestion
> {
    constructor() {
        super(questions, 'Question')
    }

    async create<T = TQuestion>(
        data: QuestionDto & {
            sectionId: string
        },
    ) {
        const { ans, location, opts, p, trans, sectionId } = data

        const question = await this.db
            .insert(questions)
            .values({
                location,
                p,
                ans,
                opts,
                trans,
                question_section_id: sectionId,
            })
            .returning()

        return question as T
    }

    async createMany<T = TQuestion[]>(data: QuestionDto[], opts, sectionId) {
        const _questions = await super.createMany<T>(
            data.map((item) => ({
                ...item,
                question_section_id: sectionId,
            })),
        )

        return _questions
    }
}
