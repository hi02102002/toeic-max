<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { VocabularyClient } from '@/hooks/vocabulary';
import { EFilterCondition, EFilterType } from '@/types/common';
import { useRoute } from 'vue-router/auto';
const { params } = useRoute('/dashboard/topics/[id]');

const { data } = VocabularyClient.usePagingBuilder({
    filters: [
        `topic_id|${EFilterCondition.EQUAL}|${params.id}|${EFilterType.STRING}`
    ],
})
</script>

<style scoped></style>