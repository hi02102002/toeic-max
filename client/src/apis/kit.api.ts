import { API_ENDPOINTS } from '@/constants'
import type { TBaseQueryParams, TSelectResponse } from '@/types/common'
import type { TKit } from '@/types/kit'
import type { KitInputSchemaType } from '@/validators/kit'
import { BaseCrudApi } from './crud.api'
import { http_client } from '@/libs/http-client'

class KitApi extends BaseCrudApi<
    KitInputSchemaType,
    KitInputSchemaType,
    TBaseQueryParams,
    TKit
> {
    constructor() {
        super(API_ENDPOINTS.KITS.INDEX)
    }

    select(): Promise<TSelectResponse[]> {
        return http_client
            .get(API_ENDPOINTS.KITS.FOR_SELECT)
            .then((response) => response.data)
    }
}

/**
 * Represents an instance of the KitApi class.
 */
export const kitApi = new KitApi()
