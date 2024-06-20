import { authApi } from '@/apis/auth.api'
import { ERROR_MESSAGE } from '@/constants'
import type { TAxiosError } from '@/types/common'
import type { LoginSchemaType } from '@/validators'
import { useMutation } from '@tanstack/vue-query'
import { useRoute } from 'vue-router/auto'
import { toast } from 'vue-sonner'

export const useLogin = () => {
    const route = useRoute()
    return useMutation({
        mutationFn: async (data: LoginSchemaType) => {
            return authApi.login(data)
        },
        onSuccess: ({ message }) => {
            toast.success(message)

            window.location.href = (route.query.redirect as string) || '/'
        },
        onError: (err: TAxiosError) => {
            toast.error(err.response?.data.message || ERROR_MESSAGE)
        },
    })
}
