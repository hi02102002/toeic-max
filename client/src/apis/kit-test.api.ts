import { API_ENDPOINTS } from '@/constants'
import type { TBaseQueryParams, TSelectResponse } from '@/types/common'
import type { TTest } from '@/types/test'
import type { KitTestInputSchemaType } from '@/validators/kit-test'
import { BaseCrudApi } from './crud.api'
import { http_client } from '@/libs/http-client'

class KitTestApi extends BaseCrudApi<
    KitTestInputSchemaType,
    KitTestInputSchemaType,
    TBaseQueryParams,
    TTest
> {
    constructor() {
        super(API_ENDPOINTS.KIT_TESTS.INDEX)
    }

    select(): Promise<TSelectResponse[]> {
        return http_client
            .get(API_ENDPOINTS.KIT_TESTS.FOR_SELECT)
            .then((response) => response.data)
    }
}

export const kitTestApi = new KitTestApi()
