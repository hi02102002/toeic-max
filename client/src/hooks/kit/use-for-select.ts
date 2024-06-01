import { kitApi } from '@/apis/kit.api'
import { API_ENDPOINTS } from '@/constants'
import { useQuery } from '@tanstack/vue-query'

export const useKitsForSelect = () => {
    return useQuery({
        queryKey: [API_ENDPOINTS.KITS.FOR_SELECT],
        queryFn: () => kitApi.select().then((res) => res.data),
        initialData: [],
    })
}
