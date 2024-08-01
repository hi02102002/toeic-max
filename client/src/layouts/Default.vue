<template>
    <RouterView :key="route.fullPath" />
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router/auto';
const route = useRoute()
</script>


<style scoped></style>
