<template>
    <Button :class="cn('fixed bottom-4 right-4 opacity-0 invisible  translate-y-[80px] transition-all', {
        'opacity-100 visible translate-y-0': y > 100
    })" size="icon" @click="handleScrollToTop">
        <ChevronUp class="w-4 h-4" />
    </Button>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';
import { Button } from './ui/button';
import { ChevronUp } from 'lucide-vue-next';
import { cn } from '@/utils';

const { y } = useWindowScroll()

const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<style scoped></style>