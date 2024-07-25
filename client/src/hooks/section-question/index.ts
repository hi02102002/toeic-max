import { questionApi } from '@/apis/question.api'
import type { TBaseQueryParams } from '@/types/common'
import type { TSectionQuestion } from '@/types/question'
import type { QuestionSectionSchemaType } from '@/validators/question-section'
import { queryOptions, useQuery } from '@tanstack/vue-query'
import { CrudQueryClient } from '../crud-query-client'

export const forPracticeOptions = ({
    numOfQuestions,
    part,
    ref,
}: {
    part: number
    numOfQuestions: number
    ref?: string
}) =>
    queryOptions({
        queryKey: [
            'questions',
            'for-practice',
            part,
            numOfQuestions,
            Date.now(),
            ref,
        ],
        queryFn: () =>
            questionApi.getForPractice({
                numOfQuestions,
                part,
                ref,
            }),
        initialData: [],
        refetchOnWindowFocus: false,
    })

export const forTestOptions = (kitTestId: string) =>
    queryOptions({
        queryKey: ['questions-for-test', kitTestId],
        queryFn: () => questionApi.getForTest(kitTestId),
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

export const useSectionQuestionForPractice = ({
    numOfQuestions,
    part,
    ref,
}: {
    part: number
    numOfQuestions: number
    ref?: string
}) =>
    useQuery(
        forPracticeOptions({
            numOfQuestions,
            part,
            ref,
        }),
    )

export const useSectionQuestionForTest = (kitTestId: string) =>
    useQuery(forTestOptions(kitTestId))
