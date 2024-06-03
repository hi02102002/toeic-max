<template>
    <Header />
    <div>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { Header } from '@/components/layouts/auth';
import { RouterView } from 'vue-router';

</script>

<style scoped></style>
