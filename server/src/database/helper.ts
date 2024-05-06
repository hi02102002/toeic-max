import { sql } from 'drizzle-orm';
import type { AnyColumn, AnyTable, InferSelectModel, SQL } from 'drizzle-orm';
import type { PgColumn, PgTable, SelectedFields, TableConfig } from 'drizzle-orm/pg-core';
import type { SelectResultFields } from 'drizzle-orm/query-builders/select.types';
import { omit } from 'lodash';

/**
 * Returns a SQL query that selects distinct values based on the specified column.
 *
 * @template Column - The type of the column.
 * @param {Column} column - The column to select distinct values on.
 * @returns {SQLQuery<Column['_']['data']>} - The SQL query selecting distinct values on the specified column.
 */
export function distinctOn<Column extends AnyColumn>(column: Column) {
  return sql<Column['_']['data']>`distinct on (${column}) ${column}`;
}

/**
 * Builds a JSON object using the provided shape.
 * @param shape - The shape of the JSON object.
 * @returns The JSON object as a SQL query.
 */
export function jsonBuildObject<T extends SelectedFields>(shape: T) {
  const chunks: SQL[] = [];

  Object.entries(shape).forEach(([key, value]) => {
    if (chunks.length > 0) {
      chunks.push(sql.raw(','));
    }
    chunks.push(sql.raw(`'${key}',`));
    chunks.push(sql`${value}`);
  });

  return sql<SelectResultFields<T>>`coalesce(jsonb_build_object(${sql.join(chunks)}), '{}')`;
}

/**
 * Builds a JSON object by aggregating distinct values from the specified shape and table.
 *
 * @template T - The type of the selected fields.
 * @template Table - The type of the table.
 * @param {T} shape - The shape of the JSON object.
 * @param {Table} table - The table to aggregate values from.
 * @returns {SQLQuery<SelectResultFields<T>[]>} - The SQL query for aggregating the JSON object.
 */
export function jsonAggBuildDistinctObject<T extends SelectedFields, Table extends AnyTable<TableConfig>>(shape: T, table: Table) {
  return sql<SelectResultFields<T>[]>`
        jsonb_agg(
           distinct ${jsonBuildObject(shape)} 
        ) filter (where ${table} is not null)
    `;
}
/**
 * Builds a JSON object using the specified shape and table, and returns the result as a JSON array.
 *
 * @template T - The type of the selected fields.
 * @template Column - The type of the column.
 * @template Table - The type of the table.
 *
 * @param shape - The shape of the JSON object to build.
 * @param table - The table to filter the JSON array by.
 * @param options - Optional parameters for ordering the JSON array.
 * @param options.orderBy - The column and direction to order the JSON array by.
 *
 * @returns A SQL query that builds a JSON array using the specified shape and table.
 */
export function jsonAggBuildObject<T extends SelectedFields, Column extends AnyColumn, Table extends AnyTable<TableConfig>>(
  shape: T,
  table: Table,
  options?: { orderBy?: { colName: Column; direction: 'ASC' | 'DESC' } },
) {
  return sql<SelectResultFields<T>[]>`coalesce(jsonb_agg(${jsonBuildObject(shape)}${
    options?.orderBy ? sql`order by ${options.orderBy.colName} ${sql.raw(options.orderBy.direction)}` : undefined
  }) filter (where ${table} is not null), '${sql`[]`}')`;
}

/**
 * Returns a SQL query that aggregates the rows of a table into a JSON array.
 *
 * @param table - The table to aggregate.
 * @returns A SQL query that aggregates the rows of the table into a JSON array.
 */
export function jsonAgg<Table extends AnyTable<TableConfig>>(table: Table) {
  return sql<InferSelectModel<Table>[]>`json_agg(${table}) filter (where ${table} is not null)`;
}

/**
 * Selects all fields from a table.
 *
 * @param table - The table object.
 * @returns An object containing all the fields of the table.
 */
export function selectAllFields<Table extends PgTable>(table: Table) {
  const _table = omit(table, ['_', '$inferInsert', '$inferSelect', 'getSQL']);
  const result: Record<string, PgColumn> = {};

  Object.entries(_table).forEach(([key, value]) => {
    result[key] = value as any;
  });

  return result;
}

/**
 * Represents a SQL query that checks if null is null.
 */
export const nullIsNull = sql`null is null`;

/**
 * Represents a SQL query to count the number of records.
 */
export const count = sql<number>`count(*)`;
