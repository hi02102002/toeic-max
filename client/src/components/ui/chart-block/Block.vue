<template>
    <Card class="bg-white shadow-sm rounded-lg" :style="{ borderColor: props.color, color: props.color }">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle class="text-sm font-medium">
                {{ props.title }}
            </CardTitle>
            <slot name="icon" />
        </CardHeader>
        <CardContent class="p-4 pt-0">
            <div class="text-2xl font-bold">
                {{ props.value }}
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '../card';


type TBlockProps = {
    title: string
    value: any
    color?: string
}

const props = defineProps<TBlockProps>()


</script>

<style scoped></style>