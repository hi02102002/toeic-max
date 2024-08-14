<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <Audio :src="getWordAudioUrl(word?.name, 1)" />
                <div class="flex items-start flex-col gap-1">
                    <span class="leading-none font-semibold text-primary">
                        {{ word?.name }}
                    </span>
                    <span class="leading-none text-muted-foreground text-sm">
                        {{ htmlEntityToChar(word.spelling) }}
                    </span>
                </div>
            </div>
            <CircleProgress :progress="word.percent" />
        </div>
        <p>
            <span class="leading-none text-muted-foreground italic">
                ({{ word.category }})
            </span>

            {{ word.meaning }}
        </p>
        <div class="max-w-72 mx-auto flex items-center justify-center">
            <img :src='word.image' alt="" class="rounded" />
        </div>
        <div>
            <span class="italic underline">
                Example
            </span>
            <p>
                {{ word.example }}
            </p>
        </div>
        <div class="flex items-end gap-4 justify-center">
            <Button duolingo size="lg" @click="emits('learn-voca', {
                type: 'learn',
                word_id: word?.id
            })">
                Learn this word
            </Button>
            <Button duolingo variant='outline' size="lg" @click="emits('learn-voca', {
                type: 'remembered',
                word_id: word?.id
            })">
                Remembered
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import CircleProgress from '@/components/CircleProgress.vue';
import type { TLearnVoca } from '@/types/learn-voca';
import { getWordAudioUrl, htmlEntityToChar } from '@/utils/common';
import { Button } from '../ui/button';
import Audio from './Audio.vue';

type Props = {
    word: TLearnVoca
}

defineProps<Props>()

const emits = defineEmits<{
    (e: 'learn-voca', value: {
        type: 'learn' | 'remembered',
        word_id: string
    }): void
}>()


</script>

<style scoped></style>