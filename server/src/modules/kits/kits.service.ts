import { kits } from '@/database/schema'
import { CRUDBaseService, TGetPagingQuery } from '@/libs/api/crud-service'
import { Service } from 'typedi'
import { KitDto, QueryKitDto } from './kits.dto'
import { TKit } from './kits.type'

@Service()
export class KitsService extends CRUDBaseService<
    KitDto,
    Partial<KitDto>,
    TKit
> {
    constructor() {
        super(kits, 'Kit')
    }

    async create<T = TKit>(data: KitDto): Promise<T> {
        const { name, year } = data

        const kit = await super.create<T>({
            name: `${name} ${year}`,
            year,
        })

        return kit
    }

    async getPaging({ query }: TGetPagingQuery<QueryKitDto>) {
        const { items, total } = await super.getPaging({
            query,
            opts: {
                searchFields: [kits.name],
            },
        })

        return {
            items,
            total,
        }
    }
}
