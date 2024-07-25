<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between sm:flex-row flex-col-reverse gap-3">
            <div class="flex items-center gap-3 w-full">
                <Button size="sm" class="min-w-20 w-full sm:w-auto" @click="handelPrevQuestion">
                    Previous
                </Button>
                <Button size="sm" class="min-w-20 w-full sm:w-auto" @click="handelNextQuestion">
                    Next
                </Button>
            </div>
            <div class="flex items-center gap-3 w-full justify-center sm:justify-end">
                <span>Question {{ currentQuestionIndex + 1 }} of {{ sectionQuestions.length
                    }}
                </span>
                <Explanation :section-question="sectionQuestions[currentQuestionIndex]">
                    <Button size="sm" variant="ghost" class="hover:underline">
                        Explain
                    </Button>
                </Explanation>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button size="sm" variant="ghost" class="p-0 w-8 h-8">
                            <SettingsIcon class="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Settings
                            </DialogTitle>
                        </DialogHeader>
                        <div class="flex items-center justify-between">
                            <Label>
                                Auto next question
                            </Label>
                            <Switch v-model:checked="config.autoNext" />
                        </div>
                        <div class="flex items-center justify-between">
                            <Label>
                                Auto play audio
                            </Label>
                            <Switch v-model:checked="config.autoPlayAudio" />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
        <div>
            <div v-if="isLoading" class="flex items-center justify-center w-full h-16">
                <Loader2 class="w-6 h-6 text-muted-foreground animate-spin" />
            </div>
            <template v-else>
                <QuestionPart v-for="(question, index) in sectionQuestions.slice(
                    currentQuestionIndex,
                    currentQuestionIndex + 5
                )" v-show="currentQuestion?.id === question.id" :key="question.id" :question-section="question"
                    :is-auto-play-audio="config.autoPlayAudio" :is-active="currentQuestionIndex === index"
                    :show-is-correct="true" @choose="handleToggleChoice" />
            </template>
        </div>
    </div>
</template>


<script setup lang="ts">
import { Explanation, QuestionPart } from '@/components/term';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useCreateHistory, useUpdateHistory } from '@/hooks/history';
import { useSectionByPart } from '@/hooks/section';
import { useSectionQuestionForPractice } from '@/hooks/section-question';
import { useCurrentUserStore } from '@/stores/current-user';
import type { TChoice } from '@/types/common';
import type { TSection } from '@/types/section';
import { useStorage, watchOnce } from '@vueuse/core';
import { pick } from 'lodash';
import { Loader2, SettingsIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { definePage, onBeforeRouteLeave, useRoute, useRouter } from 'vue-router/auto';

const currentUserStore = useCurrentUserStore()

const router = useRouter()

const { params: {
    numOfQuestion, part
}, query } = useRoute('/dashboard/question/[part]/practice/[numOfQuestion]/')

const { data: section } = useSectionByPart(
    Number(part)
)

const { data: sectionQuestions, isLoading } = useSectionQuestionForPractice(
    {
        part: Number(part),
        numOfQuestions: Number(numOfQuestion),
        ref: query?.ref as string
    }
)

const createHistoryMutation = useCreateHistory({
    onExtraSuccess(res) {
        router.push(`/dashboard/results/${res.data.id}`)
    },
    isShowToastSuccess: false
})

const updateHistoryMutation = useUpdateHistory({
    onExtraSuccess(res) {
        router.push(`/dashboard/results/${res.data.id}`)
    },
    isShowToastSuccess: false
})


const currentQuestionIndex = ref<number>(0)
const choices = ref<TChoice[]>([])
const navigateWithoutConfirm = ref<boolean>(false)

const currentQuestion = computed(() => {
    if (!sectionQuestions.value) return null

    return sectionQuestions.value[currentQuestionIndex.value]
})

const config = useStorage(
    'practice-part',
    {
        autoNext: false,
        autoPlayAudio: false,

    },
    localStorage,
    {
        mergeDefaults: true,
    },
)

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


    handelAutoNextQuestion()
    handelFinishPractice()
}

const handelNextQuestion = () => {
    if (currentQuestionIndex.value === Number(numOfQuestion) - 1) {
        return
    }

    currentQuestionIndex.value = currentQuestionIndex.value + 1
}

const handelPrevQuestion = () => {
    if (currentQuestionIndex.value === 0) {
        return
    }

    currentQuestionIndex.value = currentQuestionIndex.value - 1
}

const handelAutoNextQuestion = () => {
    if (!config.value.autoNext) return

    const currentQuestion = sectionQuestions.value[currentQuestionIndex.value]

    if (!currentQuestion) return

    const choicesOfCurrentQuestion = choices.value.filter(choice => choice.section_question_id === currentQuestion.id && choice.choose)

    if (currentQuestion.questions.length === choicesOfCurrentQuestion.length) {

        setTimeout(() => {
            handelNextQuestion()
        }, 1000)
    }
}

const handelFinishPractice = () => {
    const lastQuestion = sectionQuestions.value[sectionQuestions.value.length - 1]


    const choicesOfLastQuestion = choices.value.filter(choice => choice.section_question_id === lastQuestion.id && choice.choose)


    if (!(currentQuestionIndex.value === Number(numOfQuestion) - 1 &&
        lastQuestion.questions.length === choicesOfLastQuestion.length)
    ) return;

    navigateWithoutConfirm.value = true

    const data = {
        type: 'practice-part',
        contents: choices.value,
        meta_data: {
            part: Number(part),
            numOfQuestion: sectionQuestions.value.flatMap(section => section.questions).length,
            totalCorrect: choices.value.filter(choice => choice.is_correct).length,
            ...pick<TSection>(section.value, ['id', 'name', 'title', 'title_vi'])
        },
        user_id: currentUserStore.currentUser?.id as string
    }

    if (query?.ref) {
        updateHistoryMutation.mutate({
            id: query?.ref as string,
            data: {
                ...data,
                type: 'practice-part',
            }
        })
        return
    }


    createHistoryMutation.mutate({
        data: {
            ...data,
            type: 'practice-part',
        }
    })
}

watchOnce(sectionQuestions, (newValue) => {
    const initChoice = newValue.flatMap(section => section.questions).map(question => {
        return {
            question_id: question.id,
            section_question_id: question.question_section_id,
            is_correct: false,
            ans: question.ans,
            choose: '',
            location: question.location,
            part: question.p,
        } as TChoice
    })

    choices.value = initChoice
})


onBeforeRouteLeave(() => {
    if (navigateWithoutConfirm.value) return

    const answer = window.confirm('Are you sure you want to leave?. Your progress will be lost')

    if (answer) {
        return true
    }

    return false
})

definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true
    },
})

</script>

<style scoped></style>