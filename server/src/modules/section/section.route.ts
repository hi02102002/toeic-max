import { IRoutes } from '@/interfaces/routes.interface'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { RolesMiddleware } from '@/middlewares/roles.middleware'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
import { Router } from 'express'
import Container from 'typedi'
import { SectionController } from './section.controller'
import { QuerySectionDto, SectionDto } from './section.dto'

export class SectionRoute implements IRoutes {
    path = '/sections'
    router = Router()
    controller = Container.get(SectionController)

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.get(`${this.path}/part/:part`, this.controller.getByPart)
        this.router.get(`${this.path}/get-all`, this.controller.getAll)
        this.router.get(`${this.path}/:id`, this.controller.getOneById)
        this.router.post(
            `${this.path}`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            ValidationMiddleware(SectionDto),
            this.controller.create,
        )
        this.router.put(
            `${this.path}/:id`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            ValidationMiddleware(SectionDto),
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
            ValidationMiddleware(QuerySectionDto, 'query'),
            this.controller.getPaging,
        )
    }
}
