<template>
    <div class="flex items-center gap-3">
        <Input :model-value="q" placeholder="Search..." class="h-8" @update:model-value="handleChange" />
        <Button v-if="q?.trim()?.length > 0" variant="outline" size="icon" class="flex-shrink-0 h-8 w-8"
            @click="handleClear">
            <XIcon class="w-4 h-4" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { useUrlSearchParams, watchDebounced } from '@vueuse/core';
import { XIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '../button';
import { Input } from '../input';

const params = useUrlSearchParams('history', {
    initialValue: {
        q: ''
    }
})

const q = ref(
    params.q as string || ''
)


const handleChange = (value: string | number) => {
    if (typeof value === 'string') {
        q.value = value
    } else {
        q.value = `${value}`
    }
}

const handleClear = () => {
    q.value = ''
}

watchDebounced(
    q, (value) => {
        params.q = value
    }, {
    debounce: 800,
}
)


</script>

<style scoped></style>