<template>
    <h2 :class="cn('text-xl font-semibold', $attrs.class as string)">
        <slot />
    </h2>
</template>

<script setup lang="ts">
import { cn } from '@/utils';

defineOptions({
    inheritAttrs: true
})
</script>

<style scoped></style>