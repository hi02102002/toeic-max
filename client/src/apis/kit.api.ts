import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type {
    TBaseQueryParams,
    TBaseResponse,
    TPaginateResponse,
    TSelectResponse,
} from '@/types/common'
import type { TKit } from '@/types/kit'
import type { KitInputSchemaType } from '@/validators/kit'

class KitApi {
    getPaginate(query: TBaseQueryParams): Promise<TPaginateResponse<TKit>> {
        return http_client.get(API_ENDPOINTS.KITS.INDEX, { params: query })
    }
    create(data: KitInputSchemaType): Promise<TBaseResponse<TKit>> {
        return http_client.post(API_ENDPOINTS.KITS.INDEX, data)
    }
    select(): Promise<TBaseResponse<TSelectResponse[]>> {
        return http_client.get(API_ENDPOINTS.KITS.FOR_SELECT)
    }
}

/**
 * Represents an instance of the KitApi class.
 */
export const kitApi = new KitApi()
