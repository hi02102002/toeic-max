import { vocabularyApi } from '@/apis/vocabulary.api'
import type { TQueryVocabulary, TVocabulary } from '@/types/vocabulary'
import type { TInputVocabularySchemaType } from '@/validators'
import { CrudQueryClient } from '../crud-query-client'

export const VocabularyClient = new CrudQueryClient<
    TInputVocabularySchemaType,
    TInputVocabularySchemaType,
    TQueryVocabulary,
    TVocabulary
>(vocabularyApi)

export const useCreateVocabulary = VocabularyClient.useCreate
export const useDeleteVocabulary = VocabularyClient.useDelete
export const useUpdateVocabulary = VocabularyClient.useUpdate
export const useVocabulary = VocabularyClient.useGetById
