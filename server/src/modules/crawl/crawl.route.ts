import { IRoutes } from '@/interfaces/routes.interface'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { RolesMiddleware } from '@/middlewares/roles.middleware'
import { Router } from 'express'
import Container from 'typedi'
import { CrawlController } from './crawl.controller'

export class CrawlRoute implements IRoutes {
    path = '/crawl'
    router = Router()
    controller = Container.get(CrawlController)

    constructor() {
        this.initRoutes()
    }

    initRoutes() {
        this.router.get(
            `${this.path}/kits`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            this.controller.crawlKits,
        )
        this.router.get(
            `${this.path}/kits/:id`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            this.controller.crawlKit,
        )
        this.router.get(
            `${this.path}/topics`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            this.controller.crawlTopics,
        )
        this.router.get(
            `${this.path}/courses`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            this.controller.crawlCourses,
        )
        this.router.get(
            `${this.path}/course-topic/:id`,
            AuthMiddleware,
            RolesMiddleware(['ADMIN']),
            this.controller.crawlCourseTopic,
        )

        this.router.get(`${this.path}/spell`, this.controller.crawlSpell)

        this.router.get(`${this.path}/direct`, this.controller.getDirect)
    }
}
