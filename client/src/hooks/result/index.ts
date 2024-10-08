import { resultApi } from '@/apis/result.api'
import { queryOptions, useQuery } from '@tanstack/vue-query'

export const practiceResultOptions = (
    historyId: string,
    type: string = 'practice-part',
) => {
    return queryOptions({
        queryKey: ['practice-part-result', historyId],
        queryFn: () =>
            resultApi.getPractice(historyId, type).then((res) => res.data),
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
    })
}

export const vocabResultOptions = (historyId: string) => {
    return queryOptions({
        queryKey: ['vocab-result', historyId],
        queryFn: () => resultApi.getVocab(historyId).then((res) => res.data),
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
    })
}

export const usePracticeResult = (historyId: string, type: string) => {
    return useQuery(practiceResultOptions(historyId, type))
}

export const useVocabResult = (historyId: string) => {
    return useQuery(vocabResultOptions(historyId))
}
