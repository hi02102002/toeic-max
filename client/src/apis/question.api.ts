import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type {
    TBaseQueryParams,
    TBaseResponse,
    TPaginateResponse,
} from '@/types/common'
import type { TSectionQuestion } from '@/types/question'

class QuestionApi {
    getPaginate(
        query: TBaseQueryParams,
    ): Promise<TPaginateResponse<TSectionQuestion>> {
        return http_client.get(API_ENDPOINTS.QUESTIONS.INDEX, { params: query })
    }
    create(data: any): Promise<TBaseResponse<TSectionQuestion>> {
        return http_client.post(API_ENDPOINTS.QUESTIONS.INDEX, data)
    }
}

export const questionApi = new QuestionApi()
