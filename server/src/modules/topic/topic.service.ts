import { topics } from '@/database/schema'
import { CRUDBaseService, TGetPagingQuery } from '@/libs/api/crud-service'
import { getFirstNumberInString } from '@/utils/common'
import { count, eq, getTableColumns, isNull, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { Service } from 'typedi'
import { CreateTopicDto, QueryTopicDto } from './topic.dto'
import { TTopic } from './topic.type'

@Service()
export class TopicService extends CRUDBaseService<
    CreateTopicDto,
    Partial<CreateTopicDto>,
    TTopic
> {
    constructor() {
        super(topics, 'Topic')
    }

    async getPaging({ query }: TGetPagingQuery<QueryTopicDto>) {
        const { parent_id, asc = true, ...rest } = query

        const colsObj = getTableColumns(topics)

        const children = alias(topics, 'children')

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
                },
                defaultOrderBy: 'name',
            },
            callback(query) {
                return query
                    .leftJoin(children, eq(topics.id, children.parent_id))
                    .groupBy(topics.id)
            },
        })

        return {
            items: items.sort((a, b) => {
                if (rest.orderBy !== 'name') return 0

                const aNumber = getFirstNumberInString(a.name)
                const bNumber = getFirstNumberInString(b.name)

                if (asc) {
                    return aNumber - bNumber
                }

                return bNumber - aNumber
            }),
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

    async getAllChildByParentId(parentId: string) {
        const res = await this.db.execute(
            sql`
        WITH RECURSIVE child AS (
          SELECT
            *
          FROM
            topics
          WHERE
            parent_id = ${parentId}
          UNION ALL
          SELECT
            t.*
          FROM
            topics t
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
