<template>
    <div class="flex items-center justify-between">
        <span class="text-muted-foreground inline-block ">
            Write the word
        </span>
        <CircleProgress :progress="word.percent" />
    </div>
    <div class="flex flex-col items-center gap-3">
        <AudioEl :src="getWordAudioUrl(word.name, 1)" :spell="word.spelling" />
        <p>
            ({{ word.type }}) {{ word.meaning }}
        </p>
        <div class="flex w-full max-w-sm gap-3">
            <Button class="p-0 w-9 h-9 relative" duolingo :disabled="wordToHint.length === 0" @click="handleHint">
                <Ghost class="w-4 h-4" />
                <span class="text-[10px] absolute bottom-[-1px] right-[3px]">
                    {{ wordToHint.length }}
                </span>
            </Button>
            <div readonly :class="cn('border-primary border-2 flex-1 w-full rounded-sm flex items-center px-3', {
                'bg-destructive border-destructive text-destructive-foreground': isCorrectAnswer === false,

            })" disabled>
                {{ answer }}
            </div>
        </div>
        <div v-if="isCorrectAnswer === false">
            <p class="font-medium">
                Correct answer: <span class="text-primary">
                    {{ word.name }}
                </span>
            </p>
        </div>
        <ul class="flex gap-2 items-center flex-wrap justify-center max-w-sm">
            <li v-for="c in charsToFill" :key="c">
                <Button duolingo variant='outline' class="w-9 h-9 p-0" @click="() => handleClickKeyboard(c)">
                    {{ c }}
                </Button>
            </li>
            <div class="w-full flex items-end gap-2">
                <li class="w-3/4">
                    <Button variant='outline' duolingo class="w-full" @click="() => handleClickKeyboard(' ')">
                        Space
                    </Button>
                </li>
                <li class="w-1/4">
                    <Button variant='outline' duolingo class="w-full" @click="handleRemoveChar">
                        <Eraser class="w-4 h-4" />
                    </Button>
                </li>
            </div>
        </ul>
        <Button size="lg" duolingo class="mt-2" :disabled="isCorrectAnswer !== undefined" @click="handleCheck">
            Check
        </Button>
    </div>
</template>

<script setup lang="ts">
import { ALPHABETS } from '@/constants';
import type { TLearnVoca } from '@/types/learn-voca';
import { ELearnType } from '@/types/learn-voca';
import { cn } from '@/utils';
import { getWordAudioUrl } from '@/utils/common';
import { Eraser, Ghost } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import CircleProgress from '../CircleProgress.vue';
import { Button } from '../ui/button';
import AudioEl from './Audio.vue';

type Props = {
    word: TLearnVoca
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'play-game', payload: {
        type: 'correct' | 'incorrect'
        wordId: string
        gameType: ELearnType
    }): void
}>()

const answer = ref('')

const wordToHint = ref(
    props.word.name.slice(0, Math.floor(props.word.name.length / 2))
)

const isCorrectAnswer = ref<undefined | boolean>(undefined)

const charsToFill = computed(() => {
    const originalChars = props.word.name.split('').map((c) => c.toLowerCase()).filter(c => c !== ' ')

    const originalCharsSet = new Set(originalChars)

    const charsNotIncludeOriginal: string[] = []

    while (charsNotIncludeOriginal.length !== originalChars.length) {
        const randomIndex = Math.floor(Math.random() * ALPHABETS.length);

        const c = ALPHABETS[randomIndex]

        if (!originalCharsSet.has(c)) {
            charsNotIncludeOriginal.push(c)
        }
    }

    return [...originalCharsSet, ...charsNotIncludeOriginal].sort(() => Math.random() - 0.5)
})

const handleClickKeyboard = (
    c: string
) => {
    if (isCorrectAnswer.value !== undefined) return;

    answer.value = answer.value + c
}

const handleRemoveChar = () => {
    if (answer.value.length === 0 ||

        isCorrectAnswer.value !== undefined
    ) return;

    const sliced = answer.value.split('')
    sliced.pop()
    answer.value = sliced.join('')
}

const handleHint = () => {
    if (wordToHint.value.length === 0 ||

        isCorrectAnswer.value !== undefined
    ) return;
    const splittedWordToHint = wordToHint.value.split('')
    const firstChar = wordToHint.value[0];

    handleClickKeyboard(firstChar)

    splittedWordToHint.shift()

    wordToHint.value = splittedWordToHint.join('')
}

const handleCheck = () => {
    const isCorrect = answer.value.toLowerCase().trim() === props.word.name.toLowerCase().trim()

    isCorrectAnswer.value = isCorrect

    if (isCorrect) {
        const audio = new Audio('/audios/correct.mp3')
        audio.play()
    } else {
        const audio = new Audio('/audios/incorrect.mp3')
        audio.play()
    }
}

watch(isCorrectAnswer, (newValue) => {
    if (newValue === undefined) return;
    let timmerId: any = undefined;

    if (timmerId) {
        clearTimeout(timmerId)
    }

    timmerId = setTimeout(() => {
        emits('play-game', {
            type: newValue ? 'correct' : 'incorrect',
            wordId: props.word.id,
            gameType: ELearnType.FILL_BLANK
        })
    }, 1000)
},)

watch(() => props.word, () => {
    answer.value = ''
    wordToHint.value = props.word.name.slice(0, Math.floor(props.word.name.length / 2))
    isCorrectAnswer.value = undefined
})


</script>

<style scoped></style>