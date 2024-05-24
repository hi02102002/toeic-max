import { TIME_EXPIRED_REFRESH_TOKEN } from '@/constants/common'
import type { InferResultType } from '@/database/types'
import { HttpException } from '@/exceptions/http-exception'
import { redis } from '@/libs/redis'
import { FirebaseService } from '@/modules/firebase'
import { UserService } from '@/modules/user'
import { logger } from '@/utils/logger'
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    RESET_PASS_TOKEN_SECRET,
    VERIFY_EMAIL_TOKEN_SECRET,
} from '@config'
import * as bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { sign, verify } from 'jsonwebtoken'
import { omit } from 'lodash'
import { Service } from 'typedi'
import { SendMailQueue } from '../mail/mail.queue'
import type {
    ForgotPasswordDto,
    IdTokenDto,
    LoginDto,
    RegisterDto,
    RequestVerifyAccountDto,
    ResetPasswordDto,
} from './auth.dto'
import { TTokenData, TTokenStore } from './auth.type'

@Service()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly sendMailQueue: SendMailQueue,
        private readonly firebaseService: FirebaseService,
    ) {}

    public async login(fields: LoginDto): Promise<TTokenData> {
        const user = await this.userService.getOneByEmail(fields.email)

        if (!user) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                'Your email is not registered. Please register first.',
            )
        }

        const isMatched = await this.validatePassword(
            fields.password,
            user.password,
        )

        if (!isMatched) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'Your password is incorrect.',
            )
        }

        if (user.provider !== 'local') {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'Your account is registered with a different provider. Please login with ' +
                    user.provider +
                    '.',
            )
        }

        if (!user.isVerified) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'Your email is not verified. Please verify your email first.',
                'EMAIL_NOT_VERIFIED',
            )
        }

        const tokenData = this.genTokens(user)

        await redis.set(
            `refresh-token:${user.id}`,
            tokenData.refreshToken,
            'EX',
            TIME_EXPIRED_REFRESH_TOKEN,
        )

        return tokenData
    }

    public async loginWithIdToken(fields: IdTokenDto) {
        const { idToken } = fields
        const { email, provider, avatar, name, isVerified } =
            await this.firebaseService.verifyIdToken(idToken)

        const user = await this.userService.getOneByEmail(email)

        // If user exist and provider is not the same => throw error
        if (user && user.provider !== provider) {
            throw new HttpException(
                StatusCodes.CONFLICT,
                'Your email is registered with a different provider. Please login with ' +
                    user.provider +
                    '.',
            )
        }

        // If user exist and provider is the same => login success
        if (user && user.provider === provider) {
            const tokenData = this.genTokens(user)

            await redis.set(
                `refresh-token:${user.id}`,
                tokenData.refreshToken,
                'EX',
                TIME_EXPIRED_REFRESH_TOKEN,
            )

            return tokenData
        }

        if (!isVerified) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'Your email is not verified. Please verify your email first.',
                'EMAIL_NOT_VERIFIED',
            )
        }

        const createdUser = await this.userService.create({
            avatar,
            email,
            name,
            password: null,
            provider,
            roles: ['USER'],
        })

        const tokenData = this.genTokens(createdUser)

        await redis.set(
            `refresh-token:${createdUser.id}`,
            tokenData.refreshToken,
            'EX',
            TIME_EXPIRED_REFRESH_TOKEN,
        )

        return tokenData
    }

    public async loginAdmin(fields: LoginDto): Promise<TTokenData> {
        const user = await this.userService.getOneByEmail(fields.email)

        if (!user) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                'Your email is not registered. Please register first.',
            )
        }

        const isMatched = await this.validatePassword(
            fields.password,
            user.password,
        )

        if (!isMatched) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'Your password is incorrect.',
            )
        }

        if (!user.roles.includes('ADMIN')) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'You do not have permission to access this page.',
            )
        }

        const tokenData = this.genTokens(user)

        await redis.set(
            `refresh-token:${user.id}`,
            tokenData.refreshToken,
            'EX',
            TIME_EXPIRED_REFRESH_TOKEN,
        )

        return tokenData
    }

    public async register(
        fields: RegisterDto,
        clientUrl = 'http://localhost:3000/',
    ) {
        const { email, name, password } = fields
        const user = await this.userService.getOneByEmail(email)

        if (user) {
            throw new HttpException(
                StatusCodes.CONFLICT,
                'Your email is already registered.',
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await this.userService.create({
            avatar: null,
            email,
            name,
            password: hashedPassword,
            provider: 'local',
            roles: ['USER'],
        })

        this.genTokens(createdUser)

        return this.requestVerifyAccount({ email }, clientUrl)
    }

    public async forgotPassword(
        fields: ForgotPasswordDto,
        clientUrl = 'http://localhost:3000/',
    ) {
        const { email } = fields

        const user = await this.userService.getOneByEmail(email)

        if (!user) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                'Your email is not registered. Please register first.',
            )
        }

        const token = sign({ id: user.id }, RESET_PASS_TOKEN_SECRET as string, {
            expiresIn: '10m',
        })

        await redis.set(`reset-password:${user.id}`, token, 'EX', 10 * 60)

        await this.sendMailQueue.addJob({
            template: 'forgot-password',
            props: {
                baseUrl: 'http://localhost:8080',
                username: user.name,
                url: `${clientUrl}set-password?token=${token}`,
            },
            subject: 'Reset password',
            to: email,
        })
    }

    public async resetPassword(
        fields: ResetPasswordDto & {
            token: string
        },
    ) {
        const { token, password, passwordConfirm } = fields

        if (!token) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Token is required. Please check your email and click on the link in the email to reset your password.',
            )
        }

        const decoded = (await this.verifyToken(
            token,
            RESET_PASS_TOKEN_SECRET as string,
        )) as { id: string }

        const user = await this.userService.getOneById(decoded.id)

        if (!user) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Your account is not found. Please check your email and click on the link in the email to reset your password.',
            )
        }

        if (password !== passwordConfirm) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Password and confirm password do not match. Please check your password again.',
            )
        }

        const tokenInRedis = await redis.get(`reset-password:${user.id}`)

        if (token !== tokenInRedis) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Token is invalid or expired. Please check your email and click on the link in the email to reset your password.',
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await this.userService.update({
            data: {
                password: hashedPassword,
            },
            id: decoded.id,
        })

        await redis.del(`reset-password:${user.id}`)
    }

    public async refreshToken(refreshToken: string): Promise<TTokenData> {
        logger.info('[AUTH] Try to refresh token')
        const decoded = (await this.verifyToken(
            refreshToken,
            REFRESH_TOKEN_SECRET as string,
        )) as { id: string }

        const tokenInRedis = await redis.get(`refresh-token:${decoded.id}`)

        const blackListToken = await redis.get(
            `blacklist-token:${refreshToken}`,
        )

        if (blackListToken) {
            logger.error('[AUTH] Refresh token failed')
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Token is invalid or expired. Please login again to get a new token.',
            )
        }

        if (refreshToken !== tokenInRedis) {
            logger.error('[AUTH] Refresh token failed')

            // Add refresh token to blacklist
            await redis.set(`blacklist-token:${refreshToken}`, refreshToken)

            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Token is invalid or expired. Please login again to get a new token.',
            )
        }

        const user = await this.userService.getOneById(decoded.id)

        if (!user) {
            logger.error('[AUTH] Refresh token failed')

            await redis.set(`blacklist-token:${refreshToken}`, refreshToken)

            throw new HttpException(
                StatusCodes.NOT_FOUND,
                'Your account is not found. Please login again to get a new token.',
            )
        }

        const tokenData = this.genTokens(user)

        await redis.set(
            `refresh-token:${user.id}`,
            tokenData.refreshToken,
            'EX',
            TIME_EXPIRED_REFRESH_TOKEN,
        )

        // after refresh token, add old refresh token to blacklist
        await redis.set(`blacklist-token:${refreshToken}`, refreshToken)

        logger.info('[AUTH] Refresh token success')
        return tokenData
    }

    public async findCurrentUser(userId: string) {
        logger.info('[AUTH] Try to get current user')
        const userInCache = await redis.get(`user:${userId}`)

        if (userInCache) {
            logger.info('[AUTH] Get current user in cache success')

            return omit(JSON.parse(userInCache), ['password'])
        }

        const user = await this.userService.getOneById(userId)

        if (!user) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                'Your account is not found. Please login again to get a new token.',
            )
        }

        await redis.set(
            `user:${userId}`,
            JSON.stringify(omit(user, ['password'])),
        )
        logger.info('[AUTH] Get current user success')
        return omit(user, ['password'])
    }

    private genTokens(user: InferResultType<'users'>): TTokenData {
        const dataStoredInToken: TTokenStore = {
            id: user.id,
            roles: user.roles,
        }

        const accessToken = sign(
            dataStoredInToken,
            ACCESS_TOKEN_SECRET as string,
            {
                expiresIn: '2h',
            },
        )

        const refreshToken = sign(
            dataStoredInToken,
            REFRESH_TOKEN_SECRET as string,
            {
                expiresIn: '7d',
            },
        )

        return {
            accessToken,
            refreshToken,
        }
    }

    private async validatePassword(
        incomePassword: string,
        hashedPassword: string,
    ) {
        const isMatched = await bcrypt.compare(incomePassword, hashedPassword)

        return isMatched
    }

    public async verifyToken(
        token: string,
        secret: string,
        errMsg = 'Token is invalid',
    ) {
        return new Promise((resolve, reject) => {
            verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(new HttpException(StatusCodes.BAD_REQUEST, errMsg))
                }

                resolve(decoded)
            })
        })
    }

    public async logout(userId?: string) {
        if (userId) {
            await redis.del(`refresh-token:${userId}`)
        }
    }

    public async requestVerifyAccount(
        fields: RequestVerifyAccountDto,
        clientUrl = 'http://localhost:3000/',
    ) {
        const { email } = fields

        const user = await this.userService.getOneByEmail(email)

        if (!user) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                'This account is not found.',
            )
        }

        if (user.isVerified) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Your email is already verified.',
            )
        }

        const token = sign(
            { id: user.id },
            VERIFY_EMAIL_TOKEN_SECRET as string,
            {
                expiresIn: '15m',
            },
        )

        await redis.set(`verify-account:${user.id}`, token, 'EX', 15 * 60)

        await this.sendMailQueue.addJob({
            template: 'verify-account',
            props: {
                baseUrl: 'http://localhost:8080',
                username: user.name,
                url: `${clientUrl}verify-account?token=${token}`,
            },
            subject: 'Verify account',
            to: email,
        })
    }

    public async verifyAccount(token: string) {
        const decoded = (await this.verifyToken(
            token,
            VERIFY_EMAIL_TOKEN_SECRET as string,
            'Token is invalid or expired. Please check your email and click on the link in the email to verify your account.',
        )) as {
            id: string
        }

        const user = await this.userService.getOneById(decoded.id)

        if (!user) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Your account is not found. Please check your email and click on the link in the email to verify your account.',
            )
        }

        if (user.isVerified) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Your email is already verified. Please login or reset your password if you forgot it.',
            )
        }

        await this.userService.update({
            data: {
                isVerified: true,
            },
            id: decoded.id,
        })
    }
}
