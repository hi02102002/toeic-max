<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils';
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue';
import { type HTMLAttributes, computed } from 'vue';

const props = defineProps<
    AlertDialogActionProps & {
        class?: HTMLAttributes['class'],
        duolingo?: boolean,
    }
>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props
    return delegated
})
</script>

<template>
    <AlertDialogAction v-bind="delegatedProps" :class="cn(buttonVariants({
        duolingo,
    }), props.class)">
        <slot />
    </AlertDialogAction>
</template>
