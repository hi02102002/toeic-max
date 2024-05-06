import type { AxiosError } from 'axios'

export type TBaseResponse<T = unknown> = {
    data: T
    message: string
}

export type TBaseError = {
    message: string
}

export type TAxiosError = AxiosError<TBaseError>
