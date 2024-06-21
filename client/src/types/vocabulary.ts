import type { TBaseQueryParams } from './common'

export type TVocabulary = {
    id: string
    name: string
    example: string
    image: string
    spelling: string
    type: string
    meaning: string
    topic_id: string
    created_at: string
    updated_at: string
    category: string
}

export type TQueryVocabulary = TBaseQueryParams & {
    topic_id?: string
}
