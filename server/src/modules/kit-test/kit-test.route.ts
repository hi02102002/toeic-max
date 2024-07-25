import { CrudRoute } from '@/libs/api/crud-route'
import Container from 'typedi'
import { KitTestController } from './kit-test.controller'
import { KitTestDto, QueryKitTestDto } from './kit-test.dto'

export class KitTestRoute extends CrudRoute<KitTestController> {
    extendRoutes(): void {
        throw new Error('Method not implemented.')
    }

    constructor() {
        super({
            controller: Container.get(KitTestController),
            dtos: {
                createDto: KitTestDto,
                updateDto: KitTestDto,
                queryDto: QueryKitTestDto,
            },
            path: '/kit-tests',
        })
    }
}
