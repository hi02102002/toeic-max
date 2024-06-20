import { authApi } from '@/apis/auth.api'
import { toastError } from '@/utils'
import { useMutation } from '@tanstack/vue-query'

export const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            await authApi.logout()
        },
        onSuccess: () => {
            window.location.reload()
        },
        onError: toastError,
    })
}
