import { IRoutes } from '@/interfaces/routes.interface'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
import { Router } from 'express'
import Container from 'typedi'

import { VocabularyController } from './vocabulary.controller'
import { CreateVocabularyDto, QueryVocabularyDto } from './vocabulary.dto'

export class VocabulariesRoute implements IRoutes {
    path = '/vocabularies'
    router = Router()
    controller = Container.get(VocabularyController)

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.get(`${this.path}/get-all`, this.controller.getAll)
        this.router.get(`${this.path}/:id`, this.controller.getOneById)
        this.router.post(
            `${this.path}`,
            ValidationMiddleware(CreateVocabularyDto),
            this.controller.create,
        )
        this.router.put(
            `${this.path}/:id`,
            ValidationMiddleware(CreateVocabularyDto),
            this.controller.update,
        )
        this.router.delete(`${this.path}/:id`, this.controller.delete)
        this.router.get(
            this.path,
            ValidationMiddleware(QueryVocabularyDto, 'query'),
            this.controller.getPaging,
        )
    }
}
