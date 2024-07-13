<template>
    <Header class="border-b border-input border-solid" />
    <div class="min-h-svh pt-14 flex flex-col">
        <div :class="cn(
            'bg-background h-full flex-1 !py-4',
            {
                'container-app': !route.meta?.noContainer
            },
            route.meta?.class as string
        )">
            <RouterView />
        </div>
    </div>
    <ScrollToTop />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { cn } from '@/utils';
import { useRoute } from 'vue-router/auto';

const route = useRoute()

</script>

<style scoped></style>
