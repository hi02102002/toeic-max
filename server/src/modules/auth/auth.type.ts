import type { InferResultType, ROLES } from '@/database/types'
import type { Request } from 'express'
import type * as z from 'zod'

export type TTokenStore = {
    id: string
    roles: z.infer<typeof ROLES>[]
}

export type TTokenData = {
    accessToken: string
    refreshToken: string
}

export interface RequestWithUser extends Request {
    [x: string]: any
    user: InferResultType<'users'> | null | undefined
}
