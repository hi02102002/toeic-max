import type { IRoutes } from '@interfaces/routes.interface'
import { Router } from 'express'
import Container from 'typedi'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
import { AuthController } from './auth.controller'
import {
    ForgotPasswordDto,
    IdTokenDto,
    LoginDto,
    RegisterDto,
    RequestVerifyAccountDto,
    ResetPasswordDto,
} from './auth.dto'

export class AuthRoute implements IRoutes {
    public router: Router = Router()
    public controller = Container.get(AuthController)
    path: string = '/auth'

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.post(
            `${this.path}/login`,
            ValidationMiddleware(LoginDto),
            this.controller.login,
        )

        this.router.post(
            `${this.path}/login-admin`,
            ValidationMiddleware(LoginDto),
            this.controller.loginAdmin,
        )

        this.router.post(
            `${this.path}/register`,
            ValidationMiddleware(RegisterDto),
            this.controller.register,
        )

        this.router.post(
            `${this.path}/refresh-token`,
            this.controller.refreshToken,
        )

        this.router.post(
            `${this.path}/forgot-password`,
            ValidationMiddleware(ForgotPasswordDto),
            this.controller.forgotPassword,
        )

        this.router.post(
            `${this.path}/reset-password`,
            ValidationMiddleware(ResetPasswordDto),
            this.controller.resetPassword,
        )

        this.router.post(
            `${this.path}/with-id-token`,
            ValidationMiddleware(IdTokenDto),
            this.controller.loginWithIdToken,
        )

        this.router.post(
            `${this.path}/verify-account`,
            this.controller.verifyAccount,
        )

        this.router.post(
            `${this.path}/request-verify-account`,
            ValidationMiddleware(RequestVerifyAccountDto),
            this.controller.requestVerifyAccount,
        )

        this.router.get(
            `${this.path}/current-user`,
            this.controller.getCurrentUser,
        )

        this.router.post(`${this.path}/logout`, this.controller.logout)
    }
}
