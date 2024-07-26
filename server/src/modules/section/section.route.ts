import { CrudRoute } from '@/libs/api/crud.route'
import Container from 'typedi'
import { SectionController } from './section.controller'
import { QuerySectionDto, SectionDto } from './section.dto'

export class SectionRoute extends CrudRoute<SectionController> {
    constructor() {
        super({
            controller: Container.get(SectionController),
            dtos: {
                createDto: SectionDto,
                updateDto: SectionDto,
                queryDto: QuerySectionDto,
            },
            path: '/sections',
        })
        this.extendRoutes()
    }

    extendRoutes(): void {
        this.router.get(`${this.path}/part/:part`, this.controller.getByPart)
    }
}
