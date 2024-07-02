import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type { TBaseQueryParams, TSelectResponse } from '@/types/common'
import type { TSectionQuestion } from '@/types/question'
import type { QuestionSectionSchemaType } from '@/validators/question-section'
import { BaseCrudApi } from './crud.api'

class QuestionApi extends BaseCrudApi<
    QuestionSectionSchemaType,
    QuestionSectionSchemaType,
    TBaseQueryParams,
    TSectionQuestion
> {
    select(): Promise<TSelectResponse[]> {
        throw new Error('Method not implemented.')
    }

    constructor() {
        super(API_ENDPOINTS.QUESTIONS.INDEX)
    }

    async getForPractice(
        part: number,
        numOfQuestions: number,
    ): Promise<TSectionQuestion[]> {
        return http_client
            .get(`${this.endpoint}/for-practice/${part}/${numOfQuestions}`)
            .then((response) => response.data)
    }
}

export const questionApi = new QuestionApi()
