import { LOGGER_SECTION } from '@/constants/common'
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

        const history = await this.historyService.getDetailHistory({
            userId,
            historyId,
            type: 'practice-part',
        })

        if (!history) {
            return null
        }

        console.log(history)

        const sectionQuestionIds = history.contents.map(
            ({ section_question_id }) => section_question_id,
        )

        const questions =
            await this.questionSectionService.getSectionQuestionsByIds(
                sectionQuestionIds,
            )

        return {
            history,
            questions,
        }
    }
}
