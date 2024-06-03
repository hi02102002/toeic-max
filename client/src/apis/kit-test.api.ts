import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type {
    TBaseQueryParams,
    TBaseResponse,
    TPaginateResponse,
    TSelectResponse,
} from '@/types/common'
import type { TTest } from '@/types/test'
import type { KitTestInputSchemaType } from '@/validators/kit-test'

class KitTestApi {
    getPaginate(query: TBaseQueryParams): Promise<TPaginateResponse<TTest>> {
        return http_client.get(API_ENDPOINTS.KIT_TESTS.INDEX, { params: query })
    }
    create(data: KitTestInputSchemaType): Promise<TBaseResponse<TTest>> {
        return http_client.post(API_ENDPOINTS.KIT_TESTS.INDEX, data)
    }
    select(): Promise<TBaseResponse<TSelectResponse[]>> {
        return http_client.get(API_ENDPOINTS.KIT_TESTS.FOR_SELECT)
    }
}

export const kitTestApi = new KitTestApi()
