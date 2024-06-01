import { CRUDBaseController } from '@/libs/api/crud-controller'
import { Service } from 'typedi'
import { QuestionSectionService } from './question-section.service'

@Service()
export class QuestionSectionController extends CRUDBaseController<QuestionSectionService> {
    constructor(protected readonly service: QuestionSectionService) {
        super(service, 'Question')
    }
}
