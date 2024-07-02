import { CRUDBaseController } from '@/libs/api/crud-controller'
import { Service } from 'typedi'
import { HistoryService } from './history.service'

@Service()
export class HistoryController extends CRUDBaseController<HistoryService> {
    constructor(protected readonly service: HistoryService) {
        super(service, 'History')
    }
}
