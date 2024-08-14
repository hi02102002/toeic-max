<template>
    <div class="flex items-center justify-between">
        <span class="text-muted-foreground inline-block ">
            True or False
        </span>
        <CircleProgress :progress="word.percent" />
    </div>
    <div class="flex flex-col gap-2 items-center">
        <AudioE :src="getWordAudioUrl(word.name, 1)" :spell="word.spelling" />
        <span class="text-xl font-medium">
            {{ word.name }}
        </span>
        <span class="text-primary">
            This word meaning
        </span>
        <p>
            <span v-if="randomLearningWord?.category" class="italic">
                ({{ randomLearningWord?.category }})
            </span> - {{ randomLearningWord?.meaning }}
        </p>
        <div class="flex items-end gap-3">
            <Button duolingo :variant="variantButton(true)" @click="handleChoose(true)">
                Correct
            </Button>
            <Button :variant="variantButton(false)" duolingo @click="handleChoose(false)">
                Incorrect
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TLearnVoca } from '@/types/learn-voca';
import { ELearnType } from '@/types/learn-voca';
import { getWordAudioUrl } from '@/utils/common';
import { computed, ref, watch } from 'vue';
import CircleProgress from '../CircleProgress.vue';
import { Button } from '../ui/button';
import AudioE from './Audio.vue';

type Props = {
    word: TLearnVoca
    learnings: TLearnVoca[]
}

const props = defineProps<Props>()
const isAnswerCorrect = ref<boolean | undefined>(undefined)
const choose = ref<boolean | undefined>(undefined)


const randomLearningWord = computed(() => {
    const randForTrue = Math.floor(Math.random() * 2);

    if (randForTrue === 1) {
        return props.word
    }

    const learningsWithOutCurrentWord = props.learnings.filter(w => w.id !== props.word.id)

    const randForFalse = Math.floor(Math.random() * learningsWithOutCurrentWord.length)


    return learningsWithOutCurrentWord[randForFalse]
})

const emits = defineEmits<{
    (e: 'play-game', payload: {
        type: 'correct' | 'incorrect'
        wordId: string
        gameType: ELearnType
    }): void
}>()


const handleChoose = (value: boolean) => {
    if (isAnswerCorrect.value !== undefined) return;

    choose.value = value

    if (value === (randomLearningWord.value?.id === props.word.id)) {
        const audio = new Audio('/audios/correct.mp3')
        audio.play()
        isAnswerCorrect.value = true
    } else {
        const audio = new Audio('/audios/incorrect.mp3')
        audio.play()

        isAnswerCorrect.value = false
    }
}

const variantButton = (value: boolean) => {
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
            gameType: ELearnType.TRUE_OR_FALSE
        })
    }, 1000)
})

watch(() => props.word, () => {
    isAnswerCorrect.value = undefined
    choose.value = undefined
})

</script>

<style scoped></style>