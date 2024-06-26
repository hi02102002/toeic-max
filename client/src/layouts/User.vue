<template>
    <Header class="border-b border-input border-solid" />
    <div class="min-h-svh pt-14">
        <div class="container-app bg-background">
            <div class="py-4">
                <RouterView />
            </div>
        </div>
    </div>
    <ScrollToTop />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

</script>

<style scoped></style>
