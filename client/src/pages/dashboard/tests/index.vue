<template>
    <div>
        <div class="space-y-4">
            <template v-for="(tests, key) in grouped" :key="key">
                <h2 class="font-semibold text-lg">{{ key }}</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                    <template v-for="test in tests" :key="test.id">
                        <div class="bg-white p-4 rounded border-input border cursor-pointer flex flex-col items-center justify-center hover:border-primary"
                            @click="router.push(`/dashboard/tests/${test.id}`)">
                            <img src="/images/test.png" class="w-16 h-16 mx-auto mb-2" />
                            <h3 class="font-medium text-sm">{{ test.name }}</h3>
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async () => {
        await queryClient.ensureQueryData(KitTestCrudClient.getAllQueryOptions())

    },
})
</script>

<script setup lang="ts">
import { KitTestCrudClient } from '@/hooks/kit-test';
import { queryClient } from '@/libs/react-query';
import type { TTest } from '@/types/test';
import { groupBy, sortBy } from 'lodash';
import { computed, defineComponent } from 'vue';
import { definePage, useRouter } from 'vue-router/auto';

const { data: tests } = KitTestCrudClient.useGetAll()

const router = useRouter()

const grouped = computed(() => {
    const grouped = groupBy(tests.value, 'kit.name');
    const sortedGroupKeys = sortBy(Object.keys(grouped));

    const sortedGrouped: Record<string, Array<TTest>> = {};
    sortedGroupKeys.forEach(key => {
        sortedGrouped[key] = grouped[key].sort((a, b) => a.name.localeCompare(b.name));
    });

    return sortedGrouped;
})


definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true,
    },
})

</script>

<style scoped></style>