import { resultApi } from '@/apis/result.api'
import { queryOptions, useQuery } from '@tanstack/vue-query'

export const practicePartResultOptions = (historyId: string) => {
    return queryOptions({
        queryKey: ['practice-part-result', historyId],
        queryFn: () =>
            resultApi.getPracticePart(historyId).then((res) => res.data),
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
    })
}

export const usePracticePartResult = (historyId: string) => {
    return useQuery(practicePartResultOptions(historyId))
}
