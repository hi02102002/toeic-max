import { kitApi } from '@/apis/kit.api'
import { API_ENDPOINTS } from '@/constants'
import { toastError } from '@/utils'
import type { KitInputSchemaType } from '@/validators/kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

export const useUpdateKit = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ data, id }: { data: KitInputSchemaType; id: string }) =>
            kitApi.update(id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: [API_ENDPOINTS.KITS.INDEX],
            })
            toast.success(res.message)
        },
        onError: toastError,
    })
}
