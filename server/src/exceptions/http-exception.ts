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
