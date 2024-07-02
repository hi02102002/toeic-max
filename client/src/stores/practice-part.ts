import { defineStore } from 'pinia'
import { ref } from 'vue'

export type TChoice = {
    section_question_id: string
    question_id: string
    choose: string
    ans: string
    is_correct: boolean
    part: number
}

export const usePracticePartStore = (numberOfQuestions: number) => {
    const store = defineStore('practice-part-store', () => {
        const currentQuestion = ref<number>(0)
        const choices = ref<TChoice[]>([])

        const handleToggleChoice = (choice: TChoice) => {
            const index = choices.value.findIndex(
                (c) => c.question_id === choice.question_id,
            )
            if (index === -1) {
                choices.value.push(choice)
            } else {
                choices.value = choices.value.map((c) => {
                    if (c.question_id === choice.question_id) {
                        return choice
                    }
                    return c
                })
            }
        }

        const handelNextQuestion = () => {
            if (currentQuestion.value === numberOfQuestions - 1) {
                return
            }

            currentQuestion.value = currentQuestion.value + 1
        }

        const handelPrevQuestion = () => {
            if (currentQuestion.value === 0) {
                return
            }

            currentQuestion.value = currentQuestion.value - 1
        }

        return {
            currentQuestion,
            choices,
            handleToggleChoice,
            handelNextQuestion,
            handelPrevQuestion,
        }
    })

    return store()
}
