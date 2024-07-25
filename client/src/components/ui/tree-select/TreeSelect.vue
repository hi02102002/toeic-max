<template>
    <Popover v-model:open="isOpen" modal>
        <PopoverTrigger as-child>
            <Button variant="outline" class="w-full justify-between font-normal text-sm px-2 break-all">
                {{
                    value || props.placeholder || 'Select an option'
                }}

                <X v-if="value" class="w-4 h-4" @click="(e) => {
                    e.stopPropagation()
                    model = ''
                }" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="p-2" :style="{
            width: 'var(--radix-popover-trigger-width)'
        }">
            <ScrollArea class="h-[272px] flex flex-col">
                <TreeNode v-for="node in options" :key="node.id" v-model:model-value="model" :node="node"
                    :options="props.options" :only-select-children="props.onlySelectChild" @select="handleSelect" />
            </ScrollArea>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { findIdPath } from './helper';
import { useVModel } from '@vueuse/core';
import { X } from 'lucide-vue-next';
import { computed, defineComponent, ref } from 'vue';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { ScrollArea } from '../scroll-area';
import TreeNode from './TreeNode.vue';
import type { TOption } from './tree-select.type';

type Props = {
    options: TOption[]
    modelValue?: string
    placeholder?: string
    onlySelectChild?: boolean
}

const props = defineProps<Props>()


const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const model = useVModel(props, 'modelValue', emits)

const isOpen = ref(false)

const handleSelect = () => {
    isOpen.value = false
}

const value = computed(() => findIdPath(props.options, model.value as string))

defineComponent({
    inheritAttrs: false,
})

</script>

<style scoped></style>