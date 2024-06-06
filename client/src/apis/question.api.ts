import { API_ENDPOINTS } from '@/constants'
import type { TBaseQueryParams, TSelectResponse } from '@/types/common'
import type { TSectionQuestion } from '@/types/question'
import { BaseCrudApi } from './crud.api'

class QuestionApi extends BaseCrudApi<
    TSectionQuestion,
    TSectionQuestion,
    TBaseQueryParams,
    TSectionQuestion
> {
    select(): Promise<TSelectResponse[]> {
        throw new Error('Method not implemented.')
    }

    constructor() {
        super(API_ENDPOINTS.QUESTIONS.INDEX)
    }
}

export const questionApi = new QuestionApi()
