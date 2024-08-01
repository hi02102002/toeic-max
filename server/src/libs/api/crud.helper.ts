/* eslint-disable no-case-declarations */
import {
    asc,
    between,
    desc,
    eq,
    gt,
    gte,
    ilike,
    inArray,
    isNotNull,
    isNull,
    like,
    lt,
    lte,
    ne,
    notBetween,
    notIlike,
    notInArray,
    notLike,
    SQLWrapper,
} from 'drizzle-orm'
import { PgTable, TableConfig } from 'drizzle-orm/pg-core'
import { get } from 'lodash'
import { EFilterCondition, EOderBy } from './crud.type'

/**
 *
 * @param value The value need to be parsed
 * @param type The type of the value
 * @returns The parsed value
 */
const parseValue = (value: string, type: string) => {
    if (!type) {
        return value
    }

    switch (type) {
        case 'number':
            return Number(value)
        case 'boolean':
            return value === 'true'
        case 'date':
            return new Date(value)
        default:
            return value
    }
}

/**
 *
 * @param table The table to get the field
 * @param filter The filter string
 * @returns
 */
export const parseFilter = (
    table: PgTable<TableConfig>,
    filter: string,
): SQLWrapper => {
    const [field, condition, value = '', type = ''] = filter.split('|') // field|condition|value|type

    const tableField = get(table, field)

    if (!tableField) {
        return undefined
    }

    // if value is empty and condition is not null or not null
    if (
        !value &&
        ![EFilterCondition.IS_NULL, EFilterCondition.IS_NOT_NULL].includes(
            condition as EFilterCondition,
        )
    ) {
        return undefined
    }

    switch (condition) {
        case EFilterCondition.EQUAL:
            return eq(tableField, parseValue(value, type))
        case EFilterCondition.NOT_EQUAL:
            return ne(tableField, parseValue(value, type))
        case EFilterCondition.GREATER_THAN:
            return gt(tableField, parseValue(value, type))
        case EFilterCondition.GREATER_THAN_OR_EQUAL:
            return gte(tableField, parseValue(value, type))
        case EFilterCondition.LESS_THAN:
            return lt(tableField, parseValue(value, type))
        case EFilterCondition.LESS_THAN_OR_EQUAL:
            return lte(tableField, parseValue(value, type))
        case EFilterCondition.IN:
            const arr = value.split(',').map((v) => parseValue(v, type))
            return inArray(tableField, arr)
        case EFilterCondition.NOT_IN:
            const notArr = value.split(',').map((v) => parseValue(v, type))
            return notInArray(tableField, notArr)
        case EFilterCondition.LIKE:
            return like(tableField, `%${value}%`)
        case EFilterCondition.NOT_LIKE:
            return notLike(tableField, `%${value}%`)
        case EFilterCondition.BETWEEN:
            const [start, end] = value
                .split(',')
                .map((v) => parseValue(v, type))
            return between(tableField, start, end)
        case EFilterCondition.NOT_BETWEEN:
            const [notStart, notEnd] = value
                .split(',')
                .map((v) => parseValue(v, type))
            return notBetween(tableField, notStart, notEnd)
        case EFilterCondition.IS_NULL:
            return isNull(tableField)
        case EFilterCondition.IS_NOT_NULL:
            return isNotNull(tableField)
        case EFilterCondition.NOT_ILIKE:
            return notIlike(tableField, `%${value}%`)
        case EFilterCondition.ILIKE:
            return ilike(tableField, `%${value}%`)
        default:
            return undefined
    }
}

export const parseFilters = (
    table: PgTable<TableConfig>,
    filters: string[],
) => {
    if (filters.length === 0) {
        return undefined
    }

    return filters
        .map((filter) => parseFilter(table, filter))
        .filter((filter) => {
            console.log(filter)
            return filter !== undefined
        })
}

export const parseOrderBy = (table: PgTable<TableConfig>, orderBy: string) => {
    if (!orderBy) {
        return undefined
    }

    const [field, direction] = orderBy.split('|') // field|direction
    const tableField = get(table, field)

    if (!tableField) {
        return undefined
    }

    switch (direction) {
        case EOderBy.ASC:
            return asc(tableField)
        case EOderBy.DESC:
            return desc(tableField)
        default:
            return undefined
    }
}

export const parseWiths = (withs: string[]) => {
    if (withs.length === 0) {
        return undefined
    }

    const result: Record<string, any> = {}

    withs.forEach((path) => {
        const keys = path.split('.')
        let current = result

        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                current[key] = true
            } else {
                if (!current[key]) {
                    current[key] = {}
                }
                current = current[key]
            }
        })
    })

    return result
}
