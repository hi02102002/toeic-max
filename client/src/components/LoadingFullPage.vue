<template>
    <div class="flex items-center justify-center min-h-svh  fixed inset-0 z-[100]">
        <div class=" backdrop-filter backdrop-blur absolute inset-0 z-10">
        </div>
        <Loader2 class="z-20 animate-spin flex-shrink-0 w-6 h-6" />
    </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';


</script>

<style scoped></style>