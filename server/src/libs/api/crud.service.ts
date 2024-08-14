import { DB, db } from '@/database/db'
import * as schema from '@/database/schema'
import { PostgresTransaction } from '@/database/types'
import { HttpException } from '@/exceptions/http-exception'
import {
    and,
    asc,
    desc,
    eq,
    getTableName,
    ilike,
    inArray,
    or,
    sql,
} from 'drizzle-orm'
import {
    PgColumn,
    PgSelect,
    PgTable,
    SelectedFields,
    TableConfig,
} from 'drizzle-orm/pg-core'
import { StatusCodes } from 'http-status-codes'
import { get, isEmpty, lowerCase } from 'lodash'
import { parseFilters, parseOrderBy, parseWiths } from './crud.helper'
import {
    IBasePagingBuilderQuery,
    IBasePagingQuery,
    TGetPagingQuery,
} from './crud.type'

/**
 * The base service class for interacting with the database.
 * @template C - The type of the data to create.
 * @template U - The type of the data to update.
 * @template E - The type of the entity.
 */
export abstract class CRUDBaseService<
    C extends object = object,
    U extends object = object,
    E = unknown,
> {
    protected db: DB = db
    protected table: PgTable<TableConfig>
    private modelName: string

    constructor(table: PgTable<TableConfig>) {
        this.db = db
        this.table = table
    }

    getModelName() {
        return this.modelName
    }

    setModelName(modelName: string) {
        this.modelName = modelName
    }

    /**
     * Retrieves a single record by its ID.
     *
     * @template T - The type of the returned record.
     * @param {string} id - The ID of the record to retrieve.
     * @param {Object} [opts] - Optional parameters.
     * @param {boolean} [opts.throwIfNotFound] - Specifies whether to throw an error if the record is not found. Default is false.
     * @param {string} [opts.message] - The error message to throw if the record is not found. Default is 'Record not found'.
     * @returns {Promise<T | null>} - A promise that resolves to the retrieved record, or null if not found.
     */
    async getOneById(
        id: string,
        opts?: {
            throwIfNotFound?: boolean
            message?: string
            transaction?: PostgresTransaction
        },
    ) {
        const database = opts?.transaction || this.db

        const [rows] = await database
            .select()
            .from(this.table)
            .where(eq(get(this.table, 'id'), id))
            .limit(1)

        if (isEmpty(rows) && opts?.throwIfNotFound) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                opts?.message ||
                    `Could not find ${this.modelName} with this id.`,
            )
        }

        if (isEmpty(rows)) return null

        return rows as E
    }

    async getOneByField(
        field: keyof E,
        value: any,
        opts?: {
            throwIfNotFound?: boolean
            message?: string
            transaction?: PostgresTransaction
        },
    ) {
        const database = opts?.transaction || this.db

        const [entity] = await database
            .select()
            .from(this.table)
            .where(eq(get(this.table, field), value))

            .limit(1)

        if (isEmpty(entity) && opts?.throwIfNotFound) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                opts?.message ||
                    `Could not find ${this.modelName} with this id.`,
            )
        }

        if (isEmpty(entity)) return null

        return entity as E
    }

    async getOneByFields(fields: Array<{ field: keyof E; value: any }>) {
        const where = and(
            ...fields.map(({ field, value }) =>
                eq(get(this.table, field), value),
            ),
        )

        const [entity] = await this.db
            .select()
            .from(this.table)
            .where(where)
            .limit(1)

        if (isEmpty(entity)) return null

        return entity as E
    }

    async getManyByFields(fields: Array<{ field: keyof E; value: any }>) {
        const where = and(
            ...fields.map(({ field, value }) =>
                eq(get(this.table, field), value),
            ),
        )

        const rows = await this.db.select().from(this.table).where(where)

        return rows as E[]
    }

    async getManyByInField(field: keyof E, values: any[]) {
        if (values.length === 0) {
            throw new Error('Values cannot be empty')
        }

        const rows = await this.db
            .select()
            .from(this.table)
            .where(inArray(get(this.table, field), values))

        return rows as E[]
    }

    async getManyByField(field: keyof E, value: any) {
        const rows = await this.db
            .select()
            .from(this.table)
            .where(eq(get(this.table, field), value))

        return rows as E[]
    }

    /**
     * Retrieves all records from the database table.
     *
     * @returns {Promise<T[]>} A promise that resolves to an array of records.
     * @template T The type of the records to retrieve.
     */
    async getAll<T = E>() {
        const rows = await this.db.select().from(this.table)

        return rows as T[]
    }

    /**
     * Creates a new record in the database.
     *
     * @template T - The type of the returned record.
     * @param {C} data - The data to be inserted.
     * @returns {Promise<T>} - A promise that resolves to the newly created record.
     */
    async create<T = E>(data: C, transaction?: PostgresTransaction) {
        const database = transaction || this.db
        try {
            const [rows] = await database
                .insert(this.table)
                .values(data)
                .returning()

            return rows as T
        } catch (error: any) {
            if (error?.code === '23505') {
                throw new HttpException(
                    StatusCodes.BAD_REQUEST,
                    `This ${lowerCase(
                        this.modelName,
                    )} already exists in system.`,
                )
            }

            throw error
        }
    }

    async createMany(
        data: C[],
        opts?: {
            transaction?: PostgresTransaction
        },
        ...args: any[]
    ) {
        const database = opts?.transaction || this.db
        try {
            const rows = await database
                .insert(this.table)
                .values(data)
                .returning()

            return rows as E[]
        } catch (error: any) {
            if (error?.code === '23505') {
                throw new HttpException(
                    StatusCodes.BAD_REQUEST,
                    `This ${lowerCase(
                        this.modelName,
                    )} already exists in system.`,
                )
            }

            throw error
        }
    }

    /**
     * Updates a record in the database.
     *
     * @template T - The type of the returned value.
     * @param {Object} options - The options for the update operation.
     * @param {U} options.data - The data to update the record with.
     * @param {string} options.id - The ID of the record to update.
     * @returns {Promise<T>} - A promise that resolves to the updated record.
     */
    async update<_U = U>({
        data,
        id,
        opts,
    }: {
        data: _U
        id: string
        opts?: {
            throwIfNotFound?: boolean
            message?: string
            transaction?: PostgresTransaction
        }
    }) {
        const database = opts?.transaction || this.db
        try {
            if (opts?.throwIfNotFound) {
                await this.getOneById(id, opts)
            }

            const [rows] = await database
                .update(this.table)
                .set(data as Record<string, unknown>)
                .where(eq(get(this.table, 'id'), id))
                .returning()

            return rows as E
        } catch (error) {
            if (error?.code === '23505') {
                throw new HttpException(
                    StatusCodes.BAD_REQUEST,
                    `This ${lowerCase(
                        this.modelName,
                    )} already exists in system.`,
                )
            }
            throw error
        }
    }

    /**
     * Deletes a record from the database.
     *
     * @param id - The ID of the record to delete.
     * @returns A promise that resolves to the deleted record.
     * @template T - The type of the deleted record.
     */
    async delete(
        id: string,
        opts?: {
            throwIfNotFound?: boolean
            message?: string
            transaction?: PostgresTransaction
        },
    ) {
        const database = opts?.transaction || this.db
        if (opts?.throwIfNotFound) {
            await this.getOneById(id, opts)
        }

        const [rows] = await database
            .delete(this.table)
            .where(eq(get(this.table, 'id'), id))
            .returning()

        return rows as E
    }

    /**
     * Deletes multiple records from the database based on the provided IDs.
     *
     * @template T - The type of the returned value.
     * @param {string[]} ids - An array of IDs representing the records to be deleted.
     * @returns {Promise<T>} - A promise that resolves to the deleted records.
     */
    async deleteMany<T = E>(ids: string[], transaction?: PostgresTransaction) {
        const database = transaction || this.db
        const [rows] = await database
            .delete(this.table)
            .where(eq(get(this.table, 'id'), ids))
            .returning()

        return rows as T
    }

    /**
     * Retrieves a paginated list of items from the database based on the provided query and options.
     *
     * @template S - The type of the selected fields.
     * @template Q - The type of the paging query.
     * @param {TGetPagingQuery<Q, S>} options - The options for the paging query.
     * @returns {Promise<{ items: any[]; total: number }>} - The paginated list of items and the total count.
     * @example
     * async getPaging({ query }: TGetPagingQuery<QueryKitDto>) {
     * const { items, total } = await super.getPaging({
     *  query,
     *  opts: {
     *     searchFields: [kits.name],
     *     wheres: [eq(kits.id, 'p5h1l9i5phvbisywz9mzyp8o')],
     *  },
     *});
     *
     * return {
     *    items,
     *    total,
     *   };
     *}
     *
     */
    async getPaging<
        S extends SelectedFields,
        Q extends IBasePagingQuery = IBasePagingQuery,
    >({ query, callback, opts }: TGetPagingQuery<Q, S>) {
        const { page = 1, limit = 10, q = '', orderBy, asc: _asc } = query || {}
        const {
            wheres = [],
            searchFields = [],
            selectFields,
            defaultOrderBy = 'id',
        } = opts || {}

        const where = and(
            or(...searchFields.map((field) => ilike(field, `%${q}%`))),
            ...wheres,
        )

        const rows = this.db
            .select(selectFields)
            .from(this.table)
            .where(where)
            .offset((page - 1) * limit)
            //@ts-ignore
            .limit(limit)
            .orderBy(
                _asc
                    ? asc(get(this.table, orderBy) || defaultOrderBy)
                    : desc(get(this.table, orderBy) || defaultOrderBy),
            )
            .$dynamic()

        let result = []

        if (callback) {
            result = await callback(rows)
        } else {
            result = await rows
        }

        const [{ total }] = await db
            .select({
                total: sql<number>`cast(count(${get(
                    this.table,
                    'id',
                )}) as integer)`,
            })
            .from(this.table)
            .where(where)

        return {
            items: result,
            total,
        }
    }

    async getForSelect<
        V extends PgColumn = PgColumn,
        L extends PgColumn = PgColumn,
    >(opts: { fieldValue: V; fieldLabel: L }) {
        const { fieldValue, fieldLabel } = opts

        const rows = await this.db
            .select({
                value: fieldValue,
                label: fieldLabel,
            })
            .from(this.table)
            .orderBy(asc(fieldLabel))

        return rows
    }

    /**
     * Retrieves a paginated list of items from the database based on the provided query and options.
     * @param params - The query object.
     * @returns The paginated list of items and the total count.
     */
    async getPagingBuilder({
        filters = [],
        limit,
        orderBy = 'year|desc',
        page,
        withs = [],
        searchFields = [],
        q = '',
    }: IBasePagingBuilderQuery) {
        const filterParsed = parseFilters(this.table, filters || [])
        const orderByParsed = parseOrderBy(this.table, orderBy)
        const withParsed = parseWiths(withs)

        const where = and(
            or(
                ...searchFields.map((field) =>
                    ilike(get(this.table, field), `%${q}%`),
                ),
            ),
            ...(filterParsed || []),
        )

        const rows = await this.db.query[getTableName(this.table)].findMany({
            where,
            with: withParsed,
            limit: limit,
            orderBy: orderByParsed,
            offset: page ? (page - 1) * (limit || 0) : 0,
        })

        const [{ total }] = await db
            .select({
                total: sql<number>`cast(count(${get(
                    this.table,
                    'id',
                )}) as integer)`,
            })
            .from(this.table)
            .where(where)

        return {
            items: rows as E[],
            total,
        }
    }

    async getPagingBuilderV2({
        filters = [],
        limit,
        orderBy,
        page,
        withs = [],
        searchFields = [],
        q = '',
    }: IBasePagingBuilderQuery) {
        const filterParsed = parseFilters(this.table, filters || [])

        const where = and(
            or(
                ...searchFields.map((field) =>
                    ilike(get(schema, field, get(this.table, field)), `%${q}%`),
                ),
            ),
            ...(filterParsed || []),
        )

        let query = this.db.select().from(this.table).where(where).$dynamic()

        query = this.withPagination(query, page, limit)

        query = this.withOrderBy(query, orderBy)

        query = this.withRelations(query, withs)

        let totalQuery = this.db
            .select({
                total: sql<number>`cast(count(${get(
                    this.table,
                    'id',
                )}) as integer)`.as('total'),
            })
            .from(this.table)
            .where(where)
            .$dynamic()

        totalQuery = this.withRelations(totalQuery, withs)

        const [items, [{ total }]] = await Promise.all([query, totalQuery])

        return {
            items: items.map((item) =>
                nestObjects(getTableName(this.table), item),
            ),
            total,
        }
    }

    private withPagination<T extends PgSelect>(
        qb: T,
        page?: number,
        limit?: number,
    ) {
        if (page && limit) {
            qb = qb.offset((page - 1) * limit).limit(limit)
        }

        if (limit) {
            qb = qb.limit(limit)
        }

        return qb
    }

    private withOrderBy<T extends PgSelect>(qb: T, orderBy: string) {
        const parsedOrderBy = parseOrderBy(this.table, orderBy)

        if (parsedOrderBy) {
            qb = qb.orderBy(parsedOrderBy)
        }

        return qb
    }

    private withRelations<T extends PgSelect>(qb: T, withs: string[]) {
        for (const relat of withs) {
            const [table, column] = relat.split('|')
            qb = qb.leftJoin(
                get(schema, table),
                eq(get(get(schema, table), 'id'), get(this.table, column)),
            ) as any
        }

        return qb
    }
}

const nestObjects = (parentKey: string, data: Record<string, any>) => {
    const parent = data[parentKey]

    if (!parent) {
        return data
    }

    const keys = Object.keys(data)

    const nested = keys.reduce((acc, key) => {
        if (key === parentKey) {
            return {
                ...parent,
            }
        }

        if (!acc[key] && key !== parentKey) {
            acc[key] = data[key]
        }

        return acc
    }, {})

    return nested
}
