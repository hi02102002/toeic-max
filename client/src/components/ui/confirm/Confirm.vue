<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { omit } from 'lodash';
import type { AlertDialogProps } from 'radix-vue';

type ConfirmProps = {
    title: string
    description?: string
    textConfirm?: string
    textCancel?: string
    loading?: boolean
} & AlertDialogProps

const props = withDefaults(defineProps<ConfirmProps>(), {
    title: 'Are you absolutely sure?',
    description: 'This action cannot be undone. This will permanently affect your data.',
    textConfirm: 'Continue',
    textCancel: 'Cancel',
})

const emits = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()

</script>

<template>
    <AlertDialog v-bind="omit(props, ['title', 'description', 'textConfirm', 'textCancel', 'loading'])">
        <AlertDialogTrigger as-child>
            <slot />
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle v-if="props.title">
                    {{ props.title }}
                </AlertDialogTitle>
                <AlertDialogDescription v-if="props.description">
                    {{ props.description }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel :disabled="props.loading" @click="emits('cancel')">
                    {{ props.textCancel }}
                </AlertDialogCancel>
                <AlertDialogAction :loading="props.loading" @click="emits('confirm')">
                    {{ props.textConfirm }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>