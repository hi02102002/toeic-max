import { tests } from '@/database/schema'
import { CRUDBaseService } from '@/libs/api/crud-service'
import slugify from 'slugify'
import { Service } from 'typedi'
import { KitTestDto } from './kit-test.dto'
import { TTest } from './test.type'

@Service()
export class KitTestService extends CRUDBaseService<
    KitTestDto,
    Partial<KitTestDto>,
    TTest
> {
    constructor() {
        super(tests)
    }

    async create<T = TTest>(data: KitTestDto) {
        const test = await super.create(
            {
                ...data,
                slug: slugify(data.name, { lower: true }),
            },
            {
                foundKey: 'name',
                message: `Test with this name already exists`,
                throwIfFound: true,
            },
        )

        return test as T
    }

    async update<T = TTest>({ data, id }: { data: KitTestDto; id: string }) {
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

        return test as T
    }
}
