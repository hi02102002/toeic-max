<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <span class="text-muted-foreground inline-block ">
                Choose {{
                    type === 'word' ? 'meaning' : 'word'
                }}
            </span>
            <CircleProgress :progress="word.percent" />
        </div>
        <div class="flex flex-col gap-2 items-center">
            <AudioEl :src="getWordAudioUrl(word.name, 1)" :spell="word.spelling" />
            <p>
                <span v-if="type === 'word'" class="italic">
                    ({{ word.type }})
                </span> {{ word[type === 'meaning' ? 'meaning' : 'name'] }}
            </p>
        </div>
        <ul class="grid grid-cols-2 gap-3">
            <li v-for="c in choices" :key="c.id" class=" aspect-video">
                <Button duolingo :variant="variantButton(c.id)" class="w-full h-full md:px-3 p-1"
                    @click="() => handleChoose(c)">
                    <p class="text-wrap whitespace-pre-line md:text-base text-sm ">
                        {{
                            type === 'word' ? c.meaning : c.name
                        }}
                    </p>
                </Button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { TLearnVoca } from '@/types/learn-voca';
import { ELearnType } from '@/types/learn-voca';
import { getWordAudioUrl } from '@/utils/common';
import { computed, ref, watch } from 'vue';
import CircleProgress from '../CircleProgress.vue';
import { Button } from '../ui/button';
import AudioEl from './Audio.vue';

type Props = {
    word: TLearnVoca
    learnings: TLearnVoca[]
    type: 'word' | 'meaning'
}

const props = defineProps<Props>()
const isAnswerCorrect = ref<boolean | undefined>(undefined)
const choose = ref<string | undefined>(undefined)

const emits = defineEmits<{
    (e: 'play-game', payload: {
        type: 'correct' | 'incorrect'
        wordId: string
        gameType: ELearnType
    }): void
}>()


const choices = computed(() => {
    const choices = [props.word]

    while (choices.length < 4) {
        const randomWord = props.learnings[Math.floor(Math.random() * props.learnings.length)]

        if (!choices.some(w => w.id === randomWord.id) && randomWord.id !== props.word.id) {
            choices.push(randomWord)
        }
    }

    return choices.sort(() => Math.random() - 0.5)
})

const handleChoose = (word: TLearnVoca) => {
    if (isAnswerCorrect.value !== undefined) return

    if (word.id === props.word.id) {
        const audio = new Audio('/audios/correct.mp3')

        audio.play()

        isAnswerCorrect.value = true
    } else {
        const audio = new Audio('/audios/incorrect.mp3')

        audio.play()

        isAnswerCorrect.value = false
    }

    choose.value = word.id
}

const variantButton = (value: string) => {

    if (isAnswerCorrect.value === undefined && choose.value === undefined) {
        return 'outline'
    }

    if (isAnswerCorrect.value === true && choose.value === value) {
        return 'default'
    }

    if (isAnswerCorrect.value === false && choose.value === value) {
        return 'destructive'
    }

    return 'outline'
}

watch(isAnswerCorrect, (newValue) => {
    if (newValue === undefined) return;
    let timmerId: any = undefined;

    if (timmerId) {
        clearTimeout(timmerId)
    }

    timmerId = setTimeout(() => {
        emits('play-game', {
            type: newValue ? 'correct' : 'incorrect',
            wordId: props.word.id,
            gameType: props.type === 'word' ? ELearnType.CHOOSE_WORD : ELearnType.CHOOSE_MEANING
        })
    }, 1000)
})

watch(() => props.word, () => {
    isAnswerCorrect.value = undefined
    choose.value = undefined
})


</script>

<style scoped></style>