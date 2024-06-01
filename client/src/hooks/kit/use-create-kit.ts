import { kitApi } from '@/apis/kit.api'
import { API_ENDPOINTS } from '@/constants'
import { toastError } from '@/utils'
import type { KitInputSchemaType } from '@/validators/kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

export const useCreateKit = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: KitInputSchemaType) => kitApi.create(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: [API_ENDPOINTS.KITS.INDEX],
            })
            toast.success(res.message)
        },
        onError: toastError,
    })
}
