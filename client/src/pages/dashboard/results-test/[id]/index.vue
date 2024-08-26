<template>
    <div class="flex-1 py-4 relative">
        <FooterWave>
            <div class="flex items-center justify-center gap-3">
                <Button variant='outline' duolingo
                    @click="router.push(`/dashboard/results/${data?.history.id}/list-choice`)">
                    View result
                </Button>
                <Button variant='outline' duolingo
                    @click="router.push(`/dashboard/tests/${data?.history.metadata.testId}/practice`)">
                    Do it again
                </Button>
            </div>
        </FooterWave>
        <div class="container-app">
            <ToiecScore :choices="data?.history.contents" />
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (to: any) => {
        const historyId = get(to, 'params.id')

        await queryClient.ensureQueryData(
            practiceResultOptions(historyId, 'test')
        )
    },
})

</script>

<script setup lang="ts">
import FooterWave from '@/components/FooterWave.vue';
import { ToiecScore } from '@/components/term';
import { Button } from '@/components/ui/button';
import { practiceResultOptions, usePracticeResult } from '@/hooks/result';
import { queryClient } from '@/libs/react-query';
import { get } from 'lodash';
import { defineComponent } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';


const { params: { id }, } = useRoute('/dashboard/results/[id]/')

const router = useRouter()

const { data } = usePracticeResult(id, 'test')


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