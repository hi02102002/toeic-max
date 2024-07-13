<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between sm:flex-row flex-col-reverse gap-3">
            <div class="flex items-center gap-3 w-full">
                <Button size="sm" class="min-w-20 w-full sm:w-auto"
                    @click="currentQuestionIndex > 0 && currentQuestionIndex--">
                    Previous
                </Button>
                <Button size="sm" class="min-w-20 w-full sm:w-auto"
                    @click="currentQuestionIndex < data?.questions?.length - 1 && currentQuestionIndex++">
                    Next
                </Button>
            </div>
            <div class="flex items-center gap-3 w-full justify-center sm:justify-end">
                <span>Question {{ currentQuestionIndex + 1 }} of {{ data?.questions.length
                    }}
                </span>
                <Explanation :section-question="data?.questions[currentQuestionIndex] as TSectionQuestion">
                    <Button size="sm" variant="ghost" class="hover:underline">
                        Explain
                    </Button>
                </Explanation>
            </div>
        </div>
        <div>
            <div v-if="isLoading" class="flex items-center justify-center w-full h-16">
                <Loader2 class="w-6 h-6 text-muted-foreground animate-spin" />
            </div>
            <template v-else>
                <QuestionPart v-for="(question, index) in data?.questions" v-show="currentQuestionIndex === index"
                    :key="question.id" :question-section="question" :is-active="currentQuestionIndex === index"
                    :show-is-correct="true" is-for-review :choices="data?.history.contents" />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (to: any) => {
        const historyId = get(to, 'params.id')

        await queryClient.ensureQueryData(
            practicePartResultOptions(historyId)
        )
    },
})

</script>

<script setup lang="ts">
import { Explanation, QuestionPart } from '@/components/term';
import { Button } from '@/components/ui/button';
import { practicePartResultOptions, usePracticePartResult } from '@/hooks/result';
import { queryClient } from '@/libs/react-query';
import type { TSectionQuestion } from '@/types/question';
import { get } from 'lodash';
import { Loader2 } from 'lucide-vue-next';
import { defineComponent, onMounted, ref } from 'vue';
import { definePage, useRoute } from 'vue-router/auto';

const { params: { id }, query } = useRoute('/dashboard/results/[id]/')

const currentQuestionIndex = ref<number>(0)


const { data, isLoading } = usePracticePartResult(id)


definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true,
    },
})

onMounted(() => {
    if (!query.questionSectionId) return

    const index = data?.value?.questions.findIndex((question) => question.id === query.questionSectionId)

    if (index && index > -1) {
        currentQuestionIndex.value = index
    }
})

</script>

<style scoped></style>