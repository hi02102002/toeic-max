import type { TChoice } from '@/types/common'
import type { TSectionQuestion } from '@/types/question'
import { cloneDeep } from 'lodash'

export const handelToggleChoice = ({
    choice,
    choices,
    callback,
}: {
    choices: TChoice[]
    choice: TChoice
    callback?: (newChoices: TChoice[]) => void
}) => {
    let cloneChoices = cloneDeep(choices)
    const index = cloneChoices.findIndex(
        (c) => c.question_id === choice.question_id,
    )

    if (index === -1) {
        cloneChoices.push(choice)
    } else {
        cloneChoices = cloneChoices.map((c) => {
            if (c.question_id === choice.question_id) {
                return choice
            }
            return c
        })
    }

    callback?.(cloneChoices)
}

export const handelAutoNextQuestion = ({
    autoNext,
    handelNextQuestion,
    choices,
    currentQuestionIndex,
    sectionQuestions,
}: {
    sectionQuestions: TSectionQuestion[]
    currentQuestionIndex: number
    choices: TChoice[]
    autoNext: boolean
    handelNextQuestion: () => void
}) => {
    if (!autoNext) return

    const currentQuestion = sectionQuestions[currentQuestionIndex]

    if (!currentQuestion) return

    const choicesOfCurrentQuestion = choices.filter(
        (choice) =>
            choice?.section_question_id === currentQuestion?.id &&
            choice.choose,
    )

    if (currentQuestion?.questions.length === choicesOfCurrentQuestion.length) {
        setTimeout(() => {
            handelNextQuestion()
        }, 1000)
    }
}
