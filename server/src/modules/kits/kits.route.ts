import { IRoutes } from '@/interfaces/routes.interface'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { RolesMiddleware } from '@/middlewares/roles.middleware'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
import { Router } from 'express'
import Container from 'typedi'
import { KitsController } from './kits.controller'
import { KitDto, QueryKitDto } from './kits.dto'

export class KitsRoute implements IRoutes {
    path = '/kits'
    router = Router()
    controller = Container.get(KitsController)

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.get(`${this.path}/for-select`, this.controller.getForSelect)
        this.router.get(`${this.path}/get-all`, this.controller.getAll)

        this.router.get(`${this.path}/:id`, this.controller.getOneById)

        this.router.post(
            `${this.path}`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            ValidationMiddleware(KitDto),
            this.controller.create,
        )
        this.router.put(
            `${this.path}/:id`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            ValidationMiddleware(KitDto),
            this.controller.update,
        )
        this.router.delete(
            `${this.path}/:id`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            this.controller.delete,
        )
        this.router.get(
            this.path,
            ValidationMiddleware(QueryKitDto, 'query', true, false, true),
            this.controller.getPaging,
        )
    }
}
