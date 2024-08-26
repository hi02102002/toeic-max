import { jsonBuildObject } from '@/database/helper'
import { kits, tests } from '@/database/schema'
import { TGetPagingQuery } from '@/libs/api'
import { CRUDBaseService } from '@/libs/api/crud.service'
import { eq, getTableColumns } from 'drizzle-orm'
import slugify from 'slugify'
import { Service } from 'typedi'
import { KitTestDto, QueryKitTestDto } from './kit-test.dto'
import { TTest } from './kit-test.type'

@Service()
export class KitTestService extends CRUDBaseService<
    KitTestDto,
    Partial<KitTestDto>,
    TTest
> {
    constructor() {
        super(tests)
    }

    async getAll<T = any>(): Promise<T[]> {
        return this.db.query.tests.findMany({
            with: {
                kit: true,
            },
        }) as any
    }

    async getPaging(opts: TGetPagingQuery<QueryKitTestDto>) {
        const { query } = opts

        const { items, total } = await super.getPaging({
            query,
            opts: {
                searchFields: [tests.name, tests.slug],
                wheres: [
                    query.kitId ? eq(tests.kitId, query.kitId) : undefined,
                ],
                selectFields: {
                    ...getTableColumns(tests),
                    kit: jsonBuildObject({
                        ...getTableColumns(kits),
                    }),
                },
            },
            callback(query) {
                return query.leftJoin(kits, eq(tests.kitId, kits.id))
            },
        })

        return {
            items,
            total,
        }
    }

    async create<T = TTest>(data: KitTestDto) {
        const test = await super.create({
            ...data,
            slug: slugify(`${data.name} ${Date.now()}`, { lower: true }),
        })

        return test as T
    }

    async update({ data, id }: { data: KitTestDto; id: string }) {
        const test = await super.update({
            id,
            opts: {
                message: 'Test with this id not found.',
                throwIfNotFound: true,
            },
            data: {
                ...data,
                slug: slugify(data.name, { lower: true }),
            },
        })

        return test
    }
}
