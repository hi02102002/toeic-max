import { kitTestApi } from '@/apis/kit-test.api'
import { API_ENDPOINTS } from '@/constants'
import { useQuery } from '@tanstack/vue-query'

export const useKitTestsForSelect = () => {
    return useQuery({
        queryKey: [API_ENDPOINTS.KIT_TESTS.FOR_SELECT],
        queryFn: () => kitTestApi.select().then((res) => res.data),
        initialData: [],
    })
}
