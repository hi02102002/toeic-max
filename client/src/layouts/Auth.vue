<template>
    <Header />
    <div>
        <RouterView :key="route.path" />
    </div>
</template>

<script setup lang="ts">
import { Header } from '@/components/layouts/auth';
import { RouterView, useRoute } from 'vue-router/auto';
const route = useRoute()
</script>

<style scoped></style>
