<template>
    <div class="space-y-4">
        <Toolbar :choices="data?.history.contents" :original-location-list-choices="type === 'test'"
            :show-submit="false" @on-navigate-to-question="handelNavigateToQuestion"
            @on-next-question="handelNextQuestion" @on-prev-question="handelPrevQuestion">
            <template #question-location>
                <span v-if="type === 'practice-part'" class="text-nowrap">
                    Question {{ currentQuestionIndex + 1 }} of {{ data?.questions.length }}
                </span>
                <span v-else-if="type === 'test'" class="text-nowrap">
                    {{
                        formatQuestionLocation({
                            location: currentQuestion?.location as string,
                            part: currentQuestion?.part as number,

                        })
                    }}
                </span>
            </template>
            <template #explain>
                <Explanation :section-question="currentQuestion as any">
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
                <QuestionPart v-for="(question) in data?.questions.slice(
                    currentQuestionIndex,
                    currentQuestionIndex + 5,

                )" v-show="currentQuestion?.id === question.id" :key="question.id" :question-section="question"
                    :is-active="currentQuestion?.id === question.id" :show-is-correct="true" is-for-review
                    :choices="data?.history.contents" />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (to: any) => {
        const historyId = get(to, 'params.id')
        const type = get(to, 'query.type', 'practice-part')

        await queryClient.ensureQueryData(
            practiceResultOptions(historyId, type)
        )
    },
})

</script>

<script setup lang="ts">
import { Explanation, QuestionPart, Toolbar } from '@/components/term';
import { Button } from '@/components/ui/button';
import { practiceResultOptions, usePracticeResult } from '@/hooks/result';
import { queryClient } from '@/libs/react-query';
import { formatQuestionLocation } from '@/utils/section-question';
import { get } from 'lodash';
import { BookA, Loader2 } from 'lucide-vue-next';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { definePage, useRoute } from 'vue-router/auto';

const { params: { id }, query } = useRoute('/dashboard/results/[id]/')

const currentQuestionIndex = ref<number>(0)

const { data, isLoading } = usePracticeResult(id, query.type as string)

const currentQuestion = computed(() => data?.value?.questions[currentQuestionIndex.value])

const type = computed(() => data.value?.history.type)


const handelNextQuestion = () => {

    if (!data.value?.questions.length) return
    if (currentQuestionIndex.value < data.value?.questions.length - 1) {
        currentQuestionIndex.value++
    }
}

const handelPrevQuestion = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--
    }
}

const handelNavigateToQuestion = async ({ questionId, sectionQuestionId }: {
    sectionQuestionId: string,
    questionId: string
}) => {
    // const index = data.value.findIndex((question) => question?.id === sectionQuestionId)
    // currentIndexOfQuestion.value = index
    // isOpenListChoices.value = false
    // scrollToQuestion.value = questionId
}

onMounted(() => {
    if (!query.questionSectionId) return

    const index = data?.value?.questions.findIndex((question) => question.id === query.questionSectionId)

    if (index && index > -1) {
        currentQuestionIndex.value = index
    }
})

definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true,
    },
})
</script>

<style scoped></style>