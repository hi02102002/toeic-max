import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type { TBaseQueryParams, TSelectResponse } from '@/types/common'
import type { TSection } from '@/types/section'
import { BaseCrudApi } from './crud.api'

class SectionApi extends BaseCrudApi<
    TSection,
    TSection,
    TBaseQueryParams,
    TSection
> {
    constructor() {
        super(API_ENDPOINTS.SECTIONS.INDEX)
    }

    select(): Promise<TSelectResponse[]> {
        throw new Error('Method not implemented.')
    }

    async getSectionsByPart(part: number): Promise<TSection> {
        return http_client
            .get(`${API_ENDPOINTS.SECTIONS.INDEX}/part/${part}`)
            .then((response) => response.data)
    }
}

export const sectionApi = new SectionApi()
