import { SQLWrapper } from 'drizzle-orm'
import { PgColumn, PgSelect, SelectedFields } from 'drizzle-orm/pg-core'

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

export enum EOderBy {
    ASC = 'asc',
    DESC = 'desc',
}

export interface IBasePagingQuery {
    page?: number
    limit?: number
    q?: string
    orderBy?: string
    asc?: boolean
    [key: string]: any
}

export interface IBasePagingBuilderQuery extends Omit<IBasePagingQuery, 'asc'> {
    filters?: string[]
    withs?: string[]
}

export type TGetPagingQuery<
    Q extends IBasePagingQuery = IBasePagingQuery,
    S extends SelectedFields = SelectedFields,
> = {
    query?: Q
    callback?: (query: PgSelect) => Promise<any>
    opts?: {
        wheres?: SQLWrapper[]
        searchFields?: PgColumn[]
        selectFields?: S
        defaultOrderBy?: string
    }
}

export const FILTER_PATTERN = new RegExp(
    `^[^|]+\\|(${Object.values(EFilterCondition).join('|')})(\\|[^|]*)?(\\|[^|]*)?$`,
)

export const ORDER_BY_PATERN = new RegExp(
    `^[^|]+\\|(${Object.values(EOderBy).join('|')})$`,
)

export const WITH_PATERN = new RegExp(/^[^|]+(?:\.[^|]+)*$/)
