import { DB, db } from '@/database/db';
import { toBoolean } from '@/utils/common';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumberString, IsOptional, IsString } from 'class-validator';
import { SQLWrapper, and, asc, desc, eq, ilike, or, sql } from 'drizzle-orm';
import { PgColumn, PgSelect, PgSelectBase, PgTable, SelectedFields, SelectedFieldsFlat, TableConfig } from 'drizzle-orm/pg-core';
import { SelectResultFields } from 'drizzle-orm/query-builders/select.types';
import { get, isEmpty } from 'lodash';

export class BaseQueryDto implements IBasePagingQuery {
  @IsNumberString()
  @IsOptional()
  page?: number;
  @IsNumberString()
  @IsOptional()
  limit?: number;
  @IsString()
  @IsOptional()
  q?: string;
  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => toBoolean(value))
  asc?: boolean;
}

export interface IBasePagingQuery {
  page?: number;
  limit?: number;
  q?: string;
  orderBy?: string;
  asc?: boolean;
  [key: string]: any;
}

export type TGetPagingQuery<Q extends IBasePagingQuery = IBasePagingQuery, S extends SelectedFields = SelectedFields> = {
  query?: Q;
  callback?: (query: PgSelect) => Promise<any>;
  opts?: {
    wheres?: SQLWrapper[];
    searchFields?: PgColumn[];
    selectFields?: S;
  };
};

/**
 * The base service class for interacting with the database.
 * @template C - The type of the data to create.
 * @template U - The type of the data to update.
 * @template E - The type of the entity.
 */
export abstract class BaseService<C extends Object = Object, U extends Object = Object, E extends unknown = unknown> {
  protected db: DB = db;
  protected table: PgTable<TableConfig>;

  constructor(table: PgTable<TableConfig>) {
    this.db = db;
    this.table = table;
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
  async getOneById<T extends unknown = E>(
    id: string,
    opts?: {
      throwIfNotFound?: boolean;
      message?: string;
    },
  ) {
    const [rows] = await this.db
      .select()
      .from(this.table)
      .where(eq(get(this.table, 'id'), id))
      .limit(1);

    if (isEmpty(rows) && opts?.throwIfNotFound) {
      throw new Error(opts.message || 'Record not found');
    }

    if (isEmpty(rows)) return null;

    return rows as T;
  }

  /**
   * Retrieves all records from the database table.
   *
   * @returns {Promise<T[]>} A promise that resolves to an array of records.
   * @template T The type of the records to retrieve.
   */
  async getAll<T extends unknown = E>() {
    const rows = await this.db.select().from(this.table);

    return rows as T[];
  }

  /**
   * Creates a new record in the database.
   *
   * @template T - The type of the returned record.
   * @param {C} data - The data to be inserted.
   * @returns {Promise<T>} - A promise that resolves to the newly created record.
   */
  async create<T extends unknown = E>(data: C, opts?: {
    throwIfFound?: boolean;
    message?: string;
    foundKey?: keyof C;
  }) {
    try {

    const [rows] = await this.db.insert(this.table).values(data).returning();

    return rows as T;
    } catch (error: any) {

      console.log(opts)

      console.log(opts?.throwIfFound && error.code === '23505');

      if (opts?.throwIfFound && error.code === '23505') {
        throw new Error(opts.message || `Record with this ${String(opts.foundKey)} already exists`);
      }

      throw error;
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
  async update<T extends unknown = E>({ data, id,opts }: {
    data: U; id: string,

    opts?: {
      throwIfNotFound?: boolean;
      message?: string;
    }
   }) {

    if (opts?.throwIfNotFound) {
      await this.getOneById(id, opts);
    }


    const [rows] = await this.db
      .update(this.table)
      .set(data as Record<any, any>)
      .where(eq(get(this.table, 'id'), id))
      .returning();

    return rows as T;
  }

  /**
   * Deletes a record from the database.
   *
   * @param id - The ID of the record to delete.
   * @returns A promise that resolves to the deleted record.
   * @template T - The type of the deleted record.
   */
  async delete<T extends unknown = E>(id: string) {
    const [rows] = await this.db
      .delete(this.table)
      .where(eq(get(this.table, 'id'), id))
      .returning();

    return rows as T;
  }

  /**
   * Deletes multiple records from the database based on the provided IDs.
   *
   * @template T - The type of the returned value.
   * @param {string[]} ids - An array of IDs representing the records to be deleted.
   * @returns {Promise<T>} - A promise that resolves to the deleted records.
   */
  async deleteMany<T extends unknown = E>(ids: string[]) {
    const [rows] = await this.db
      .delete(this.table)
      .where(eq(get(this.table, 'id'), ids))
      .returning();

    return rows as T;
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
  async getPaging<S extends SelectedFields, Q extends IBasePagingQuery = IBasePagingQuery>({ query, callback, opts }: TGetPagingQuery<Q, S>) {
    const { page = 1, limit = 10, q = '', orderBy, asc: _asc } = query || {};
    const { wheres = [], searchFields = [], selectFields } = opts || {};

    const where = and(or(...searchFields.map(field => ilike(field, `%${q}%`))), ...wheres);

    let rows = this.db
      .select(selectFields)
      .from(this.table)
      .where(where)
      .offset((page - 1) * limit)
      //@ts-ignore
      .limit(limit)
      .orderBy(_asc ? asc(get(this.table, orderBy) || 'id') : desc(get(this.table, orderBy) || 'id'))
      .$dynamic();

    let result = [];

    if (callback) {
      result = await callback(rows);
    } else {
      result = await rows;
    }

    const [{ total }] = await db
      .select({
        total: sql<number>`cast(count(${get(this.table, 'id')}) as integer)`,
      })
      .from(this.table)
      .where(where);

    return {
      items: result,
      total,
    };
  }

  async getForSelect<V extends PgColumn = PgColumn, L extends PgColumn = PgColumn>(opts: { fieldValue: V; fieldLabel: L }) {
    const { fieldValue, fieldLabel } = opts;

    const rows = await this.db
      .select({
        value: fieldValue,
        label: fieldLabel,
      })
      .from(this.table);

    return rows;
  }
}
