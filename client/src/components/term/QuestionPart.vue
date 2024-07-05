<!-- eslint-disable vue/no-v-html -->
<template>
    <div class="flex gap-5 max-w-5xl mx-auto md:flex-row flex-col md:gap-10">
        <div v-if="props.questionSection?.teaser?.text || props.questionSection?.image_urls.length !== 0 || props.questionSection?.audio_url"
            class="flex items-start gap-4 flex-col md:w-1/2
                max-h-screen overflow-y-auto
            ">
            <div v-if="props.questionSection?.audio_url" class='bg-[#F1F3F4] w-full rounded shadow'>
                <audio ref="audioRef" controls :src="props.questionSection?.audio_url" class="w-full h-11" />
            </div>

            <ul v-if="props.questionSection?.image_urls?.length !== 0
                && !PART_RENDER_TEASER.includes(props.questionSection.part)
            " class="flex items-center gap-4 justify-center w-full flex-col">
                <li v-for="image in props.questionSection?.image_urls" :key="image">
                    <img :src="image" alt="image" class="rounded w-full" />
                </li>
            </ul>
            <ul v-if="props.questionSection?.image_urls?.length !== 0
                && PART_RENDER_TEASER.includes(props.questionSection.part)

                && (
                    props.questionSection.teaser.text
                )
            " class="flex items-center gap-4 justify-center w-full flex-col">
                <li v-for="image in props.questionSection?.image_urls" :key="image">
                    <img :src="image" alt="image" class="rounded w-full" />
                </li>
            </ul>
            <div v-if="props.questionSection?.teaser?.text &&
                PART_RENDER_TEASER.includes(props.questionSection.part) && (
                    props.questionSection.image_urls.length === 0
                )
            " class="space-y-2">
                <div class="text-sm mx-auto" v-html="props.questionSection.teaser.text"></div>
            </div>
        </div>
        <div class="space-y-4 w-full md:max-w-3xl mx-auto md:w-1/2">
            <Question v-for="(question, index) in questionSection?.questions" :key="question.id" :question="question"
                :show-is-correct="props.showIsCorrect" :index="index" @choose="handelChoose" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TChoice } from '@/stores/practice-part';
import type { TSectionQuestion } from '@/types/question';
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import Question from './Question.vue';
const audioRef = ref<HTMLAudioElement | null>(null)

const PART_RENDER_TEASER = [6, 7]

type Props = {
    questionSection: TSectionQuestion
    isActive: boolean
    isAutoPlayAudio?: boolean
    showIsCorrect?: boolean
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (event: 'choose', choice: TChoice): void
    (event: 'end-question'): void
}>()


const handelChoose = (value: TChoice) => {
    emits('choose', value)
}

onMounted(() => {
    const audio = audioRef.value

    audio?.play()

    audio?.addEventListener('ended', () => {
        emits('end-question')
    })
})

onUnmounted(() => {
    audioRef.value?.pause()
})

watchEffect(() => {
    if (props.isActive && props.isAutoPlayAudio) {
        audioRef.value?.play()
    } else {
        audioRef.value?.pause()
    }
})

</script>

<style scoped></style>