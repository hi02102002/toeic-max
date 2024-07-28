<template>
    <div class="md:max-w-3xl md:mx-auto">
        <Tabs v-model:model-value="activeTab" default-value="all">
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
            <TabsContent :value="activeTab">
                <ul class="space-y-4 w-full  py-4">
                    <li v-for="(choice, index) in data?.contents" v-show="shouldShow(choice)" :key="choice.id">
                        <div v-if="shouldShow(choice)">
                            <ChoiceItem :choice="choice" :index="shouldShowIndex ? index : undefined"
                                @click-question="handelNavigate" />
                        </div>
                    </li>
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
            HistoryCrudClient.getByIdQueryOptions(historyId)
        )
    },
})

</script>

<script setup lang="ts">
import { ChoiceItem } from '@/components/term';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HistoryCrudClient } from '@/hooks/history';
import { queryClient } from '@/libs/react-query';
import type { TChoice } from '@/types/common';
import { get } from 'lodash';
import { computed, defineComponent, ref } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';

const router = useRouter()

const { params: { id } } = useRoute('/dashboard/results/[id]/list-choice')

const { data } = HistoryCrudClient.useGetById(id)


const activeTab = ref('all')


const shouldShowIndex = computed(() => {
    return data.value?.type === 'practice-part'
})


const shouldShow = (choice: TChoice) => {
    let result = true;
    if (activeTab.value === 'all') {
        result = true
    }

    if (activeTab.value === 'choose-right') {
        result = choice.is_correct
    }

    if (activeTab.value === 'choose-wrong') {
        result = !choice.is_correct
    }


    return result
}


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