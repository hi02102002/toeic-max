<template>
    <div></div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { definePage } from 'vue-router/auto';

useTitle('Admin Dashboard | ELand')


definePage({
    meta: {
        layout: 'Admin',
        title: "Dashboard"
    }
})

</script>

<style scoped></style>
