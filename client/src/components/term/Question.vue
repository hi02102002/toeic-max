<template>
    <div class="space-y-2 select-none">
        <span class="font-medium">
            {{ questionLocation }}
        </span>
        <RadioGroup v-model:model-value="choose">
            <template v-for="(value, key) in question.opts" :key="key + question.id">
                <Button variant="ghost" :class="cn('p-1 h-auto justify-start cursor-pointer border-transparent border', {
                    'text-destructive border-destructive hover:text-destructive border': choose === question.ans && choose === key,
                    'border border-primary': choose && choose === key && choose !== question.ans,
                })">
                    <RadioGroupItem :id="`question-${question.id}-choice-${key}`" :value="key"
                        :disabled="props.disabled || choose !== ''" :class="cn({
                            'text-destructive border-destructive': choose === question.ans && choose === key,
                        })">
                        {{ key }}
                    </RadioGroupItem>
                    <Label :for="`question-${question.id}-choice-${key}`"
                        class="flex-1 text-start cursor-pointer pl-2 block text-wrap leading-5">
                        {{ key.toUpperCase() }}.
                        <span v-if="!PART_NOT_RENDER_OPTS_VAL.includes(question.p)">
                            {{ value }}
                        </span>
                    </Label>
                </Button>
            </template>
        </RadioGroup>
    </div>
</template>

<script setup lang="ts">
import type { TChoice } from '@/stores/practice-part';
import type { TQuestion } from '@/types/question';
import { cn } from '@/utils';
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
}

const props = defineProps<Props>()

const questionLocation = computed(() => {
    let location = `Question ${props.index + 1}.${props.question.location}.`

    if (props.question.q) {
        location += `${props.question.q?.replace(`${props.question.location}.`,
            '').replace(props.question.location.toString(), '').replace('Question', '')
            }`
    }

    return location
})

const emits = defineEmits<{
    (event: 'choose', choice: TChoice): void
}>()


watch(choose, (newValue) => {
    if (newValue) {
        emits('choose', {
            is_correct: choose.value === props.question.ans,
            ans: props.question.ans,
            choose: choose.value,
            part: props.question.p,
            question_id: props.question.id,
            section_question_id: props.question.question_section_id
        })
    }
})


</script>

<style scoped></style>