<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { TopicClient } from '@/hooks/topic';


const { data } = TopicClient.usePaginate({
    page: 1,
    limit: 9999,
})

</script>

<style scoped></style>