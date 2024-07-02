import { histories } from '@/database/schema'
import { CRUDBaseService } from '@/libs/api/crud-service'
import { and, eq } from 'drizzle-orm'
import { Service } from 'typedi'
import { TCreateHistory, THistory, TUpdateHistory } from './history.type'

@Service()
export class HistoryService extends CRUDBaseService<
    TCreateHistory,
    Partial<TUpdateHistory>,
    THistory
> {
    constructor() {
        super(histories, 'History')
    }

    async getQuestionIdsInPartPracticed({
        part,
        userId,
    }: {
        userId: string
        part: number
    }) {
        try {
            const practicePartHistories = await this.db
                .select()
                .from(histories)
                .where(
                    and(
                        eq(histories.user_id, userId),
                        eq(histories.type, 'practice-part'),
                    ),
                )

            const sectionQuestionIds = practicePartHistories
                .map((item) => {
                    const contents = item.contents.filter(
                        (content) => content.part === part && !content.choose,
                    )

                    return contents.map(
                        (content) => content.section_question_id,
                    )
                })
                .flat()

            return sectionQuestionIds
        } catch (error) {
            return []
        }
    }
}
