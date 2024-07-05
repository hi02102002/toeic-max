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

    async getPracticePartResult({
        userId,
        historyId,
    }: {
        userId: string
        historyId: string
    }) {
        logger.info(
            `${LOGGER_SECTION.RESULT_SERVICE} Try to get practice part result for user ${userId} and history ${historyId}`,
        )

        const cached = await redis.get(REDIS_KEYS.RESULT(userId, historyId))

        if (cached) {
            return JSON.parse(cached)
        }

        const history = await this.historyService.getDetailHistory({
            userId,
            historyId,
            type: 'practice-part',
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
            'EX',
            7 * 24 * 60 * 60, // 7 days
        )

        return {
            history,
            questions,
        }
    }
}
