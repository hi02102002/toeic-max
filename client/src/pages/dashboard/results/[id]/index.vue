<template>
    <div class="flex-1 py-4 relative">
        <FooterWave>
            <div class="flex items-center justify-center gap-3">
                <Button variant='outline' @click="router.push(`/dashboard/results/${data?.id}/list-choice`)">
                    View result
                </Button>
                <Button variant='outline' @click="router.push(`/dashboard/question/${data?.meta_data.part}/practice/${data?.meta_data.numOfQuestion
                    }`)">
                    Continue
                </Button>
                <Button
                    @click="router.push(`/dashboard/question/${data?.meta_data.part}/practice/${data?.meta_data.numOfQuestion}?ref=${data?.id}`)">
                    Do it again
                </Button>
            </div>
        </FooterWave>
        <div class="container-app">
            <div class="md:max-w-3xl md:mx-auto">
                <div class='flex items-center justify-center flex-col gap-4'>
                    <div class="w-40 h-40">
                        <AspectRatio :ratio="1">
                            <img :src="percentage >= 50 ? '/images/university.png' : '/images/tired.png'" alt="start"
                                class="object-cover w-full h-full" />
                        </AspectRatio>
                    </div>
                    <div class="flex flex-col font-semibold items-center">
                        <span class="text-lg">
                            You have completed the training test
                        </span>
                        <span>
                            {{ data?.meta_data.name }}
                        </span>
                        <span>
                            {{ data?.meta_data.title }}
                        </span>
                    </div>

                    <div class="w-full space-y-3">
                        <span class='font-semibold '>
                            Result {{ data?.meta_data.totalCorrect || 0 }}/{{
                                data?.meta_data.numOfQuestion
                            }}
                        </span>
                        <div class="rounded bg-white border border-input shadow-sm p-4 w-full">
                            <div class="space-y-3">
                                <div class='flex items-center justify-between'>
                                    <span>
                                        Percentage
                                    </span>
                                    <span>
                                        {{ percentage.toFixed(0) }}%
                                    </span>
                                </div>
                                <Progress :model-value="percentage" />

                                <span class="flex items-center justify-center text-center font-medium">
                                    {{ percentage >= 50 ? 'Congratulations!' : 'You need to practice more.' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
import FooterWave from '@/components/FooterWave.vue';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HistoryCrudClient } from '@/hooks/history';
import { queryClient } from '@/libs/react-query';
import { get } from 'lodash';
import { computed, defineComponent } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';

const { params: { id } } = useRoute('/dashboard/results/[id]/')

const router = useRouter()

const { data } = HistoryCrudClient.useGetById(id)

const percentage = computed(() => {
    return ((data?.value?.meta_data.totalCorrect || 0) * 100 /
        data?.value?.meta_data.numOfQuestion)
})


definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true,
        noContainer: true,
        class: 'flex flex-col h-full !py-0'
    },
})
</script>

<style scoped></style>