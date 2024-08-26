<template>
    <ul class="gap-4 flex flex-col">
        <li v-for="(topics, key) in data" :key="key" class="flex flex-col gap-3">
            <span class="text-lg font-semibold">
                {{ key.split('-')[0].trim() }}
            </span>
            <ul class="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <li v-for="topic in topics" :key="topic.id">
                    <RouterLink :to="path(topic)" class="block">
                        <TopicItem :topic="topic" :history="historyOfTopic(topic.id)" />
                    </RouterLink>
                </li>
                <li v-if="!route.query?.parent_id && topics.length <= 7">
                    <RouterLink :to="`/dashboard/topics?parent_id=${key.split('-')[1]}`" class="flex flex-col h-full">
                        <Button variant="outline" class="w-full h-full flex-1 hover:border-primary">
                            View all >>
                        </Button>
                    </RouterLink>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (
        to: any,
        _from: any,
        next: any
    ) => {
        const parentId = to.query?.parent_id as string
        const res = await queryClient.ensureQueryData(groupedTopicsOptions({
            parentId,
            limit: parentId ? undefined : 7
        }))

        if (isEmpty(res)) {
            next({ path: '/404' })
        } else {
            next()
        }

    },
})</script>

<script setup lang="ts">
import { TopicItem } from '@/components/pages/topic';
import { Button } from '@/components/ui/button';
import { HistoryCrudClient } from '@/hooks/history';
import { groupedTopicsOptions, useGroupedTopics } from '@/hooks/topic';
import { queryClient } from '@/libs/react-query';
import { useCurrentUserStore } from '@/stores/current-user';
import { EFilterCondition } from '@/types/common';
import type { TTopic } from '@/types/topic';
import { getAppTitle } from '@/utils/common';
import { useTitle } from '@vueuse/core';
import { get, groupBy, isEmpty } from 'lodash';
import { defineComponent } from 'vue';
import { definePage, RouterLink, useRoute } from 'vue-router/auto';

const route = useRoute()

const userStore = useCurrentUserStore()
const { data } = useGroupedTopics(
    {
        parentId: route.query?.parent_id as string,
        limit: route.query?.parent_id ? undefined : 7
    }
)

const { data: history } = HistoryCrudClient.usePagingBuilder({
    filters: [
        `userId|${EFilterCondition.EQUAL}|${userStore.currentUser?.id}|string`,
        `type|${EFilterCondition.EQUAL}|vocab|string`
    ]
})

const historyOfTopic = (topicId: string) => {
    const existTopic = history.value?.items?.find((item) => item.metadata.topic_id === topicId)

    if (!existTopic) {
        return null
    }

    const grouped = groupBy(history.value?.items, 'meta_data.topic_id')

    return grouped
}

const path = (topic: TTopic) => {
    if (get(topic, 'children', []).length > 0) {
        return `/dashboard/topics?parent_id=${topic.id}`
    }
    return `/dashboard/topics/${topic.id}`
}

useTitle(
    getAppTitle('Topics')
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