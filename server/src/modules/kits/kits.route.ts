import { CrudRoute } from '@/libs/api/crud.route'
import Container from 'typedi'
import { KitsController } from './kits.controller'
import { KitDto, QueryKitDto } from './kits.dto'

export class KitsRoute extends CrudRoute<KitsController> {
    path: string = '/kits'

    constructor() {
        super({
            controller: Container.get(KitsController),
            dtos: {
                createDto: KitDto,
                updateDto: KitDto,
                queryDto: QueryKitDto,
            },
            path: '/kits',
        })
    }

    extendRoutes(): void {
        throw new Error('Method not implemented.')
    }
}
