import { topicApi } from '@/apis/topic.api'
import type { TBaseQueryParams } from '@/types/common'
import type { TTopic } from '@/types/topic'
import type { TInputTopicSchemaType } from '@/validators/topic'
import { useQuery } from '@tanstack/vue-query'
import { CrudQueryClient } from '../crud-query-client'

const TopicClient = new CrudQueryClient<
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
