import { CrudRoute } from '@/libs/api/crud.route'
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
    }

    extendRoutes(): void {
        throw new Error('Method not implemented.')
    }
}
