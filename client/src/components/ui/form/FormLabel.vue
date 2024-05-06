<script lang="ts" setup>
import { Label } from '@/components/ui/label'
import { cn } from '@/utils'
import type { LabelProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { useFormField } from './useFormField'

const props = defineProps<
    LabelProps & { class?: HTMLAttributes['class']; required?: boolean }
>()

const { formItemId } = useFormField()
</script>

<template>
    <Label
        :class="
            cn(
                props.class,
                props.required &&
                    `after:content-['*'] after:text-destructive after:ml-1`,
            )
        "
        :for="formItemId"
    >
        <slot />
    </Label>
</template>
