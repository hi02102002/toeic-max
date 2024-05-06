import { authApi } from '@/apis/auth.api'
import { ERROR_MESSAGE } from '@/constants'
import type { TAxiosError } from '@/types/common'
import type { LoginSchemaType } from '@/validators'
import { useMutation } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginSchemaType) => {
            return authApi.login(data)
        },
        onSuccess: ({ message }) => {
            toast.success(message)
        },
        onError: (err: TAxiosError) => {
            toast.error(err.response?.data.message || ERROR_MESSAGE)
        },
    })
}
