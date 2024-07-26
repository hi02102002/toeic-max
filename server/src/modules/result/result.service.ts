import { LOGGER_SECTION, REDIS_KEYS } from '@/constants/common'
import { redis } from '@/libs/redis'
import { logger } from '@/utils/logger'
import { Service } from 'typedi'
import { HistoryService } from '../history'
import { QuestionSectionService } from '../question-section'

@Service()
export class ResultService {
    constructor(
        private readonly historyService: HistoryService,
        private readonly questionSectionService: QuestionSectionService,
    ) {}

    async getPracticeResult({
        userId,
        historyId,
        type,
    }: {
        userId: string
        historyId: string
        type: string
    }) {
        logger.info(
            `${LOGGER_SECTION.RESULT_SERVICE} Try to get practice part result for user ${userId} and history ${historyId}`,
        )

        const historyInCache = await redis.get(
            REDIS_KEYS.RESULT(userId, historyId),
        )

        if (historyInCache) {
            return JSON.parse(historyInCache)
        }

        const history = await this.historyService.getDetailHistory({
            userId,
            historyId,
            type: (type as any) || 'practice-part',
        })

        if (!history) {
            return null
        }

        const sectionQuestionIds = history.contents.map(
            ({ section_question_id }) => section_question_id,
        )

        const questions =
            await this.questionSectionService.getSectionQuestionsByIds(
                sectionQuestionIds,
            )

        await redis.set(
            REDIS_KEYS.RESULT(userId, historyId),
            JSON.stringify({ history, questions }),
        )

        return {
            history,
            questions,
        }
    }
}
