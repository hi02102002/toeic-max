import { IRoutes } from '@/interfaces/routes.interface'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { RolesMiddleware } from '@/middlewares/roles.middleware'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
import { Router } from 'express'
import Container from 'typedi'
import { HistoryController } from './history.controller'
import { HistoryDto, QueryHistoryDto } from './history.dto'

export class HistoryRoute implements IRoutes {
    path = '/histories'
    router = Router()
    controller = Container.get(HistoryController)

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.get(`${this.path}/get-all`, this.controller.getAll)
        this.router.get(`${this.path}/:id`, this.controller.getOneById)
        this.router.post(
            `${this.path}`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN', 'USER']),
            ValidationMiddleware(HistoryDto),
            this.controller.create,
        )
        this.router.put(
            `${this.path}/:id`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN', 'USER']),
            ValidationMiddleware(HistoryDto),
            this.controller.update,
        )
        this.router.delete(`${this.path}/:id`, this.controller.delete)
        this.router.get(
            this.path,
            ValidationMiddleware(QueryHistoryDto, 'query'),
            this.controller.getPaging,
        )
    }
}
