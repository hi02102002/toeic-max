<template>
    <div class="flex items-center justify-between sm:flex-row flex-col-reverse gap-3">
        <div class="flex items-center gap-3 w-full">
            <Button size="sm" class="min-w-20 w-full sm:w-auto" :disabled="!isStarted"
                @click="emits('onPreviousQuestion')">
                Previous
            </Button>
            <Button size="sm" class="min-w-20 w-full sm:w-auto" :disabled="!isStarted" @click="emits('onNextQuestion')">
                Next
            </Button>
        </div>
        <div class="flex gap-3">
            <div class="flex items-center gap-3 w-full justify-center sm:justify-end font-medium">
                <span v-if="type === 'question'" class="text-nowrap">
                    {{
                        currentSectionQuestion.location.includes('-') ? `Questions ${props.currentSectionQuestion.location}`
                            :
                            `Question ${props.currentSectionQuestion.location}`
                    }}
                </span>
                <slot name="time" />

            </div>
            <slot name="list-choices" />
            <slot name="submit" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import type { TSectionQuestion } from '@/types/question';


const props = defineProps<{
    currentQuestionIndex: number
    currentSectionQuestion: TSectionQuestion
    isStarted: boolean
    type: string
}>()


const emits = defineEmits<{
    (e: 'onNextQuestion'): void
    (e: 'onPreviousQuestion'): void
}>()


</script>

<style scoped></style>