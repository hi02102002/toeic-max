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
    value: any
    label: string
}

export type TChoice = {
    section_question_id: string
    question_id: string
    choose: string
    ans: string
    is_correct: boolean
    part: number
}
