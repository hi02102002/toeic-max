<template>
    <div class="space-y-4">
        <Toolbar :disabled-submit="disabledSubmit" :choices="choices" :original-location-list-choices="false"
            @on-next-question="handelNextQuestion" @on-prev-question="handelPrevQuestion" @on-submit="handelSubmit">
            <template #question-location>
                <span class="text-nowrap">
                    Question {{ currentQuestionIndex + 1 }} of {{ sectionQuestions.length }}
                </span>
            </template>
            <template #settings>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button variant="outline" class="w-8 h-8 p-0 flex-shrink-0" title="Settings">
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
            </template>
            <template #explain>
                <Explanation :section-question="sectionQuestions[currentQuestionIndex]">
                    <Button variant="outline" class="w-8 h-8 p-0 flex-shrink-0" title="Explain">
                        <BookA class="w-4 h-4" />
                    </Button>
                </Explanation>
            </template>
        </Toolbar>

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
                    :choices="choices" :show-is-correct="true" 
                        @choose="handleToggleChoice"
                    />
            </template>
        </div>
    </div>
</template>


<script setup lang="ts">
import { Explanation, QuestionPart, Toolbar } from '@/components/term';
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
import * as practiceHelper from '@/utils/practice';
import { useStorage, watchOnce } from '@vueuse/core';
import { pick } from 'lodash';
import { BookA, Loader2, SettingsIcon } from 'lucide-vue-next';
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

const handleToggleChoice = (choice: TChoice) => practiceHelper.handelToggleChoice({
    choice,
    choices: choices.value,
    callback(newChoices) {
        choices.value = newChoices

        handelAutoNextQuestion()
        handelFinishPractice()
    },
})

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

const handelAutoNextQuestion = () => practiceHelper.handelAutoNextQuestion({
    autoNext: config.value.autoNext,
    currentQuestionIndex: currentQuestionIndex.value,
    choices: choices.value,
    handelNextQuestion: handelNextQuestion,
    sectionQuestions: sectionQuestions.value,
})

const disabledSubmit = computed(() => {
    return choices.value.every(choice => !choice.choose)
})

const handelSubmit = () => {
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

const handelFinishPractice = () => {
    const lastQuestion = sectionQuestions.value[sectionQuestions.value.length - 1]


    const choicesOfLastQuestion = choices.value.filter(choice => choice.section_question_id === lastQuestion.id && choice.choose)


    if (!(currentQuestionIndex.value === Number(numOfQuestion) - 1 &&
        lastQuestion.questions.length === choicesOfLastQuestion.length)
    ) return;

    navigateWithoutConfirm.value = true

    handelSubmit()
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