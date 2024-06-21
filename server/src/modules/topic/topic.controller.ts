import { topics } from '@/database/schema'
import { CRUDBaseController } from '@/libs/api/crud-controller'
import { catchAsync } from '@/utils/catch-async'
import { Service } from 'typedi'
import { TopicService } from './topic.service'

@Service()
export class TopicController extends CRUDBaseController<TopicService> {
    constructor(protected readonly service: TopicService) {
        super(service, 'Topic', {
            label: topics.name,
            value: topics.id,
        })
    }

    getParentsByChildId = catchAsync(async (req, res) => {
        const { id } = req.params
        const parents = await this.service.getAllChildByParentId(id as string)
        res.json({
            data: parents,
        })
    })
}
