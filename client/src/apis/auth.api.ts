import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'
import type { TTokens } from '@/types/auth'
import type { TBaseResponse } from '@/types/common'
import type { TUser } from '@/types/user'
import type { LoginSchemaType, RegisterSchemaType } from '@/validators'

/**
 * Represents an API client for authentication-related operations.
 */
class AuthApi {
    login(data: LoginSchemaType): Promise<TBaseResponse<TTokens>> {
        return http_client.post(API_ENDPOINTS.AUTH.LOGIN, data)
    }
    register(data: RegisterSchemaType): Promise<TBaseResponse<unknown>> {
        return http_client.post(API_ENDPOINTS.AUTH.REGISTER, data)
    }
    currentUser(): Promise<TBaseResponse<unknown>> {
        return http_client.get(API_ENDPOINTS.AUTH.CURRENT_USER)
    }
    forgotPassword(email: string): Promise<TBaseResponse<unknown>> {
        return http_client.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
    }
    resetPassword(
        token: string,
        password: string,
    ): Promise<TBaseResponse<unknown>> {
        return http_client.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
            token,
            password,
        })
    }
    logout(): Promise<TBaseResponse<unknown>> {
        return http_client.post(API_ENDPOINTS.AUTH.LOGOUT)
    }
    getCurrentUser(): Promise<TBaseResponse<TUser>> {
        return http_client.get(API_ENDPOINTS.AUTH.CURRENT_USER)
    }
}

/**
 * Represents the authentication API.
 */
export const authApi = new AuthApi()
