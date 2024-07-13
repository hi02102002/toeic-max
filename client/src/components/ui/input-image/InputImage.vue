<template>
    <input ref="inputRef" type="file" accept="image/*" class="hidden" @change="handleInputFileChange" />
    <div class="flex gap-3 items-center">
        <div class="w-24">
            <Button class="p-0 w-full h-auto" variant="outline" :disabled="uploadImageMutation.isPending.value"
                type='button' @click="inputRef?.click()">
                <AspectRatio :ratio="1 / 1" class="flex items-center justify-center cursor-pointer">
                    <Loader2 v-if="uploadImageMutation.isPending.value" class="animate-spin" />
                    <Plus v-else />
                </AspectRatio>
            </Button>

        </div>
        <ul v-if="Array.isArray(modelValue)" class="flex gap-2 flex-wrap">
            <li v-for="(url, index) in modelValue" :key="index" class="relative">
                <div class="w-24 relative">
                    <Button size="sm" class="w-5 h-5 p-0 absolute top-2 right-2 z-50" variant="destructive"
                        @click="() => removeImage(index)">
                        <X class="w-3 h-3" type='button' />
                    </Button>
                    <AspectRatio :ratio="1 / 1">
                        <img :src="url" alt="image" class="object-cover w-full h-full" />
                    </AspectRatio>
                </div>
            </li>
        </ul>
        <div v-else-if="modelValue !== undefined" class="w-24 ">
            <AspectRatio :ratio="1 / 1" class="rounded overflow-hidden shadow">
                <img :src="modelValue" alt="image" class="object-cover w-full h-full" />
            </AspectRatio>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUploadImage } from '@/hooks/upload';
import { useVModel } from '@vueuse/core';
import { Loader2, Plus, X } from 'lucide-vue-next';
import { ref } from 'vue';
import { AspectRatio } from '../aspect-ratio';
import { Button } from '../button';

type Props = {
    modelValue?: string | string[];
    defaultValues?: string | string[]
    isMultiple?: boolean;
    limit?: number;
}


const inputRef = ref<HTMLInputElement | null>(null);

const emits = defineEmits(['update:modelValue'])

const props = withDefaults(
    defineProps<Props>(),
    {
        isMultiple: false,
        defaultValues: undefined,
        modelValue: undefined,
        limit: undefined
    }
)

const modelValue = useVModel(props, 'modelValue', emits, {
    defaultValue: props.defaultValues,
    passive: true,
})

defineOptions({ inheritAttrs: false })

const uploadImageMutation = useUploadImage()

const handleInputFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    const url = await uploadImageMutation.mutateAsync(file)


    if (props.isMultiple && Array.isArray(modelValue.value)) {
        if (props.limit && modelValue.value.length >= props.limit) {
            modelValue.value = [...modelValue.value.slice(1), url]
        } else {
            modelValue.value = [...modelValue.value, url]
        }
    } else {
        modelValue.value = url
    }
}

const removeImage = (index: number) => {
    if (Array.isArray(modelValue.value)) {
        modelValue.value = modelValue.value.filter((_, i) => i !== index)
    } else {
        modelValue.value = undefined
    }
}

</script>

<style scoped></style>