<template>
    <div class="space-y-4">
        <Toolbar :disabled="!isStarted" :choices="choices" :show-submit="true" @on-submit="handelSubmit"
            @on-next-question="handelNextQuestion" @on-prev-question="handelPrevQuestion"
            @on-navigate-to-question="handelNavigateToQuestion">
            <template #timer>
                <span>
                    {{ format(time) }}
                </span>
            </template>
            <template #question-location>
                <span v-if="type === 'question'" class="text-nowrap">
                    Question {{ currentQuestion?.location }}
                </span>
            </template>
        </Toolbar>
        <ul>
            <template v-for="(question) in data.slice(currentIndexOfQuestion, currentIndexOfQuestion + 5)"
                :key="question?.type || question.id">
                <li v-show="currentQuestion?.id === question.id">
                    <template v-if="question.type">
                        <IntroductionPart :section="question.section"
                            :is-play-audio="isStarted && currentQuestion?.section?.id === question?.section.id">
                            <template v-if="currentQuestion?.section?.name === 'Part 1'" #right>
                                <div class="flex items-center justify-center ">
                                    <Button v-if="!isStarted" class="min-w-40" @click="handelStart">
                                        Start timing
                                    </Button>
                                </div>
                            </template>
                        </IntroductionPart>
                    </template>
                    <QuestionPart v-else :question-section="question" :is-active="currentQuestion?.id === question.id"
                        :is-auto-play-audio="isStarted && currentQuestion?.id === question.id" :choices="choices"
                        @choose="handelToggleChoice" />
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (to: any) => {
        await queryClient.ensureQueryData(forTestOptions(to.params.id));
    },
})
</script>

<script setup lang="ts">
import { IntroductionPart, QuestionPart, Toolbar } from '@/components/term';
import { Button } from '@/components/ui/button';
import { MAX_TIME_TEST } from '@/constants';
import { useCreateHistory } from '@/hooks/history';
import { KitTestCrudClient } from '@/hooks/kit-test';
import { forTestOptions, useSectionQuestionForTest } from '@/hooks/section-question';
import { useCountDown } from '@/hooks/use-count-down';
import { queryClient } from '@/libs/react-query';
import { useCurrentUserStore } from '@/stores/current-user';
import type { TChoice } from '@/types/common';
import * as practiceHelper from '@/utils/practice';
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';

const currentUserStore = useCurrentUserStore()
const router = useRouter()
const { params: { id } } = useRoute('/dashboard/tests/[id]/practice/');

const { data: testInfo } = KitTestCrudClient.useGetById(id)
const { data } = useSectionQuestionForTest(id);


const createHistoryMutation = useCreateHistory({
    onExtraSuccess(res) {
        router.push(`/dashboard/results-test/${res.data.id}`)
    },
    isShowToastSuccess: false
})


const isStarted = ref<boolean>(false);
const currentIndexOfQuestion = ref<number>(0);
const choices = ref<TChoice[]>([])
const isOpenListChoices = ref<boolean>(false)
const scrollToQuestion = ref<string>('')

const { time, start, format } = useCountDown({
    initialTime: MAX_TIME_TEST,
    interval: 1000,
    stopTime: 0,
    onStart() {
        isStarted.value = true
    },
});

const currentQuestion = computed(() => {
    if (!data) return null;

    return data.value[currentIndexOfQuestion.value];
});

const type = computed(() => {
    return currentQuestion?.value?.type || 'question' as 'intro' | 'question';
})

const handelNextQuestion = () => {
    if (currentIndexOfQuestion.value === Number(data.value.length) - 1) {
        return
    }

    currentIndexOfQuestion.value = currentIndexOfQuestion.value + 1
}

const handelPrevQuestion = () => {
    if (currentIndexOfQuestion.value === 0) {
        return
    }

    currentIndexOfQuestion.value = currentIndexOfQuestion.value - 1
}

const handelStart = () => {
    start()
}

const handelToggleChoice = (choice: TChoice) => practiceHelper.handelToggleChoice({
    choice,
    choices: choices.value,
    callback(newChoices) {
        choices.value = newChoices
    },
})


const handelNavigateToQuestion = async ({ questionId, sectionQuestionId }: {
    sectionQuestionId: string,
    questionId: string
}) => {
    const index = data.value.findIndex((question) => question?.id === sectionQuestionId)
    currentIndexOfQuestion.value = index
    isOpenListChoices.value = false
    scrollToQuestion.value = questionId
}

const handelSubmit = () => {
    createHistoryMutation.mutate({
        data: {
            type: 'test',
            contents: choices.value,
            meta_data: {
                numOfQuestion: 200,
                totalCorrect: choices.value.filter(choice => choice.is_correct).length,
                testId: id,
                testName: testInfo.value?.name,
                testYear: testInfo.value?.year,
                testTime: format(
                    MAX_TIME_TEST - time.value
                )
            },
            user_id: currentUserStore.currentUser?.id as string
        }
    })
}


watch(data, (newValue) => {
    const initChoice = newValue.filter((question) => !question.type).flatMap(section => section.questions).map(question => {
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
}, { immediate: true })

watch(scrollToQuestion, async (newValue) => {
    if (!newValue) return

    await nextTick()

    let timer = 0
    const el = document.querySelector(`#question-${newValue}`)


    if (!el) return

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 200)
})


definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true,
    },
});
</script>

<style scoped></style>
