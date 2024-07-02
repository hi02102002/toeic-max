<template>
    <div class="space-y-4">
        <div class="section">
            <h3 class="section-title">
                Listening
            </h3>
            <div class="section-content">
                <div v-for="section in LISTENING_SECTIONS" :key="section.title" class="section-content-item" @click="() => handelMoveToPractice(section.href, section.part)
                    ">
                    <div class="ratio">
                        <AspectRatio :ratio="1">
                            <img :src="section.image" alt="section.title">
                        </AspectRatio>
                    </div>
                    <h4 class="section-content-item-title">{{ section.title }}</h4>
                </div>
            </div>
        </div>
        <div class="section">
            <h3 class="section-title">
                Reading
            </h3>
            <div class="section-content">
                <div v-for="section in READING_SECTIONS" :key="section.title" class="section-content-item" @click="() => handelMoveToPractice(section.href, section.part)
                    ">
                    <div class="ratio">
                        <AspectRatio :ratio="1">
                            <img :src="section.image" alt="section.title">
                        </AspectRatio>
                    </div>
                    <h4 class="section-content-item-title">{{ section.title }}</h4>
                </div>
            </div>
        </div>
        <div class="section">
            <h3 class="section-title">
                Training
            </h3>
            <div class="section-content">
                <RouterLink v-for="section in TRAINING_SECTIONS" :key="section.title" :to="section.href"
                    class="section-content-item">
                    <div class="ratio">
                        <AspectRatio :ratio="1">
                            <img :src="section.image" alt="section.title">
                        </AspectRatio>
                    </div>
                    <h4 class="section-content-item-title">{{ section.title }}</h4>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { sectionByPartQueryOptions } from '@/hooks/section';
import { queryClient } from '@/libs/react-query';
import { RouterLink, definePage, useRouter } from 'vue-router/auto';

const router = useRouter()

const handelMoveToPractice = async (
    href: string,
    part: number
) => {
    await
        queryClient.prefetchQuery(sectionByPartQueryOptions(part))

    router.push(href)
}


const LISTENING_SECTIONS = [{
    image: '/images/photo-gallery.png',
    title: 'Part 1 - Photographs',
    href: '/dashboard/question/1',
    type: 'question',
    part: 1

}, {
    image: '/images/qa.png',
    title: 'Part 2 - Question - Response',
    href: '/dashboard/question/2',
    type: 'question',
    part: 2

}, {
    image: '/images/talking.png',
    title: 'Part 3 - Conversations',
    href: '/dashboard/question/3',
    type: 'question',
    part: 3

}, {
    image: '/images/listen-music.png',
    title: 'Part 4 - Short Talks',
    href: '/dashboard/question/4',
    type: 'question',
    part: 4
}
]

const READING_SECTIONS = [{
    image: '/images/clipboard.png',
    title: 'Part 5 - Incomplete Sentences',
    href: '/dashboard/question/5',
    type: 'question',
    part: 5

}, {
    image: '/images/checklist.png',
    title: 'Part 6 - Text Completion',
    href: '/dashboard/question/6',
    type: 'question',
    part: 6
}, {
    image: '/images/learning.png',
    title: 'Part 7 - Reading Comprehension',
    href: '/dashboard/question/7',
    type: 'question',
    part: 7
}
]

const TRAINING_SECTIONS = [{
    image: '/images/dictionary.png',
    title: 'Vocabulary',
    href: '/dashboard/vocabulary',
}, {
    image: '/images/question.png',
    title: 'Practice Test',
    href: '/dashboard/practice-test',
},
]

definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true
    },
})

</script>

<style scoped>
.section {
    @apply flex flex-col gap-4;
}

.section-title {
    @apply text-lg font-semibold;
}

.section-content {
    @apply lg:flex gap-4 flex-wrap grid-cols-2 grid text-center;
}

.section-content-item {
    @apply flex flex-col items-center justify-center gap-2 lg:min-w-60 bg-white border border-input p-4 rounded shadow-sm cursor-pointer select-none lg:max-w-60;
}

.section-content-item .ratio {
    @apply w-14;
}

.section-content-item img {
    @apply w-full h-full object-cover;
}

.section-content-item-title {
    @apply text-sm font-semibold
}
</style>