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
        super(kits)
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
