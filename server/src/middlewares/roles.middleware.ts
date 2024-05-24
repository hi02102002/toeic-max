import { TRole } from '@/database/types'
import { HttpException } from '@/exceptions/http-exception'
import { RequestWithUser } from '@/modules/auth'
import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const RolesMiddleware = (roles: TRole[]) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userRoles = req.user?.roles

        const havePermit = userRoles.some((role) => roles.includes(role))

        if (!havePermit) {
            throw new HttpException(
                StatusCodes.FORBIDDEN,
                'You do not have permission to access this resource',
            )
        }

        next()
    }
}
