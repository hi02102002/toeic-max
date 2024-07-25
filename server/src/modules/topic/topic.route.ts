import Container from 'typedi'

import { CrudRoute } from '@/libs/api/crud-route'
import { TopicController } from './topic.controller'
import { TopicDto, QueryTopicDto } from './topic.dto'

export class TopicRoute extends CrudRoute<TopicController> {
    constructor() {
        super({
            controller: Container.get(TopicController),
            dtos: {
                createDto: TopicDto,
                updateDto: TopicDto,
                queryDto: QueryTopicDto,
            },
            path: '/topics',
        })

        this.extendRoutes()
    }

    extendRoutes(): void {
        this.router.get(
            `${this.path}/children`,
            this.controller.getChildrenByParentId,
        )
        this.router.get(
            `${this.path}/parents/:id`,
            this.controller.getParentsByChildId,
        )
    }
}
