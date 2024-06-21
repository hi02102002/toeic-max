import { CRUDBaseController } from '@/libs/api/crud-controller'
import { Service } from 'typedi'
import { VocabularyService } from './vocabulary.service'

@Service()
export class VocabularyController extends CRUDBaseController<VocabularyService> {
    constructor(protected readonly service: VocabularyService) {
        super(service, 'Question')
    }
}
