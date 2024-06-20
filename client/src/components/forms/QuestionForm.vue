<template>
    <form :id="props.id" class="space-y-3" @submit="handleSubmit">
        <FormField v-slot="{ componentField }" name="q">
            <FormItem>
                <FormLabel>
                    Question
                </FormLabel>
                <FormControl>
                    <Input v-bind="componentField" placeholder="Enter question" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="location">
            <FormItem>
                <FormLabel required>
                    Location
                </FormLabel>
                <FormControl>
                    <Input v-bind="componentField" placeholder="Enter question location" type="number" disabled />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="opts.a">
            <FormItem>
                <FormLabel required>
                    Option A
                </FormLabel>
                <FormControl>
                    <Input v-bind="componentField" placeholder="Enter question location" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="opts.b">
            <FormItem>
                <FormLabel required>
                    Option B
                </FormLabel>
                <FormControl>
                    <Input v-bind="componentField" placeholder="Enter question location" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="opts.c">
            <FormItem>
                <FormLabel required>
                    Option C
                </FormLabel>
                <FormControl>
                    <Input v-bind="componentField" placeholder="Enter question location" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-if="props.defaultValue?.p !== PART2" v-slot="{ componentField }" name="opts.d">
            <FormItem>
                <FormLabel required>
                    Option D
                </FormLabel>
                <FormControl>
                    <Input v-bind="componentField" placeholder="Enter question location" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="ans">
            <FormItem>
                <FormLabel required>
                    Answer
                </FormLabel>
                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select answer" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="ans in answers" :key="ans" :value="ans">
                                {{ ans.toUpperCase() }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="trans.vi">
            <FormItem>
                <FormLabel>
                    Explanation
                </FormLabel>
                <FormControl>
                    <Textarea v-bind="componentField" placeholder="Enter question explanation" rows="10" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

    </form>
</template>

<script setup lang="ts">
import { QuestionSchema, type QuestionSchemaType } from '@/validators/question-section';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref, watchEffect } from 'vue';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const PART2 = 2
const answers = ref(['a', 'b', 'c', 'd'])

const props = withDefaults(
    defineProps<{
        id?: 'question-form'
        defaultValue?: QuestionSchemaType

    }>(),
    {
        id: 'question-form',
        defaultValue: undefined
    },
)

const emits = defineEmits({
    submit(_payload: QuestionSchemaType) { },
})

const form = useForm({
    validationSchema: toTypedSchema(QuestionSchema),
    initialValues: props.defaultValue,
})

const handleSubmit = form.handleSubmit((data) => {
    emits('submit', data)
})

watchEffect(() => {


    if (props.defaultValue?.p === PART2) {
        answers.value = answers.value.filter((ans) => ans !== 'd')
    }
})


</script>

<style scoped></style>