import { HttpException } from '@/exceptions/http-exception'
import { RequestWithUser, TTokenStore } from '@/modules/auth'
import { UserService } from '@/modules/user'
import { ACCESS_TOKEN_SECRET } from '@config'

import type { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'
import Container from 'typedi'

const getAuthorization = (req) => {
    const coockie = req.cookies.Authorization
    if (coockie) return coockie

    const header = req.header('Authorization')
    if (header) return header.split('Bearer ')[1]

    return null
}

export const AuthMiddleware = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
) => {
    const userService = Container.get(UserService)
    try {
        const Authorization = getAuthorization(req)

        if (Authorization) {
            const { id } = verify(
                Authorization,
                ACCESS_TOKEN_SECRET,
            ) as TTokenStore

            const user = await userService.getOneById(id)

            if (user) {
                req.user = user
            } else {
                next(new HttpException(401, 'Wrong authentication token'))
            }
        } else {
            next(new HttpException(404, 'Authentication token missing'))
        }
    } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'))
    }
}
