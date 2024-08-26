<template>
    <div class="flex-1 py-4 relative">
        <FooterWave />
        <div class="container-app">
            <div class="md:max-w-3xl md:mx-auto">
                <div class='flex items-center justify-center flex-col gap-4'>
                    <div class="w-40 h-40">
                        <AspectRatio :ratio="1">
                            <img src="/images/university.png" alt="start" class="object-cover w-full h-full" />
                        </AspectRatio>
                    </div>
                    <div class="flex flex-col font-semibold items-center gap-3">
                        <span class="text-lg inline-block text-center">
                            Congratulations!
                            <br />
                            You have completed the practice vocabularies.
                        </span>
                        <div class="flex items-center gap-3">
                            <div class="flex flex-col items-center justify-center">
                                <span>
                                    {{ vocabCompleted }}
                                </span>
                                <span class="text-sm text-muted-foreground font-normal">
                                    Completed
                                </span>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <span>
                                    {{ vocabInProgress }}
                                </span>
                                <span class="text-sm text-muted-foreground font-normal">
                                    In progress
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button duolingo @click="() => router.push(`/dashboard/topics/${data?.metadata.topicId}`)">
                        Continue learning
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (to: any) => {
        const historyId = get(to, 'params.historyId')

        await queryClient.ensureQueryData(
            vocabResultOptions(historyId,)
        )
    }
})
</script>

<script setup lang="ts">
import FooterWave from '@/components/FooterWave.vue';
import { Button } from '@/components/ui/button';
import { useVocabResult, vocabResultOptions } from '@/hooks/result';
import { queryClient } from '@/libs/react-query';
import { get } from 'lodash';
import { computed, defineComponent } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';

const { params: { historyId }, } = useRoute('/dashboard/results-vocab/[historyId]')
const router = useRouter()

const { data } = useVocabResult(historyId)

const vocabInProgress = computed(() => {
    return data?.value.contents.filter((content: any) => content.percent
        < 100).length
})

const vocabCompleted = computed(() => {
    return data?.value.contents.filter((content: any) => content.percent
        === 100).length
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