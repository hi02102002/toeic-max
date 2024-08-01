<template>
    <div class="flex items-center justify-between sm:flex-row flex-col gap-3">
        <div class="flex items-center gap-3 w-full">
            <Button size="sm" class="min-w-20 w-full sm:w-auto" :disabled="disabled" duolingo
                @click="emits('on-prev-question')">
                Previous
            </Button>
            <Button size="sm" class="min-w-20 w-full sm:w-auto" :disabled="disabled" duolingo
                @click="emits('on-next-question')">
                Next
            </Button>
        </div>
        <div class="flex gap-3 md:flex-row flex-col md:w-auto w-full">
            <div class="flex gap-3">
                <div class="flex items-center gap-3 w-full  sm:justify-end font-medium md:justify-center justify-start">
                    <slot name="question-location" />
                    <slot name="timer" />
                </div>
                <div class="flex gap-3">
                    <slot name="settings" />
                    <slot name="explain" />
                    <Sheet v-model:open="isOpenListChoices">
                        <SheetTrigger as-child>
                            <Button :size="'icon'" variant="outline" class="w-8 h-8 flex-shrink-0" :disabled="disabled"
                                title="List choices" duolingo aria-label="List choices">
                                <LayoutGrid class="w-4 h-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent class="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>
                                    List choices
                                </SheetTitle>
                                <div>
                                    <ListChoices :choices="choices" :original-location="originalLocationListChoices"
                                        @navigate-to-question="handleNavigateToQuestion" />
                                </div>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <AlertDialog>
                <AlertDialogTrigger as-child>
                    <Button v-if="showSubmit" size="sm" class="min-w-20 w-full sm:w-auto" duolingo aria-label="Submit"
                        :disabled="disabled || disabledSubmit">
                        Submit
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to submit?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You can't change your answer after submitting.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel duolingo>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction duolingo @click="emits('on-submit')">
                            Submit
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import type { TChoice } from '@/types/common';
import { useEventListener } from '@vueuse/core';
import { LayoutGrid } from 'lucide-vue-next';
import { ref } from 'vue';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import ListChoices from './ListChoices.vue';

type Props = {
    disabled?: boolean;
    choices: TChoice[]
    originalLocationListChoices?: boolean
    disabledSubmit?: boolean
    showSubmit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    originalLocationListChoices: true,
    disabledSubmit: false
});

const isOpenListChoices = ref(false);

const emits = defineEmits<{
    (e: 'on-prev-question'): void
    (e: 'on-next-question'): void
    (e: 'on-submit'): void
    (e: 'on-navigate-to-question', opts: {
        sectionQuestionId: string;
        questionId: string;
    }): void
}>()

const handleNavigateToQuestion = (
    opts: {
        sectionQuestionId: string;
        questionId: string;
    }
) => {
    emits('on-navigate-to-question', opts);

    isOpenListChoices.value = false;
}

useEventListener('keydown', (e) => {
    if (props.disabled) return

    if (e.key === 'ArrowRight') {
        emits('on-next-question')
    }

    if (e.key === 'ArrowLeft') {
        emits('on-prev-question')
    }
})


</script>

<style scoped></style>