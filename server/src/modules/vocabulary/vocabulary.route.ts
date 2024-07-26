import Container from 'typedi'

import { CrudRoute } from '@/libs/api/crud.route'
import { VocabularyController } from './vocabulary.controller'
import { QueryVocabularyDto, VocabularyDto } from './vocabulary.dto'

export class VocabulariesRoute extends CrudRoute<VocabularyController> {
    constructor() {
        super({
            controller: Container.get(VocabularyController),
            dtos: {
                createDto: VocabularyDto,
                updateDto: VocabularyDto,
                queryDto: QueryVocabularyDto,
            },
            path: '/vocabularies',
        })
    }

    extendRoutes(): void {
        throw new Error('Method not implemented.')
    }
}
