<template>
    <form :id="props.id" class="space-y-3" @submit="handleSubmit">
        <FormField v-slot="{ componentField }" name="image">
            <FormItem>
                <FormLabel required>
                    Image
                </FormLabel>
                <FormControl>
                    <InputImage v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="name">
            <FormItem>
                <FormLabel required>
                    Name
                </FormLabel>
                <FormControl>
                    <Input v-bind="componentField" placeholder="Enter name of vocabulary" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="spelling">
            <FormItem>
                <FormLabel required>
                    Spelling
                </FormLabel>
                <FormControl>
                    <Input v-bind="componentField" placeholder="Enter spelling" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="meaning">
            <FormItem>
                <FormLabel required>
                    Meaning
                </FormLabel>
                <FormControl>
                    <Textarea v-bind="componentField" placeholder="Enter meaning" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="example">
            <FormItem>
                <FormLabel>
                    Example
                </FormLabel>
                <FormControl>
                    <Textarea v-bind="componentField" placeholder="Enter exmaple" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="type">
            <FormItem>
                <FormLabel required>
                    Type
                </FormLabel>
                <FormControl>
                    <MultipleSelect placeholder="Select a type of vocabulary" :options="VOCABULARY_TYPES"
                        :model-value="componentField.modelValue?.split(',').filter(Boolean)" @update:model-value="(value) => {
                            componentField['onUpdate:modelValue']?.(value.join(','))
                        }" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="category">
            <FormItem>
                <FormLabel required>
                    Category
                </FormLabel>
                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category of vocabulary" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="option in VOCABULARY_CATEGORY" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="topicId">
            <FormItem>
                <FormLabel required>
                    Topic
                </FormLabel>
                <FormControl>
                    <div>
                        <TreeSelect v-bind="componentField" :options="tree" placeholder="Select a topic of vocabulary"
                            :only-select-child="true" />
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

    </form>
</template>

<script setup lang="ts">
import { VOCABULARY_CATEGORY, VOCABULARY_TYPES } from '@/constants';
import { useTreeSelect } from '@/hooks/topic';
import { InputVocabularySchema, type TInputVocabularySchemaType } from '@/validators';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { InputImage } from '../ui/input-image';
import { MultipleSelect } from '../ui/mutiple-select';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { TreeSelect } from '../ui/tree-select';


const props = withDefaults(
    defineProps<{
        id?: 'vocab-form'
        defaultValue?: TInputVocabularySchemaType

    }>(),
    {
        id: 'vocab-form',
        defaultValue: undefined
    },
)

const emits = defineEmits({
    submit(_payload: TInputVocabularySchemaType) { },
})

const form = useForm({
    validationSchema: toTypedSchema(InputVocabularySchema),
    initialValues: props.defaultValue,
})

const { data: tree } = useTreeSelect()

const handleSubmit = form.handleSubmit((data) => {
    emits('submit', data)
})

console.log(form.errors.value)

</script>

<style scoped></style>