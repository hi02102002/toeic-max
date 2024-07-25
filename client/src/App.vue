<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { RouterView } from 'vue-router/auto';
import { Toaster } from 'vue-sonner';


</script>

<template>

    <Toaster position="top-center" :close-button="true" />
    <VueQueryDevtools />
    <RouterView />
</template>
