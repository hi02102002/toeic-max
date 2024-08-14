<template>
    <div class="flex flex-col gap-1 items-center">
        <Button class="w-10 h-10 rounded-full p-0 bg-blue-500 hover:bg-blue-600" @click="handleAudioCLick">
            <Volume2 />
        </Button>
        <span v-if="props.spell" class="text-sm text-muted-foreground">
            {{ htmlEntityToChar(spell as string) }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { htmlEntityToChar } from '@/utils/common';
import { Volume2 } from 'lucide-vue-next';
import { Button } from '../ui/button';

type Props = {
    src: string;
    spell?: string;
}

const props = defineProps<Props>()

const handleAudioCLick = () => {
    const audio = new Audio(props.src)

    if (!audio.paused) return;

    audio.play()
}

</script>

<style scoped></style>