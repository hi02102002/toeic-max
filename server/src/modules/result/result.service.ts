import { LOGGER_SECTION, REDIS_KEYS } from '@/constants/common'
import { redis } from '@/libs/redis'
import { logger } from '@/utils/logger'
import { Service } from 'typedi'
import { HistoryService } from '../history'
import { QuestionSectionService } from '../question-section'
import { TLearnVoca, VocabularyService } from '../vocabulary'

@Service()
export class ResultService {
    constructor(
        private readonly historyService: HistoryService,
        private readonly questionSectionService: QuestionSectionService,
        private readonly vocabularyService: VocabularyService,
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
            (content) => (content as any).sectionQuestionId,
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

    async getVocabResult({
        userId,
        historyId,
    }: {
        userId: string
        historyId: string
    }) {
        const history = await this.historyService.getDetailHistory({
            userId,
            historyId,
            type: 'vocab',
        })

        if (!history) {
            return null
        }

        const mapVocabIdToContent = history.contents.reduce((acc, content) => {
            const _content = content as TLearnVoca

            acc.set(_content.id, _content)
            return acc
        }, new Map<string, TLearnVoca>())

        const vocabIds = history.contents.map((c) => {
            return (c as TLearnVoca).id
        })

        const vocabs = await this.vocabularyService.getVocabByIds(vocabIds)

        return {
            ...history,
            contents: vocabs.map((vocab) => {
                return {
                    ...vocab,
                    ...mapVocabIdToContent.get(vocab.id),
                }
            }),
        }
    }
}
