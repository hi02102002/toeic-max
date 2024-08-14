<template>
    <ul class="gap-4 flex flex-col">
        <li v-for="(topics, key) in data" :key="key" class="flex flex-col gap-3">
            <span class="text-lg font-semibold">
                {{ key.split('-')[0].trim() }}
            </span>
            <ul class="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <li v-for="topic in topics" :key="topic.id">
                    <RouterLink :to="path(topic)" class="block">
                        <div
                            class="flex flex-col border-input rounded-md border font-medium items-center hover:bg-primary hover:border-primary hover:text-white group transition-all text-center shadow-sm">
                            <span class="h-16 flex items-center justify-center p-3">
                                {{ topic.name }}
                            </span>
                            <span
                                class="w-full h-8 flex items-center justify-center text-sm bg-muted group-hover:bg-white group-hover:text-black transition-all">
                                Study now
                            </span>
                        </div>
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
import { Button } from '@/components/ui/button';
import { groupedTopicsOptions, useGroupedTopics } from '@/hooks/topic';
import { queryClient } from '@/libs/react-query';
import type { TTopic } from '@/types/topic';
import { getAppTitle } from '@/utils/common';
import { useTitle } from '@vueuse/core';
import { get, isEmpty } from 'lodash';
import { defineComponent } from 'vue';
import { definePage, RouterLink, useRoute } from 'vue-router/auto';

const route = useRoute()


const { data } = useGroupedTopics(
    {
        parentId: route.query?.parent_id as string,
        limit: route.query?.parent_id ? undefined : 7
    }
)

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