import { sectionApi } from '@/apis/section.api'
import type { TBaseQueryParams } from '@/types/common'
import type { TSection } from '@/types/section'
import { queryOptions, useQuery } from '@tanstack/vue-query'
import { CrudQueryClient } from '../crud-query-client'

const SectionClient = new CrudQueryClient<
    TSection,
    TSection,
    TBaseQueryParams,
    TSection
>(sectionApi)

export const useCreateSection = SectionClient.useCreate
export const useDeleteSection = SectionClient.useDelete
export const useUpdateSection = SectionClient.useUpdate
export const useSection = SectionClient.useGetById

export const sectionByPartQueryOptions = (part: number) =>
    queryOptions({
        queryKey: ['section', part],
        queryFn: () => sectionApi.getSectionsByPart(part),
        staleTime: Infinity,
    })

export const useSectionByPart = (part: number) => {
    return useQuery(sectionByPartQueryOptions(part))
}
