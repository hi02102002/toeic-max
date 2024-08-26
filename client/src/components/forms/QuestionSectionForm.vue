<template>
    <form :id="props.id" class="space-y-3" @submit="handleSubmit">
        <FormField v-slot="{ componentField }" name="test_kit_id">
            <FormItem>
                <FormLabel required>
                    Kit test
                </FormLabel>
                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a test kit" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="test in kitTests" :key="test.value" :value="test.value">
                                {{ test.label }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="part">
            <FormItem>
                <FormLabel required>
                    Part
                </FormLabel>
                <Select v-bind="componentField"
                    :model-value="typeof componentField.modelValue === 'string' ? componentField.modelValue : `${componentField.modelValue}`">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a part of question" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="part in PARTS" :key="part.value" :value="part.value">
                                {{ part.label }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="location">
            <FormItem>
                <FormLabel required>
                    Location
                </FormLabel>
                <FormControl>
                    <Input v-bind="componentField" placeholder="Enter question location" />
                </FormControl>
                <FormDescription>
                    The location must be in range 1-200 (eg. 1 or 1-10 or 1-200)
                </FormDescription>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-if="PART_TO_RENDER_AUDIO.includes(Number(part))" v-slot="{ componentField }" name="audioUrl">
            <FormItem>
                <FormLabel :required="PART_TO_RENDER_AUDIO.includes(Number(part))">
                    Audio
                </FormLabel>
                <FormControl>
                    <InputAudio v-bind="componentField" placeholder="Enter question audio url" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-if="PART_TO_RENDER_IMAGE.includes(Number(part))" v-slot="{ componentField }" name="imageUrls">
            <FormItem>
                <FormLabel :required="PART_TO_RENDER_IMAGE.includes(Number(part))">
                    Image Urls
                </FormLabel>
                <FormControl>
                    <InputImage is-multiple :limit="1" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-if="PARTS_TO_RENDER_EDITOR.includes(Number(part))" v-slot="{ componentField }" name="teaser.text">
            <FormItem>
                <FormLabel>
                    Teaser
                </FormLabel>
                <FormControl>
                    <Editor placeholder="Enter content" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-if="PARTS_TO_RENDER_EDITOR.includes(Number(part))" v-slot="{ componentField }"
            name="teaser.trans.vi">
            <FormItem>
                <FormLabel>
                    Translation
                </FormLabel>
                <FormControl>
                    <Editor placeholder="Enter content" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>


        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <Label>
                    Questions
                </Label>

            </div>
            <ul class="space-y-3">
                <li v-for="question in questions" :key="question.location">
                    <Dialog :open="Boolean(
                        openEditQuestion === question.location
                    )" @update:open="(value) => {
                        openEditQuestion = value ? question.location as number : null
                    }">
                        <DialogTrigger as-child>
                            <Button variant="outline" class="w-full justify-between" type="button">
                                <p>
                                    Question {{ question.location }} - Part {{ question.p }}
                                    <span v-if="question.q">
                                        {{ question.q }}
                                    </span>
                                </p>
                                <Pencil class="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="h-[90dvh] p-0">
                            <DialogHeader class="p-6 pb-0">
                                <DialogTitle>
                                    Add question
                                </DialogTitle>
                                <DialogDescription>
                                    Enter fields to add a question to this section.
                                </DialogDescription>
                            </DialogHeader>
                            <ScrollArea class="py-4 px-6 overflow-x-auto">
                                <div class="p-[1px]">
                                    <QuestionForm :default-value="question" @submit="handleEditQuestion" />
                                </div>
                            </ScrollArea>

                            <DialogFooter class="p-6 pt-0">
                                <Button type="submit" form="question-form">
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </li>
            </ul>
            <p v-if="form.errors.value['questions'] && form.errors.value['questions'].length && (questions.length > 0)"
                class="text-[0.8rem] font-medium text-destructive">
                Make sure all fields in the question are filled.
            </p>
        </div>
    </form>
</template>

<script setup lang="ts">
import { PARTS } from '@/constants';
import { useForSelectKitTest } from '@/hooks/kit-test';
import { QuestionSectionSchema, type QuestionSchemaType, type QuestionSectionSchemaType } from '@/validators/question-section';
import { toTypedSchema } from '@vee-validate/zod';
import { Pencil } from 'lucide-vue-next';
import { useFieldValue, useForm } from 'vee-validate';
import { ref, watchEffect } from 'vue';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Editor } from '../ui/editor';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { InputAudio } from '../ui/input-audio';
import { InputImage } from '../ui/input-image';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import QuestionForm from './QuestionForm.vue';

const PARTS_TO_RENDER_EDITOR = [3, 4, 6, 7];
const PART_TO_RENDER_AUDIO = [1, 2, 3, 4]
const PART_TO_RENDER_IMAGE = [1, 6, 7]


const props = withDefaults(
    defineProps<{
        id?: 'question-section-form',
        defaultValues?: QuestionSectionSchemaType,
    }>(),
    {
        id: 'question-section-form',
        defaultValues: undefined,
    },
)


const emits = defineEmits({
    submit(_payload: QuestionSectionSchemaType) { },
})

const form = useForm({
    validationSchema: toTypedSchema(QuestionSectionSchema),
    initialValues: {
        part: props.defaultValues?.part ?? '1' as unknown as number,
        questions: props.defaultValues?.questions || [],
        imageUrls: props.defaultValues?.imageUrls || [],
        audioUrl: props.defaultValues?.audioUrl || '',
        teaser: props.defaultValues?.teaser,
        location: props.defaultValues?.location || '',
        testKitId: props.defaultValues?.testKitId || '',
    }
})


const { data: kitTests } = useForSelectKitTest()
const part = useFieldValue<number>('part')
const location = useFieldValue<string>('location')
const questions = useFieldValue<QuestionSchemaType[]>('questions')
const openEditQuestion = ref<string | number | null>(null)


const handleSubmit = form.handleSubmit((data) => {


    emits('submit', data)
})

const handleEditQuestion = (question: QuestionSchemaType) => {
    form.setFieldValue('questions', questions.value.map((q) => {

        if (q.location === question.location) {
            return {
                ...q,
                ...question
            }
        }

        return q
    }))
    openEditQuestion.value = null
}

watchEffect(() => {

    if (!form.errors.value['questions']) {
        return;
    }


    if (!location.value
    ) {
        form.setFieldValue('questions', [])
        return;
    }

    if (!location.value.includes('-') && !isNaN(Number(location.value))) {
        form.setFieldValue('questions', [{
            location: Number(location.value),
            p: Number(part.value),
            opts: {
                a: '',
                b: '',
                c: '',
                d: '',
            },
            ans: '',
            q: '',
            trans: {
                vi: '',
            },
        }])
    } else {
        const [start, end] = location.value.split('-').map(Number)

        if (start >= end) {
            return;
        }

        const questions = []
        for (let i = start; i <= end; i++) {
            questions.push({
                location: i,
                p: Number(part.value),
                opts: {
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                },
                ans: '',
                q: '',
                trans: {
                    vi: '',
                },
            })
        }

        form.setFieldValue('questions', questions)
    }
})


</script>

<style scoped></style>