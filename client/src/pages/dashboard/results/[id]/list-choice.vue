<template>
    <div class="md:max-w-3xl md:mx-auto">
        <Tabs default-value="all">
            <TabsList class="w-full grid grid-cols-3">
                <TabsTrigger value="all">
                    All
                </TabsTrigger>
                <TabsTrigger value="choose-right">
                    Correct
                </TabsTrigger>
                <TabsTrigger value="choose-wrong">
                    Wrong
                </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                <ul class="space-y-4 py-4">
                    <template v-for="(sectionQuestion, index) in data?.questions" :key="sectionQuestion.id">
                        <li v-for="(question, _index) in sectionQuestion.questions" :key="question.id">
                            <ChoiceItem :question="question" :choices="data?.history.contents || []"
                                :index="(sectionQuestion?.questions.length || 0) > 1 ? index * (sectionQuestion?.questions.length || 0) + _index : index"
                                @click-question="handelNavigate" />
                        </li>
                    </template>
                </ul>
            </TabsContent>
            <TabsContent value="choose-right">
                <ul class="space-y-4 py-4">
                    <template v-for="(sectionQuestion, index) in data?.questions" :key="sectionQuestion.id">
                        <template v-for="(question, _index) in sectionQuestion.questions" :key="question.id">
                            <li
                                v-if="data?.history.contents.find((choice: TChoice) => choice.question_id === question.id && choice.choose === choice.ans)">

                                <ChoiceItem :question="question" :choices="data?.history.contents || []"
                                    :index="(sectionQuestion?.questions.length || 0) > 1 ? index * (sectionQuestion?.questions.length || 0) + _index : index"
                                    @click-question="handelNavigate" />
                            </li>
                        </template>
                    </template>
                </ul>
            </TabsContent>
            <TabsContent value="choose-wrong">
                <ul class="space-y-4 py-4">
                    <template v-for="(sectionQuestion, index) in data?.questions" :key="sectionQuestion.id">
                        <template v-for="(question, _index) in sectionQuestion.questions" :key="question.id">
                            <li
                                v-if="data?.history.contents.find((choice: TChoice) => choice.question_id === question.id && choice.choose !== choice.ans)">
                                <ChoiceItem :question="question" :choices="data?.history.contents || []"
                                    :index="(sectionQuestion?.questions.length || 0) > 1 ? index * (sectionQuestion?.questions.length || 0) + _index : index"
                                    @click-question="handelNavigate" />
                            </li>
                        </template>
                    </template>
                </ul>
            </TabsContent>
        </Tabs>
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
import { ChoiceItem } from '@/components/term';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { practicePartResultOptions } from '@/hooks/result';
import { queryClient } from '@/libs/react-query';
import type { TChoice } from '@/types/common';
import { useQuery } from '@tanstack/vue-query';
import { get } from 'lodash';
import { defineComponent } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';
const router = useRouter()

const { params: { id } } = useRoute('/dashboard/results/[id]/list-choice')

const { data } = useQuery(
    practicePartResultOptions(id)

)

const handelNavigate = (questionSectionId: string) => {
    router.push(`/dashboard/results/${id}/detail?questionSectionId=${questionSectionId}`)
}

definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true,
    },
})

</script>

<style scoped></style>