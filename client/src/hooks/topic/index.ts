import { topicApi } from '@/apis/topic.api'
import type { TBaseQueryParams } from '@/types/common'
import type { TTopic } from '@/types/topic'
import { CrudQueryClient } from '../crud-query-client'

const TopicClient = new CrudQueryClient<
    TTopic,
    TTopic,
    TBaseQueryParams,
    TTopic
>(topicApi)

export const useCreateTopic = TopicClient.useCreate
export const useDeleteTopic = TopicClient.useDelete
export const useUpdateTopic = TopicClient.useUpdate
export const useTopic = TopicClient.useGetById
