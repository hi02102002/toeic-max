import { CrudQueryClient } from '../crud-query-client'
import type { TBaseQueryParams } from '@/types/common'
import type { TSectionQuestion } from '@/types/question'
import { questionApi } from '@/apis/question.api'

const SectionQuestionClient = new CrudQueryClient<
    TSectionQuestion,
    TSectionQuestion,
    TBaseQueryParams,
    TSectionQuestion
>(questionApi)

export const useCreateSectionQuestion = SectionQuestionClient.useCreate
export const useDeleteSectionQuestion = SectionQuestionClient.useDelete
export const useUpdateSectionQuestion = SectionQuestionClient.useUpdate
