<script setup lang="ts">
import { RouterView } from 'vue-router/auto';
import { Toaster } from 'vue-sonner';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

</script>

<template>
    <Toaster position="top-center" :close-button="true" />
    <VueQueryDevtools />
    <RouterView />
</template>
