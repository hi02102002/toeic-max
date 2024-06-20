<template>
    <div :class="cn('flex items-center gap-3', $attrs.class as string)">
        <Input v-model:model-value="modelValue" class="audio-input-url" :disabled="uploadAudioMutation.isPending.value"
            :placeholder="props.placeholder" />
        <Button :size="'icon'" class="audio-input-btn flex-shrink-0" variant="outline"
            :disabled="uploadAudioMutation.isPending.value" :loading="uploadAudioMutation.isPending.value" @click="() => inputRef?.click()
                ">
            <Upload v-if="!uploadAudioMutation.isPending.value" class="w-4 h-4 upload" />
        </Button>
    </div>
    <input ref="inputRef" type="file" class="hidden" accept="audio/*" @change="handleInputAudioFileChange" />
</template>

<script setup lang="ts">
import { Upload } from 'lucide-vue-next';
import { Button } from '../button';
import { Input } from '../input';
import { useVModel } from '@vueuse/core'
import { cn } from '@/utils';
import { ref } from 'vue';
import { useUploadAudio } from '@/hooks/upload'

type Props = {
    modelValue?: string
    defaultValue?: string;
    placeholder?: string
}
const inputRef = ref<HTMLInputElement | null>(null)

const emits = defineEmits(['update:modelValue'])

const props = defineProps<Props>()

const modelValue = useVModel(props, 'modelValue', emits, {
    defaultValue: props.defaultValue,
    passive: true,
})

const uploadAudioMutation = useUploadAudio()

const handleInputAudioFileChange = async (e: Event) => {

    const target = e.target as HTMLInputElement;
    const file = target.files?.[0]
    if (!file) return

    const url = await uploadAudioMutation.mutateAsync(file)

    modelValue.value = url

    if (inputRef.value) {
        inputRef.value.value = ''
    }
}

defineOptions({
    inheritAttrs: true
})

</script>

<style lang="css">
.audio-input-btn .loader {
    @apply mr-0
}
</style>