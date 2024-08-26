import { histories } from '@/database/schema'
import { CRUDBaseService } from '@/libs/api/crud.service'
import { and, eq, sql } from 'drizzle-orm'
import { Service } from 'typedi'
import { HistoryDto } from './history.dto'
import {
    TCreateHistory,
    THistory,
    TPracticePart,
    TUpdateHistory,
} from './history.type'

@Service()
export class HistoryService extends CRUDBaseService<
    TCreateHistory,
    Partial<TUpdateHistory>,
    THistory
> {
    constructor() {
        super(histories)
    }

    async getQuestionIdsInPartPracticed({
        part,
        userId,
    }: {
        userId: string
        part: number
        ref?: string
    }) {
        try {
            const practicePartHistories = await this.db
                .select()
                .from(histories)
                .where(
                    and(
                        eq(histories.userId, userId),
                        eq(histories.type, 'practice-part'),
                    ),
                )

            const sectionQuestionIds = practicePartHistories
                .map((item) => {
                    const contents = item.contents.filter((content) => {
                        const _content = content as TPracticePart
                        return _content.part === Number(part) && _content.choose
                    })

                    return contents.map((content) => {
                        const _content = content as TPracticePart
                        return _content.sectionQuestionId
                    })
                })
                .flat()

            return sectionQuestionIds
        } catch (error) {
            return []
        }
    }

    async getQuestionIdsToPracticeAgain(ref: string) {
        const history = await this.getOneById(ref)

        if (!history) {
            return []
        }

        const sectionQuestionIds = history.contents.map(
            (content) => content.section_question_id,
        )

        return sectionQuestionIds
    }

    async getDetailHistory({
        userId,
        historyId,
        type,
    }: {
        userId: string
        historyId: string
        type: THistory['type']
    }) {
        const history = await this.db.query.histories.findFirst({
            where: and(
                eq(histories.id, historyId),
                eq(histories.userId, userId),
                eq(histories.type, type),
            ),
        })

        return history
    }

    async createVocabHistory(userId: string, fields: HistoryDto) {
        const existVocabHistory = await this.db.query.histories.findFirst({
            where: and(
                sql`${histories.metadata}->>'topicId' = ${fields.metadata.topicId}`,
                eq(histories.userId, userId),
                eq(histories.type, 'vocab'),
            ),
        })

        if (existVocabHistory) {
            return super.update({
                id: existVocabHistory.id,
                data: {
                    contents: fields.contents as any,
                },
            })
        }

        return super.create({
            contents: fields.contents as any,
            type: 'vocab',
            userId,
            metadata: fields.metadata,
        })
    }
}
