import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type { TBaseQueryParams, TPaginateResponse } from '@/types/common'
import type { TKit } from '@/types/kit'

class KitApi {
    getPaginate(query: TBaseQueryParams): Promise<TPaginateResponse<TKit>> {
        return http_client.get(API_ENDPOINTS.KITS.INDEX, { params: query })
    }
}

/**
 * Represents an instance of the KitApi class.
 */
export const kitApi = new KitApi()
