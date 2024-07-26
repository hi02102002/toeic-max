import { tests } from '@/database/schema'
import { CRUDBaseController } from '@/libs/api/crud.controller'
import { Service } from 'typedi'
import { KitTestService } from './kit-test.service'

@Service()
export class KitTestController extends CRUDBaseController<KitTestService> {
    constructor(protected readonly service: KitTestService) {
        super(service, 'Test', {
            label: tests.name,
            value: tests.id,
        })
    }
}
