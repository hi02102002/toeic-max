<template>
    <div class="grid grid-cols-5 gap-4">
        <Block title="Total Users" :value="100">
            <template #icon>
                <UsersRound class="w-4 h-4" />
            </template>
        </Block>
        <Block title="Total Users" :value="100">
            <template #icon>
                <UsersRound class="w-4 h-4" />
            </template>
        </Block>
    </div>
</template>

<script setup lang="ts">
import { Block } from '@/components/ui/chart-block';
import { useTitle } from '@vueuse/core';
import { UsersRound } from 'lucide-vue-next';
import { definePage } from 'vue-router/auto';

useTitle('Admin Dashboard | ELand')

definePage({
    meta: {
        layout: 'Admin',
        title: "Dashboard",
        roles: ['ADMIN'],
        requiresAuth: true
    },
})


</script>

<style scoped></style>
