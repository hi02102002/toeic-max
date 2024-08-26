<template>
    <div class="md:max-w-3xl md:mx-auto">
        <span class="text-lg font-semibold mb-4 inline-block">
            {{ topic?.name }}
        </span>
        <ul class="space-y-3">
            <li v-for="voca in data?.items" :key="voca.id" class="flex items-center gap-3 cursor-pointer select-none">
                <svg viewBox="0 0 36 36" class="w-10 h-10">
                    <path class="circle-bg stroke-primary/50 stroke-[4px] fill-none" d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                    <path class="circle stroke-primary stroke-[4px] fill-none" :stroke-dasharray="`${0}, 100`" d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"></path><text x="18" y="21.35"
                        class="percentage text-[10px] text-center align-middle" :style="{
                            'text-anchor': 'middle'
                        }">75%</text>
                </svg>
                <div>
                    <span class="font-medium text-primary">
                        {{ voca.name }}
                    </span>
                    <p class="line-clamp-1 text-sm">
                        ({{ capitalize(voca.type || 'N/a') }}) {{ voca.meaning }}
                    </p>
                </div>
            </li>
        </ul>
        <div class="flex items-center justify-center mt-4">
            <Button duolingo @click="router.push(
                `/dashboard/topics/${topic?.id}/learn`
            )">
                Learn new vocabulary
            </Button>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (
        to: any,
        _from: any,
        next: any
    ) => {
        const topicId = to.params.id;

        try {
            const [topic] = await Promise.all([
                queryClient.ensureQueryData(TopicClient.getByIdQueryOptions(topicId)),

            ])

            if (isEmpty(topic)) {
                next({ path: '/404' })
            } else {
                await queryClient.ensureQueryData(VocabularyClient.getPagingBuilderQueryOptions({
                    filters: [
                        `topicId|${EFilterCondition.EQUAL}|${topicId}|${EFilterType.STRING}`
                    ]
                }))
                next()
            }
        } catch (_err) {
            next({ path: '/404' })
        }


    },
})</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { TopicClient } from '@/hooks/topic';
import { VocabularyClient } from '@/hooks/vocabulary';
import { queryClient } from '@/libs/react-query';
import { EFilterCondition, EFilterType } from '@/types/common';
import { getAppTitle } from '@/utils/common';
import { useTitle } from '@vueuse/core';
import { capitalize, isEmpty } from 'lodash';
import { defineComponent } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';


const { params } = useRoute('/dashboard/topics/[id]/');
const router = useRouter()

const { data: topic, } = TopicClient.useGetById(params.id)
const { data } = VocabularyClient.usePagingBuilder({
    filters: [
        `topicId|${EFilterCondition.EQUAL}|${params.id}|${EFilterType.STRING}`
    ],
})

useTitle(
    getAppTitle(
        topic.value?.name || 'List Vocabulary'
    )
)

definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true
    },
})


</script>

<style scoped></style>