<template>
    <svg viewBox="0 0 36 36" class="w-10 h-10">
        <path class="circle-bg stroke-primary/50 stroke-[4px] fill-none" d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path class="circle stroke-primary stroke-[4px] fill-none" :stroke-dasharray="`${progress}, 100`" d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"></path><text x="18" y="21.35"
            class="percentage text-[10px] text-center align-middle" :style="{
                'text-anchor': 'middle'
            }">{{ progress }}%</text>
    </svg>
</template>

<script setup lang="ts">
type Props = {
    progress: number
}

defineProps<Props>()

</script>

<style scoped></style>