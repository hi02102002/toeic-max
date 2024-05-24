import type { Request, Response, NextFunction } from 'express'

/**
 * Wraps an asynchronous function with error handling middleware.
 * @param fn - The asynchronous function to be wrapped.
 * @returns A middleware function that catches any errors thrown by the wrapped function and passes them to the next middleware.
 * @example
 * app.get('/user', catchAsync(async (req, res) => {}));
 */
export const catchAsync = <RP = unknown>(
    fn: (req: Request, res: Response<RP>, next: NextFunction) => Promise<any>,
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next)
    }
}
