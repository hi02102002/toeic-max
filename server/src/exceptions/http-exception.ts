/**
 * @openapi
 * components:
 *   schemas:
 *     HttpException:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *         message:
 *           type: string
 *         error_key:
 *           type: string
 *       required:
 *         - status
 *         - message
 *       example:
 *         status: 404
 *         message: Not Found
 *         error_key: not_found
 */
export class HttpException extends Error {
    public status: number
    public message: string
    public error_key?: string

    constructor(status: number, message: string, error_key?: string) {
        super(message)
        this.status = status
        this.message = message
        this.error_key = error_key
    }
}
