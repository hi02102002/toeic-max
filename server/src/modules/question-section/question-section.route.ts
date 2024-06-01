import { IRoutes } from '@/interfaces/routes.interface'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
import { Router } from 'express'
import Container from 'typedi'
import { QuestionSectionController } from './question-section.controller'
import {
    CreateQuestionDto,
    QueryQuestionSectionDto,
} from './question-section.dto'

export class QuestionSectionRoute implements IRoutes {
    path = '/questions'
    router = Router()
    controller = Container.get(QuestionSectionController)

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.get(`${this.path}/get-all`, this.controller.getAll)
        this.router.get(`${this.path}/:id`, this.controller.getOneById)
        this.router.post(
            `${this.path}`,
            ValidationMiddleware(CreateQuestionDto),
            this.controller.create,
        )
        this.router.put(
            `${this.path}/:id`,
            ValidationMiddleware(CreateQuestionDto),
            this.controller.update,
        )
        this.router.delete(`${this.path}/:id`, this.controller.delete)
        this.router.get(
            this.path,
            ValidationMiddleware(QueryQuestionSectionDto, 'query'),
            this.controller.getPaging,
        )
    }
}
