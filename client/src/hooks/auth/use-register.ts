import { authApi } from '@/apis/auth.api'
import { ERROR_MESSAGE, ROUTES } from '@/constants'
import type { TAxiosError } from '@/types/common'
import type { RegisterSchemaType } from '@/validators'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

export const useRegister = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async (data: RegisterSchemaType) => {
            return authApi.register(data)
        },
        onSuccess: ({ message }) => {
            toast.success(message)
            router.push(ROUTES.AUTH.LOGIN)
        },
        onError: (err: TAxiosError) => {
            toast.error(err.response?.data.message || ERROR_MESSAGE)
        },
    })
}
