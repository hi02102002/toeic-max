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

export type TBaseQueryPagingBuilderParams = {
    page?: number
    limit?: number
    filters?: string[]
    withs?: string[]
    orderBy?: string
    q?: string
    searchFields?: string[]
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
    location: number
}

export enum EOrderBy {
    ASC = 'asc',
    DESC = 'desc',
}

export enum EFilterCondition {
    EQUAL = 'eq',
    NOT_EQUAL = 'ne',
    GREATER_THAN = 'gt',
    GREATER_THAN_OR_EQUAL = 'gte',
    LESS_THAN = 'lt',
    LESS_THAN_OR_EQUAL = 'lte',
    IN = 'in',
    NOT_IN = 'nin',
    LIKE = 'like',
    NOT_LIKE = 'nlike',
    BETWEEN = 'between',
    NOT_BETWEEN = 'nbetween',
    IS_NULL = 'isnull',
    IS_NOT_NULL = 'isnotnull',
    NOT_EXISTS = 'notexists',
    NOT_ILIKE = 'nilike',
    ILIKE = 'ilike',
}

export enum EFilterType {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    DATE = 'date',
}
