import { kitApi } from '@/apis/kit.api'
import { API_ENDPOINTS } from '@/constants'
import { toastError } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

export const useDeleteKit = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => kitApi.delete(id),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: [API_ENDPOINTS.KITS.INDEX],
            })
            toast.success(res.message)
        },
        onError: toastError,
    })
}
