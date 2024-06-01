import type { AxiosError } from 'axios'

export type TBaseResponse<T = unknown> = {
    data: T
    message: string
}

export type TBaseError = {
    message: string
}

export type TPaginateResponse<T = unknown> = TBaseResponse<{
    items: T[]
    total: number
}>

export type TAxiosError = AxiosError<TBaseError>

export type TBaseQueryParams = {
    page?: number
    limit?: number
    q?: string
    orderBy?: string
    asc?: boolean
}

export type TSelectResponse = {
    value: string
    label: string
}
