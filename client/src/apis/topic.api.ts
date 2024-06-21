import { API_ENDPOINTS } from '@/constants'
import type { TBaseQueryParams, TSelectResponse } from '@/types/common'
import type { TTopic } from '@/types/topic'
import { BaseCrudApi } from './crud.api'

class TopicApi extends BaseCrudApi<TTopic, TTopic, TBaseQueryParams, TTopic> {
    select(): Promise<TSelectResponse[]> {
        throw new Error('Method not implemented.')
    }

    constructor() {
        super(API_ENDPOINTS.TOPICS.INDEX)
    }
}

export const topicApi = new TopicApi()
