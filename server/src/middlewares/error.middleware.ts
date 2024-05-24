import { NODE_ENV } from '@/config'
import type { HttpException } from '@/exceptions/http-exception'
import { logger } from '@utils/logger'
import type { NextFunction, Request, Response } from 'express'

export const ErrorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const status: number = error.status || 500
        const message: string = error.message || 'Something went wrong'

        logger.error(
            `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}, Error:: ${error.stack}`,
        )
        res.status(status).json({
            message,
            ...(NODE_ENV === 'development' && { stack: error.stack }),
        })
    } catch (error) {
        next(error)
    }
}
