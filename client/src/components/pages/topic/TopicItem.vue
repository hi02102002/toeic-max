<template>
    <div
        class="flex flex-col border-input rounded-md border font-medium items-center hover:bg-primary hover:border-primary hover:text-white group transition-all text-center shadow-sm">
        <span class="h-16 flex items-center justify-center p-3">
            {{ topic.name }}
        </span>
        <div v-if="combine" class="w-full h-[3px] bg-violet-600 self-start transition-all"
            :style="{ width: `${combine.percent}%` }">
        </div>
        <div
            class="w-full h-8 flex items-center justify-center text-sm bg-muted group-hover:bg-white group-hover:text-black transition-all">
            <span v-if="!combine">
                Study
            </span>
            <p v-else>
                Studied: <span class="text-primary">
                    {{ combine.learned }}/{{ combine.total }}
                </span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { THistory } from '@/types/history';
import type { TTopic } from '@/types/topic';
import type { Dictionary } from 'lodash';
import { computed } from 'vue';

type Props = {
    topic: TTopic
    history: Dictionary<THistory[]> | null
}

const props = defineProps<Props>()

const combine = computed(() => {
    const histories = props.history?.[props.topic.id] || null

    if (!histories) return null

    const total = histories[0].meta_data.total_vocabs
    const learned = histories[0].contents.filter((v: any) => v.percent === 100).length
    const percent = Math.round((learned / total) * 100)

    return {
        total,
        learned,
        percent
    }

})

</script>

<style scoped></style>