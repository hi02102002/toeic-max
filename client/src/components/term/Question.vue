<template>
    <div class="space-y-2 select-none">
        <span class="font-medium">
            {{ formatQuestionLocation(
                props.question.location,
                props.question.q,
                props.index
            ) }}
        </span>
        <RadioGroup v-model:model-value="choose">
            <template v-for="(value, key) in question.opts" :key="key + question.id">
                <Button variant="ghost" :class="cn('p-1 h-auto justify-start cursor-pointer border-transparent border', {
                    'text-destructive border-destructive hover:text-destructive border': isIncorrect(key),
                    'border border-primary': isCorrect(key) || isDefaultAnswer(key),

                })">
                    <RadioGroupItem :id="`question-${question.id}-choice-${key}`" :value="key"
                        :disabled="props.disabled || choose !== ''" :class="cn({
                            'text-destructive border-destructive': isIncorrect(key),
                        })" :is-failed="isIncorrect(key)">
                        {{ key }}
                    </RadioGroupItem>
                    <Label :for="`question-${question.id}-choice-${key}`"
                        class="flex-1 text-start cursor-pointer pl-2 block text-wrap leading-5">
                        {{ key.toUpperCase() }}.
                        <template v-if="!PART_NOT_RENDER_OPTS_VAL.includes(question.p)">
                            {{ value }}
                        </template>
                    </Label>
                </Button>
            </template>
        </RadioGroup>
    </div>
</template>

<script setup lang="ts">
import type { TChoice } from '@/types/common';
import type { TQuestion } from '@/types/question';
import { cn } from '@/utils';
import { formatQuestionLocation } from '@/utils/section-question';
import { computed, ref, watch } from 'vue';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const PART_NOT_RENDER_OPTS_VAL = [1, 2, 3]

const choose = ref<string>('')

type Props = {
    question: TQuestion
    disabled?: boolean
    showIsCorrect?: boolean
    index: number
    choices?: TChoice[]
}

const props = defineProps<Props>()


const emits = defineEmits<{
    (event: 'choose', choice: TChoice): void
}>()

const chooseOfQuestion = computed(() => {
    return props.choices?.find(choice => choice.question_id === props.question.id)
})

const isCorrect = (key: string) => {
    return choose.value && choose.value === key && choose.value === props.question.ans || (
        chooseOfQuestion.value !== undefined && chooseOfQuestion.value.is_correct && chooseOfQuestion.value.choose === key
    )
}

const isIncorrect = (key: string) => {
    return choose.value && choose.value === key && choose.value !== props.question.ans || (
        chooseOfQuestion.value !== undefined && !chooseOfQuestion.value.is_correct && chooseOfQuestion.value.choose === key
    )
}

const isDefaultAnswer = (key: string) => {

    return (choose.value !== ''
        || chooseOfQuestion.value !== undefined
    ) && props.question.ans === key
}


watch(
    choose, (newVal) => {
        if (newVal) {
            emits('choose', {
                is_correct: choose.value === props.question.ans,
                ans: props.question.ans,
                choose: choose.value,
                part: props.question.p,
                question_id: props.question.id,
                section_question_id: props.question.question_section_id,
                location: props.question.location,
            })
        }
    }
)


</script>

<style scoped></style>