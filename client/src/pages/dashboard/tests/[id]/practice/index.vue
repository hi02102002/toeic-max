<template>
    <div>
        <ul>
            <template v-for="(question, index) in data.slice(currentIndexOfQuestion, currentIndexOfQuestion + 5)"
                :key="question?.type || question.id">
                <li v-show="currentQuestion?.id === question.id">
                    <template v-if="question.type">
                        <IntroductionPart :section="question.section"
                            :is-play-audio="isStarted && currentIndexOfQuestion === index">
                            <template v-if="index === 0" #right>
                                <div class="flex items-center justify-center ">
                                    <Button v-if="!isStarted" class="min-w-40" :disabled="!time || time <= 0"
                                        @click="start">
                                        Start timing
                                    </Button>
                                </div>
                            </template>
                        </IntroductionPart>
                    </template>
                    <QuestionPart v-else :question-section="question" :is-active="currentIndexOfQuestion === index"
                        :is-auto-play-audio="isStarted && currentIndexOfQuestion === index" :choices="choices" />
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
import { IntroductionPart, QuestionPart } from '@/components/term';
import { Button } from '@/components/ui/button';
import { MAX_TIME_TEST } from '@/constants';
import { forTestOptions, useSectionQuestionForTest } from '@/hooks/section-question';
import { useCountDown } from '@/hooks/use-count-down';
import { queryClient } from '@/libs/react-query';
import type { TChoice } from '@/types/common';
import { watchOnce } from '@vueuse/core';
import { computed, defineComponent, ref } from 'vue';
import { definePage, useRoute } from 'vue-router/auto';

const { params: { id } } = useRoute('/dashboard/tests/[id]/practice/');

const { data } = useSectionQuestionForTest(id);

const isStarted = ref<boolean>(false);

const { time, start } = useCountDown({
    initialTime: MAX_TIME_TEST,
    interval: 1000,
    stopTime: 0,
    onStart() {
        isStarted.value = true;
    },
});

const currentIndexOfQuestion = ref<number>(1);
const choices = ref<TChoice[]>([])

const currentQuestion = computed(() => {
    if (!data) return null;

    return data.value[currentIndexOfQuestion.value];
});

watchOnce(data, (newValue) => {
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
