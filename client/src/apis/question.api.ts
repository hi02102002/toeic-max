import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type { TBaseQueryParams, TSelectResponse } from '@/types/common'
import type { TSectionQuestion } from '@/types/question'
import type { TSection } from '@/types/section'
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

    async getForPractice({
        numOfQuestions,
        part,
        ref,
    }: {
        part: number
        numOfQuestions: number
        ref?: string
    }): Promise<TSectionQuestion[]> {
        return http_client
            .get(`${this.endpoint}/for-practice/${part}/${numOfQuestions}`, {
                params: { ref },
            })
            .then((response) => response.data)
    }

    async getForTest(kitTestId: string): Promise<
        Array<
            TSectionQuestion & {
                type: string
                section: TSection
            }
        >
    > {
        return http_client
            .get(`${this.endpoint}/for-test/${kitTestId}`)
            .then((response) => response.data)
    }
}

export const questionApi = new QuestionApi()
