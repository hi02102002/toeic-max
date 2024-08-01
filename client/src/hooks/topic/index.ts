import { topicApi } from '@/apis/topic.api'
import type { TBaseQueryParams } from '@/types/common'
import type { TTopic } from '@/types/topic'
import type { TInputTopicSchemaType } from '@/validators/topic'
import { queryOptions, useQuery } from '@tanstack/vue-query'
import { CrudQueryClient } from '../crud-query-client'

export const TopicClient = new CrudQueryClient<
    TInputTopicSchemaType,
    TInputTopicSchemaType,
    TBaseQueryParams,
    TTopic
>(topicApi)

export const useCreateTopic = TopicClient.useCreate
export const useDeleteTopic = TopicClient.useDelete
export const useUpdateTopic = TopicClient.useUpdate
export const useTopic = TopicClient.useGetById

export const useTreeSelect = () => {
    return useQuery({
        queryKey: ['tree-topics'],
        queryFn: topicApi.getTreeSelect,
        initialData: [],
    })
}
export const groupedTopicsOptions = (opts?: {
    parentId?: string | null
    limit?: number
}) => {
    return queryOptions({
        queryKey: ['grouped-topics', opts],
        queryFn: () => topicApi.getGroupedTopics(opts),
    })
}

export const useGroupedTopics = (opts?: {
    parentId?: string | null
    limit?: number
}) => {
    return useQuery(groupedTopicsOptions(opts))
}
