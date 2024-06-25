<template>
    <Popover v-model:open="isOpen" modal>
        <PopoverTrigger as-child>
            <Button variant="outline" class="w-full justify-between font-normal text-sm px-2 select-none">
                <div v-if="modelValue?.length" class="flex items-center flex-wrap">
                    <Badge v-for="value, index in modelValue" :key="value" class="mr-1 flex items-center gap-1">
                        {{
                            options.find((option) => option.value === value)?.label
                        }}

                        <X class="w-3 h-3" @click="(e) => {
                            e.stopPropagation()
                            handleRemove(index)
                        }" />
                    </Badge>
                </div>
                <template v-else>
                    {{
                        props.placeholder || 'Select an option'
                    }}
                </template>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="p-2" :style="{
            width: 'var(--radix-popover-trigger-width)'
        }">
            <div v-if="props.options.length">
                <div v-for="option in props.options" :key="option.value"
                    class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    @click="handleSelect(option.value)">
                    <span>
                        {{ option.label }}
                    </span>
                    <div v-show="isActive(option.value)"
                        class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                        <Check class="w-4 h-4 " />

                    </div>
                </div>
            </div>
            <span v-else class="flex items-center justify-center w-full">
                >
                Not have any options
            </span>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { Check, X } from 'lucide-vue-next';
import { ref } from 'vue';
import { Badge } from '../badge';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

type Props = {
    options: Array<
        {
            label: string
            value: string
        }
    >
    modelValue?: Array<string>
    defaultValues?: Array<string>
    placeholder?: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: Array<string>): void
}>()

const isOpen = ref(false)

const modelValue = useVModel(props, 'modelValue', emits, {
    defaultValue: props.defaultValues || [],
})

const handleRemove = (index: number) => {
    if (modelValue.value) {
        modelValue.value = modelValue.value.filter((_, i) => i !== index)
    }
}

const handleSelect = (value: string) => {
    if (modelValue.value) {
        if (modelValue.value.includes(value)) {
            modelValue.value = modelValue.value.filter((v) => v !== value)
        } else {
            modelValue.value = [...modelValue.value, value]
        }
    }
}

const isActive = (value: string) => modelValue.value?.includes(value)


</script>

<style scoped></style>