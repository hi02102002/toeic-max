import { jsonBuildObject } from '@/database/helper'
import { topics } from '@/database/schema'
import { HttpException } from '@/exceptions/http-exception'
import { CRUDBaseService, TGetPagingQuery } from '@/libs/api/crud-service'
import { getFirstNumberInString } from '@/utils/common'
import {
    count,
    asc as dAsc,
    desc,
    eq,
    getTableColumns,
    isNull,
    sql,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { StatusCodes } from 'http-status-codes'
import { lowerCase } from 'lodash'
import slugify from 'slugify'
import { Service } from 'typedi'
import { CreateTopicDto, QueryTopicDto } from './topic.dto'
import { TTopic } from './topic.type'

@Service()
export class TopicService extends CRUDBaseService<
    CreateTopicDto,
    Partial<TTopic>,
    TTopic
> {
    constructor() {
        super(topics, 'Topic')
    }

    async create<T = TTopic>(data: CreateTopicDto) {
        try {
            let parent: TTopic | null = null

            if (data.parent_id) {
                parent = await this.getOneById(data.parent_id)
            }

            const [newTopic] = await this.db
                .insert(topics)
                .values({
                    ...data,
                    slug: slugify(data.name, {
                        lower: true,
                    }),
                    level: parent ? parent.level + 1 : 1,
                })
                .returning()

            return newTopic as T
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

    async update<T = TTopic>({
        data,
        id,
    }: {
        data: CreateTopicDto
        id: string
    }) {
        const topic = await super.update({
            id,
            opts: {
                throwIfNotFound: true,
            },
            data: {
                ...data,
                slug: slugify(data.name, {
                    lower: true,
                }),
            },
        })

        return topic as T
    }

    async getAll<T = TTopic>() {
        const res = await super.getAll()

        return res.sort((a, b) => {
            const aNumber = getFirstNumberInString(a.name)
            const bNumber = getFirstNumberInString(b.name)

            return aNumber - bNumber
        }) as T[]
    }

    async getPaging({ query }: TGetPagingQuery<QueryTopicDto>) {
        const { parent_id, asc = true, orderBy = 'name', ...rest } = query

        const colsObj = getTableColumns(topics)

        const children = alias(topics, 'children')
        const parent = alias(topics, 'parent')

        const { items, total } = await super.getPaging({
            query: {
                ...rest,
                asc,
            },
            opts: {
                wheres: [
                    eq(topics.parent_id, parent_id ?? isNull(topics.parent_id)),
                ],
                searchFields: [topics.name],
                selectFields: {
                    ...colsObj,
                    children_count: count(children.id).as('children_count'),
                    parent: jsonBuildObject({
                        ...getTableColumns(parent),
                    }),
                },
                defaultOrderBy: 'name',
            },
            callback(query) {
                query = query
                    .leftJoin(children, eq(topics.id, children.parent_id))
                    .leftJoin(parent, eq(topics.parent_id, parent.id))
                    .groupBy(topics.id, parent.id)

                if (orderBy !== 'name') return query

                if (asc) {
                    return query.orderBy(dAsc(topics.order))
                }

                return query.orderBy(desc(topics.order))
            },
        })

        return {
            items,
            total,
        }
    }

    async getAllParentByChildId(childId: string) {
        const res = await this.db.execute(
            sql`
                  WITH RECURSIVE parent AS (
                      SELECT
                          *
                      FROM
                          topics
                      WHERE
                          id = ${childId}
                      UNION ALL
                      SELECT
                          t.*
                      FROM
                          topics t
                      JOIN
                          parent p ON t.id = p.parent_id
                  )
                  SELECT DISTINCT
                      *
                  FROM
                      parent;
        `,
        )
        return res.rows as TTopic[]
    }

    async getAllChildByParentId(parentId: string | null = null) {
        const where = parentId
            ? eq(topics.parent_id, parentId)
            : isNull(topics.parent_id)

        const res = await this.db.execute(
            sql`
        WITH RECURSIVE child AS (
          SELECT
            *
          FROM
            ${topics}
          WHERE
            ${where}
          UNION ALL
          SELECT
            t.*
          FROM
            ${topics} t
          JOIN
            child c ON t.parent_id = c.id
        )
        SELECT DISTINCT
          *
        FROM
          child;
      `,
        )
        return res.rows as TTopic[]
    }
}
