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
        const parents = await this.service.getAllParentByChildId(id as string)
        res.json({
            data: parents,
        })
    })

    getChildrenByParentId = catchAsync(async (req, res) => {
        const { parentId } = req.query
        const children = await this.service.getAllChildByParentId(
            parentId as string,
        )
        res.json({
            data: children,
        })
    })
}
