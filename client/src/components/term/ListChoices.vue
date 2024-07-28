<template>
    <div class="space-y-4">
        <div v-for="(choices, part) in groupedChoices" :key="part" class="space-y-1">
            <h3 class="font-semibold">Part {{ part }}</h3>
            <ul class="flex items-center flex-wrap gap-2">
                <li v-for="(choice, index) in choices" :key="choice.question_id">
                    <Button class="p-0 w-7 h-7 text-sm" :variant="choice.choose ? 'default' : 'outline'" @click="emits('navigateToQuestion', {
                        sectionQuestionId: choice.section_question_id,
                        questionId: choice.question_id
                    })">
                        <span v-if="props.originalLocation">
                            {{ choice.location }}
                        </span>
                        <span v-else>
                            {{
                                index + 1
                            }}
                        </span>
                    </Button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TChoice } from '@/types/common';
import { groupBy } from 'lodash';
import { computed } from 'vue';
import { Button } from '../ui/button';

type Props = {
    choices: TChoice[]
    originalLocation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    originalLocation: true
})

const emits = defineEmits<{
    (e: 'navigateToQuestion', {
        sectionQuestionId,
        questionId,
    }: {
        sectionQuestionId: string,
        questionId: string
    }): void
}>()


const groupedChoices = computed(() => {
    return groupBy(props.choices, 'part')
})


</script>

<style scoped></style>