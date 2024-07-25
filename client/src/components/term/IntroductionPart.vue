<template>
    <div class="grid md:grid-cols-2 gap-4">
        <div class="space-y-3">
            <span class="text-lg font-semibold">
                {{ props.section.name }}
            </span>
            <div v-if="props.section.section_title || props.section.section_description">
                <span v-if="props.section.section_title" class="text-lg font-semibold">
                    {{ props.section.section_title }}
                </span>
                <p v-if="props.section.section_description">
                    {{ props.section.section_description }}
                </p>
            </div>
            <div v-if="props.section.title || props.section.intro">
                <span class="text-lg font-semibold">
                    {{ props.section.name }} - {{ props.section.title }}
                </span>
                <p>
                    {{ props.section.intro }}
                </p>
            </div>
            <img v-if="props.section.intro_image" :src="props.section.intro_image" alt="image"
                class="rounded mx-auto" />
            <p v-if="props.section.intro_answer">
                {{ props.section.intro_answer }}
            </p>
            <div v-if="props.section.intro_audio" class='bg-[#F1F3F4] w-full rounded shadow'>
                <audio ref="audioRef" controls :src="props.section.intro_audio" class="w-full h-11" />
            </div>
        </div>
        <slot name="right" />
    </div>
</template>

<script setup lang="ts">
import type { TSection } from '@/types/section';
import { ref, watch } from 'vue';

const audioRef = ref<HTMLAudioElement | null>(null)

type Props = {
    section: TSection
    isPlayAudio?: boolean
}

const props = defineProps<Props>();

watch(() => props.isPlayAudio, (value) => {
    if (value) {
        audioRef.value?.play()
    } else {
        audioRef.value?.pause()
    }
})

</script>

<style scoped></style>