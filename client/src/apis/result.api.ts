import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type { TBaseResponse } from '@/types/common'
import type { THistory } from '@/types/history'
import type { TSectionQuestion } from '@/types/question'

class ResultApi {
    async getPracticePart(historyId: string): Promise<
        TBaseResponse<{
            questions: TSectionQuestion[]
            history: THistory
        }>
    > {
        return http_client.get(API_ENDPOINTS.RESULT.PRACTICE_PART(historyId))
    }
}

export const resultApi = new ResultApi()
