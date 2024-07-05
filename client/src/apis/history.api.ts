import { API_ENDPOINTS } from '@/constants'
import type { TBaseQueryParams, TSelectResponse } from '@/types/common'
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

    select(): Promise<TSelectResponse[]> {
        throw new Error('Method not implemented.')
    }
}

export const historyApi = new HistoryApi()
