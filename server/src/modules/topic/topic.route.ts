import { IRoutes } from '@/interfaces/routes.interface'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
import { Router } from 'express'
import Container from 'typedi'

import { TopicController } from './topic.controller'
import { CreateTopicDto, QueryTopicDto } from './topic.dto'

export class TopicRoute implements IRoutes {
    path = '/topics'
    router = Router()
    controller = Container.get(TopicController)

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.get(
            `${this.path}/parents/:id`,
            this.controller.getParentsByChildId,
        )
        this.router.get(`${this.path}/for-select`, this.controller.getForSelect)
        this.router.get(`${this.path}/get-all`, this.controller.getAll)
        this.router.get(`${this.path}/:id`, this.controller.getOneById)
        this.router.post(
            `${this.path}`,
            ValidationMiddleware(CreateTopicDto),
            this.controller.create,
        )
        this.router.put(
            `${this.path}/:id`,
            ValidationMiddleware(CreateTopicDto),
            this.controller.update,
        )
        this.router.delete(`${this.path}/:id`, this.controller.delete)
        this.router.get(
            this.path,
            ValidationMiddleware(QueryTopicDto, 'query'),
            this.controller.getPaging,
        )
    }
}