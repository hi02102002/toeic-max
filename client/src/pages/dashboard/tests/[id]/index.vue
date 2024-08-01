<template>
    <div class="md:max-w-3xl md:mx-auto flex flex-col gap-4 items-center relative h-full">
        <div>
            <span class="text-xl font-semibold block text-center mb-2">
                {{ test?.name }}
            </span>
            <div class="flex items-center gap-1 justify-center">
                <span class="font-semibold">
                    Questions:
                </span>
                <span>
                    200
                </span>
            </div>

            <div class="flex items-center gap-1 justify-center">
                <span class="font-semibold">
                    Duration:
                </span>
                <span>
                    120 minutes
                </span>
            </div>

        </div>
        <div class="max-w-xs mx-auto">
            <img src="/images/peeking.png" alt="">
        </div>
    </div>
    <FooterWave>
        <div class="flex items-center justify-center gap-4">
            <Button class="min-w-32" duolingo @click="handleStart">
                Start
            </Button>
        </div>
    </FooterWave>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (to: any) => {
        await queryClient.ensureQueryData(KitTestCrudClient.getByIdQueryOptions(
            to.params.id
        ))
    },
})
</script>

<script setup lang="ts">
import FooterWave from '@/components/FooterWave.vue';
import { Button } from '@/components/ui/button';
import { KitTestCrudClient } from '@/hooks/kit-test';
import { queryClient } from '@/libs/react-query';
import { defineComponent } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';

const { params: { id } } = useRoute('/dashboard/tests/[id]/')

const { data: test } = KitTestCrudClient.useGetById(id)

const router = useRouter()


const handleStart = () => {
    router.push(`/dashboard/tests/${id}/practice`)
}

definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true
    },
})

</script>

<style scoped></style>