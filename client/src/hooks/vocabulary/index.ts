import { vocabularyApi } from '@/apis/vocabulary.api'
import type { TQueryVocabulary, TVocabulary } from '@/types/vocabulary'
import { CrudQueryClient } from '../crud-query-client'

const VocabularyClient = new CrudQueryClient<
    TVocabulary,
    TVocabulary,
    TQueryVocabulary,
    TVocabulary
>(vocabularyApi)

export const useCreateVocabulary = VocabularyClient.useCreate
export const useDeleteVocabulary = VocabularyClient.useDelete
export const useUpdateVocabulary = VocabularyClient.useUpdate
export const useVocabulary = VocabularyClient.useGetById
