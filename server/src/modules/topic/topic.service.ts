import { jsonBuildObject } from '@/database/helper'
import { topics } from '@/database/schema'
import { CRUDBaseService, TGetPagingQuery } from '@/libs/api'
import { getFirstNumberInString } from '@/utils/common'
import {
    asc,
    count,
    asc as dAsc,
    desc,
    eq,
    getTableColumns,
    isNull,
    sql,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { get } from 'lodash'
import slugify from 'slugify'
import { Service } from 'typedi'
import { QueryTopicDto, TopicDto } from './topic.dto'
import { TTopic } from './topic.type'

@Service()
export class TopicService extends CRUDBaseService<
    Pick<TTopic, 'name' | 'level' | 'parentId' | 'order'>,
    TopicDto,
    TTopic
> {
    constructor() {
        super(topics)
    }

    async create<T = TTopic>(data: TopicDto) {
        let parent: TTopic | null = null

        if (data.parentId) {
            parent = await this.getOneById(data.parentId)
        }

        const topic = await super.create({
            level: parent ? parent.level + 1 : 1,
            order: getFirstNumberInString(data.name) || 0,
            name: data.name,
            parentId: data.parentId,
        })

        return topic as T
    }

    async update({ data, id }: { data: TopicDto; id: string }) {
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

        return topic
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
        const { parentId, asc = true, orderBy = 'name', ...rest } = query

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
                    eq(topics.parentId, parentId ?? isNull(topics.parentId)),
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
                    .leftJoin(children, eq(topics.id, children.parentId))
                    .leftJoin(parent, eq(topics.parentId, parent.id))
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

    async getAllChildByParentId(
        parentId: string | null = null,
        limit?: number,
    ) {
        const where = parentId
            ? eq(topics.parentId, parentId)
            : isNull(topics.parentId)

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
          ORDER BY t.order ASC
          LIMIT ${limit || 9999}
        )
        SELECT DISTINCT
          *
        FROM
          child;
      `,
        )
        return res.rows as TTopic[]
    }

    async getGroupedTopics(parentId?: string | null, limit?: number) {
        const parents = await this.db.query.topics.findMany({
            where: parentId ? eq(topics.id, parentId) : isNull(topics.parentId),
            orderBy: asc(topics.order),
            with: {
                children: {
                    orderBy: asc(topics.order),
                    limit,
                    with: {
                        children: {
                            orderBy: asc(topics.order),
                            limit: 1,
                        },
                    },
                },
                vocabularies: true,
            },
        })

        return parents.reduce((acc, parent) => {
            acc[`${parent.name}-${parent.id}`] = get(parent, 'children', [])

            return acc
        }, {})
    }
}
