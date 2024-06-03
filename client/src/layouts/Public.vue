<template>
    <Header />
    <RouterView />
</template>

<script setup lang="ts">
import { Header } from '@/components/layouts/public';
import { RouterView } from 'vue-router/auto';
</script>


<style scoped></style>
