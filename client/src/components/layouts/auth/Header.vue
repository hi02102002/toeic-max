<template>
    <header class="flex items-center h-14 fixed top-0 left-0 right-0 bg-white">
        <div class="container-app flex items-center">
            <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold text-primary">
                <img src="/images/logo.png" alt="Logo" class="h-10 w-10" />
            </RouterLink>
        </div>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router/auto';
</script>

<style scoped></style>
