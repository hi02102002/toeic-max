import { API_ENDPOINTS } from '@/constants'
import type { TSelectResponse } from '@/types/common'
import type { TQueryVocabulary, TVocabulary } from '@/types/vocabulary'
import { BaseCrudApi } from './crud.api'

class VocabularyApi extends BaseCrudApi<
    TVocabulary,
    TVocabulary,
    TQueryVocabulary,
    TVocabulary
> {
    select(): Promise<TSelectResponse[]> {
        throw new Error('Method not implemented.')
    }

    constructor() {
        super(API_ENDPOINTS.VOCABULARIES.INDEX)
    }
}

export const vocabularyApi = new VocabularyApi()
