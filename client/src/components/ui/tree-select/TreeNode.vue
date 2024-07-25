<template>
    <div :class="cn('relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer justify-between mb-2 last:mb-0 pr-0', {
        'bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground': model === props.node.value,
    })" @click="handleSelect">
        <span>
            {{ props.node.label }}
        </span>
        <div class="px-2">
            <ChevronRightIcon v-if="props.node.children && props.node.children.length > 0" :class="cn('h-4 w-4 transition-all', {
                'transform rotate-90': isOpen
            })" @click="handleToggleOpen" />
        </div>
    </div>
    <div v-if="props.node.children && isOpen" class="pl-2">
        <TreeNode v-for="child in props.node.children" :key="child.id" v-model:model-value="model" :node="child"
            :options="props.options" @select="emits('select', child.value)" />
    </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils';
import { useVModel } from '@vueuse/core';
import { ChevronRightIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { isLowestChild } from './helper';
import type { TOption } from './tree-select.type';

type Props = {
    node: TOption
    modelValue?: string
    onlySelectChildren?: boolean
    options: TOption[]
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void,
    (e: 'select', value: string): void
}>()

const isOpen = ref(false)

const handleToggleOpen = (e: Event) => {
    e.stopPropagation()
    isOpen.value = !isOpen.value
}

const handleSelect = () => {
    if (props.onlySelectChildren && !isLowestChild(props.options, props.node.id)) {
        return;
    }

    if (model.value === props.node.value) {
        model.value = ''
    } else {
        model.value = props.node.value
    }

    emits('select', props.node.value)
}

const model = useVModel(props, 'modelValue', emits,)

</script>

<style scoped></style>