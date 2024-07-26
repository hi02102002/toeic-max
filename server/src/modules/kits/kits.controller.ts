import { kits } from '@/database/schema'
import { CRUDBaseController } from '@/libs/api/crud.controller'
import { Service } from 'typedi'
import { KitsService } from './kits.service'

@Service()
export class KitsController extends CRUDBaseController<KitsService> {
    constructor(protected readonly service: KitsService) {
        super(service, 'Kit', {
            label: kits.name,
            value: kits.id,
        })
    }
}
