import { authApi } from '@/apis/auth.api'
import { toastError } from '@/utils'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router/auto'

export const useLogout = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            await authApi.logout()
        },
        onSuccess: () => {
            router.push('/login')
        },
        onError: toastError,
    })
}
