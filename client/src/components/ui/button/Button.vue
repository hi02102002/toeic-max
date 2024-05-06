<script setup lang="ts">
import { cn } from '@/utils'
import { IconLoader2 } from '@iconify-prerendered/vue-lucide'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: HTMLAttributes['class']
    loading?: boolean | undefined
    disabled?: boolean | undefined
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
})
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn(buttonVariants({ variant, size }), props.class)"
        :disabled="props.loading || props.disabled"
    >
        <IconLoader2 v-if="props.loading" class="animate-spin h-4 w-4 mr-2" />
        <slot />
    </Primitive>
</template>
