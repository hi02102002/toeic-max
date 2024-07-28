<template>
    <Button variant="ghost" class="flex items-center w-full h-auto" @click="handelClickChoice">
        <div class="flex items-center gap-2 max-w-56 w-full font-medium">
            <Check v-if="KEYS.some((key) => isCorrect(key))" class="w-4 h-4 text-green-500" />
            <X v-else-if="KEYS.some((key) => isWrong(key))" class="w-4 h-4 text-red-500" />
            <Info v-else-if="KEYS.some((key) => isNotChoose(key))" class="w-4 h-4 text-yellow-500" />
            <span>
                {{ formatQuestionLocation(
                    {
                        location: props.choice.location,
                        part: props.choice.part,
                        index: props.index
                    }
                ) }}
            </span>

        </div>
        <ul class="grid w-full gap-4" :style="{
            gridTemplateColumns: `repeat(${Object.keys(KEYS).length
                }, 1fr)`
        }">
            <li v-for="(key) in KEYS" :key="key" class="flex items-center justify-center">
                <Button variant="outline" :class="cn('w-8 h-8 rounded-full p-0 pointer-events-none', {
                    'bg-yellow-500 hover:bg-yellow-500 border-yellow-500': isNotChoose(key),
                    'bg-green-500 hover:bg-green-500 border-green-500': isCorrect(key) || isAnswer(key),
                    'bg-red-500 hover:bg-red-500 border-red-500 text-white hover:text-white': isWrong(key),
                })">
                    {{ key.toUpperCase() }}
                </Button>
            </li>
        </ul>
    </Button>
</template>

<script setup lang="ts">
import type { TChoice } from '@/types/common';
import { cn } from '@/utils';
import { formatQuestionLocation } from '@/utils/section-question';
import { Check, Info, X } from 'lucide-vue-next';
import { Button } from '../ui/button';

const KEYS = ['a', 'b', 'c', 'd']

type Props = {
    choice: TChoice
    index?: number
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'click-question', questionSectionId: string): void
}>()

const handelClickChoice = () => {
    emits('click-question', props.choice.section_question_id)
}

const isCorrect = (key: string) => {


    return props.choice.choose === key && props.choice.ans === key
}

const isAnswer = (key: string) => {


    return props.choice.ans === key
}

const isWrong = (key: string) => {


    return props.choice.choose === key && props.choice.ans !== key
}

const isNotChoose = (key: string) => {


    return props.choice.choose === '' && props.choice.ans === key
}

</script>

<style scoped></style>