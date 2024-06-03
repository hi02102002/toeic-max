<script setup lang="ts">
import { RouterView } from 'vue-router/auto';
import { Toaster } from 'vue-sonner';


</script>

<template>
    <Toaster position="top-center" :close-button="true" />
    <RouterView />
</template>
