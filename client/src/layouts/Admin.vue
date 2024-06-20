<template>
    <Header />
    <div class="min-h-svh pt-28">
        <div class="container-app bg-background">
            <div class="py-4 space-y-4">
                <PageTitle>
                    {{ route.meta?.title || 'App' }}
                </PageTitle>
                <RouterView />
            </div>
        </div>
    </div>
    <ScrollToTop />
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { Header } from '@/components/layouts/admin';
import { RouterView, useRoute } from 'vue-router/auto';


const route = useRoute()


</script>

<style scoped></style>
