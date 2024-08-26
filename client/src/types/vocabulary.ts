import type { TBaseQueryParams } from './common'

export type TVocabulary = {
    id: string
    name: string
    example: string
    image: string
    spelling: string
    type: string
    meaning: string
    topicId: string
    createdAt: string
    updatedAt: string
    category: string
}

export type TQueryVocabulary = TBaseQueryParams & {
    topicId?: string
}
