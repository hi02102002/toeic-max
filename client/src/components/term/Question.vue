<template>
    <div :id="`question-${props.question.id}`" class="space-y-2 select-none">
        <span class="font-medium">
            {{ formatQuestionLocation(
                {
                    location: props.question.location,
                    part: props.question.p,
                    index: props.index,
                    q: props.question.q,
                }
            ) }}
        </span>
        <RadioGroup :model-value="chooseOfQuestion?.choose || choose" :default-value="chooseOfQuestion?.choose"
            @update:model-value="handelChoose">
            <template v-for="(value, key) in question.opts" :key="key + question.id">
                <Button v-if="!(PARTS_RENDER_ONLY_3_OPTS.includes(question.p) && key === 'd')" variant="outline" :class="cn('p-1 h-auto justify-start cursor-pointer ',
                    props.showIsCorrect && {
                        'text-destructive border-destructive hover:text-destructive': isIncorrect(key),
                        'border-primary': (isCorrect(key) || isDefaultAnswer(key)) && props.showIsCorrect,
                    }
                )" duolingo>
                    <RadioGroupItem :id="`question-${question.id}-choice-${key}`" :value="key" :disabled="props.showIsCorrect && (props.disabled || choose !== '')
                        " :class="cn(
                            props.showIsCorrect && {
                                'text-destructive border-destructive': isIncorrect(key),
                            }
                        )">
                        {{ key }}
                    </RadioGroupItem>
                    <Label :for="`question-${question.id}-choice-${key}`"
                        class="flex-1 text-start cursor-pointer pl-2 block text-wrap leading-5">
                        {{ key.toUpperCase() }}.
                        <template v-if="!PARTS_NOT_RENDER_OPTS_VAL.includes(question.p)">
                            {{ value }}
                        </template>
                    </Label>
                </Button>
            </template>
        </RadioGroup>
    </div>
</template>

<script setup lang="ts">
import { PARTS_NOT_RENDER_OPTS_VAL, PARTS_RENDER_ONLY_3_OPTS } from '@/constants';
import type { TChoice } from '@/types/common';
import type { TQuestion } from '@/types/question';
import { cn } from '@/utils';
import { formatQuestionLocation } from '@/utils/section-question';
import { computed, ref } from 'vue';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';


const choose = ref<string>('')

type Props = {
    question: TQuestion
    disabled?: boolean
    showIsCorrect?: boolean
    index: number
    choices?: TChoice[]
    isForReview?: boolean
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
        chooseOfQuestion.value !== undefined && chooseOfQuestion.value.choose && chooseOfQuestion.value.is_correct && chooseOfQuestion.value.choose === key
    )
}

const isIncorrect = (key: string) => {
    return choose.value && choose.value === key && choose.value !== props.question.ans || (
        chooseOfQuestion.value !== undefined && !chooseOfQuestion.value.is_correct && chooseOfQuestion.value.choose === key
    )
}

const isDefaultAnswer = (key: string) => {
    return (choose.value !== ''
        || chooseOfQuestion.value !== undefined && chooseOfQuestion.value.choose !== '' || props.isForReview
    ) && props.question.ans === key
}

const handelChoose = (value: string) => {
    if (props.disabled) return

    choose.value = value

    emits('choose', {
        is_correct: value === props.question.ans,
        ans: props.question.ans,
        choose: value,
        part: props.question.p,
        question_id: props.question.id,
        section_question_id: props.question.question_section_id,
        location: props.question.location,
    })
}


</script>

<style scoped></style>