import { kitTestApi } from '@/apis/kit-test.api'
import { API_ENDPOINTS } from '@/constants'
import { toastError } from '@/utils'
import type { KitTestInputSchemaType } from '@/validators/kit-test'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

export const useCreateKitTest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: KitTestInputSchemaType) => kitTestApi.create(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: [API_ENDPOINTS.KIT_TESTS.INDEX],
            })
            toast.success(res.message)
        },
        onError: toastError,
    })
}
