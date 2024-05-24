export type TResponse<T = unknown> = {
    data: T
    message?: string
}

export type TPaginationResponse<T = unknown> = TResponse<{
    items: T[]
    total: number
}>

export interface IController {
    getPaging: (req: any, res: any) => Promise<void>
    update: (req: any, res: any) => Promise<void>
    getOneById: (req: any, res: any) => Promise<void>
    create: (req: any, res: any) => Promise<void>
    getAll: (req: any, res: any) => Promise<void>
    deleteById: (req: any, res: any) => Promise<void>
}
