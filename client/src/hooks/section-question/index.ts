import { CrudQueryClient } from '../crud-query-client'
import type { TBaseQueryParams } from '@/types/common'
import type { TSectionQuestion } from '@/types/question'
import { questionApi } from '@/apis/question.api'
import type { QuestionSectionSchemaType } from '@/validators/question-section'

const SectionQuestionClient = new CrudQueryClient<
    QuestionSectionSchemaType,
    QuestionSectionSchemaType,
    TBaseQueryParams,
    TSectionQuestion
>(questionApi)

export const useCreateSectionQuestion = SectionQuestionClient.useCreate
export const useDeleteSectionQuestion = SectionQuestionClient.useDelete
export const useUpdateSectionQuestion = SectionQuestionClient.useUpdate
export const useSectionQuestion = SectionQuestionClient.useGetById
