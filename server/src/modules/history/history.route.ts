import { CrudRoute } from '@/libs/api/crud.route'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
import Container from 'typedi'
import { HistoryController } from './history.controller'
import { HistoryDto, QueryHistoryDto } from './history.dto'

export class HistoryRoute extends CrudRoute<HistoryController> {
    constructor() {
        super({
            controller: Container.get(HistoryController),
            dtos: {
                createDto: HistoryDto,
                updateDto: HistoryDto,
                queryDto: QueryHistoryDto,
            },
            path: '/histories',
            configRoutes: {
                getForSelect: {
                    exclude: true,
                },
                create: {
                    roles: ['ADMIN', 'USER'],
                },
                update: {
                    roles: ['ADMIN', 'USER'],
                },
            },
        })

        this.extendRoutes()
    }

    extendRoutes(): void {
        this.router.post(
            `${this.path}/create-for-vocab`,
            AuthMiddleware,
            ValidationMiddleware(HistoryDto),
            this.controller.createForVocab,
        )
    }
}
