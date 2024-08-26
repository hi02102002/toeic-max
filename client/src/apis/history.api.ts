import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type {
    TBaseQueryParams,
    TBaseResponse,
    TSelectResponse,
} from '@/types/common'
import type { THistory } from '@/types/history'
import type { THistoryInputSchemaType } from '@/validators/history'
import { BaseCrudApi } from './crud.api'

class HistoryApi extends BaseCrudApi<
    THistoryInputSchemaType,
    THistoryInputSchemaType,
    TBaseQueryParams,
    THistory
> {
    constructor() {
        super(API_ENDPOINTS.HISTORY.INDEX)
    }

    createForVocab(
        data: THistoryInputSchemaType,
    ): Promise<TBaseResponse<THistory>> {
        return http_client.post(API_ENDPOINTS.HISTORY.CREATE_FOR_VOCAB, data)
    }

    select(): Promise<TSelectResponse[]> {
        throw new Error('Method not implemented.')
    }
}

export const historyApi = new HistoryApi()
