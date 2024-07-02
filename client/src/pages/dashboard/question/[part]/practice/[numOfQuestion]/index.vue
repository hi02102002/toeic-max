<template>

    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <Button size="sm" class="min-w-20" @click="handelPrevQuestion">
                    Previous
                </Button>
                <Button size="sm" class="min-w-20" @click="handelNextQuestion">
                    Next
                </Button>
            </div>
            <div class="flex items-center gap-3">
                <span>Question {{ currentQuestionIndex + 1 }} of {{ sectionQuestions.length
                    }}
                </span>
                <Button size="sm" variant="ghost" class="hover:underline">
                    Explain
                </Button>
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
            <QuestionPart v-for="(question, index) in sectionQuestions" v-show="currentQuestionIndex === index"
                :key="question.id" :question-section="question" :is-auto-play-audio="config.autoPlayAudio"
                :is-active="currentQuestionIndex === index" @choose="handleToggleChoice" />

        </div>
    </div>
</template>


<script setup lang="ts">
import { QuestionPart } from '@/components/term';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSectionQuestionForPractice } from '@/hooks/section-question';
import type { TChoice } from '@/types/common';
import { useStorage } from '@vueuse/core';
import { SettingsIcon } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';
import { definePage, onBeforeRouteLeave, useRoute } from 'vue-router/auto';


const { params: {
    numOfQuestion, part
} } = useRoute('/dashboard/question/[part]/practice/[numOfQuestion]/')

const { data: sectionQuestions } = useSectionQuestionForPractice(
    Number(part),
    Number(numOfQuestion)
)


const currentQuestionIndex = ref<number>(0)
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

watchEffect(() => {
    if (!config.value.autoNext) return;

    const currentQuestion = sectionQuestions.value[currentQuestionIndex.value]

    if (!currentQuestion) return

    const choicesOfCurrentQuestion = choices.value.filter(choice => choice.section_question_id === currentQuestion.id)


    if (currentQuestion.questions.length === choicesOfCurrentQuestion.length) {

        setTimeout(() => {
            handelNextQuestion()
        }, 1000)
    }
})

watchEffect(() => {
    if (currentQuestionIndex.value !== sectionQuestions.value.length - 1) return

    // handle submit
})

onBeforeRouteLeave(() => {
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