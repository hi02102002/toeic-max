import { questionApi } from '@/apis/question.api'
import type { TBaseQueryParams } from '@/types/common'
import type { TSectionQuestion } from '@/types/question'
import type { QuestionSectionSchemaType } from '@/validators/question-section'
import { queryOptions, useQuery } from '@tanstack/vue-query'
import { CrudQueryClient } from '../crud-query-client'

export const forPracticeOptions = (part: number, numOfQuestions: number) =>
    queryOptions({
        queryKey: [
            'questions',
            'for-practice',
            part,
            numOfQuestions,
            Date.now(),
        ],
        queryFn: () => questionApi.getForPractice(part, numOfQuestions),
        initialData: [],
        refetchOnWindowFocus: false,
    })

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

export const useSectionQuestionForPractice = (
    part: number,
    numOfQuestions: number,
) => useQuery(forPracticeOptions(part, numOfQuestions))
