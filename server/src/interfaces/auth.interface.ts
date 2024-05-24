import type { User } from '@interfaces/users.interface'
import type { Request } from 'express'

export interface DataStoredInToken {
    id: number
}

export interface TokenData {
    token: string
    expiresIn: number
}

export interface RequestWithUser extends Request {
    user: User
}
