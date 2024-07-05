import { IRoutes } from '@/interfaces/routes.interface'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { Router } from 'express'
import Container from 'typedi'
import { ResultController } from './result.controller'

export class ResultRoute implements IRoutes {
    path = '/results'
    router = Router()
    controller = Container.get(ResultController)

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.get(
            `${this.path}/practice-part/:historyId`,
            AuthMiddleware,
            this.controller.getPracticePartResult,
        )
    }
}
