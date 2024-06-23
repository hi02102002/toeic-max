<template>
    <form :id="props.id" class="space-y-3" @submit="handleSubmit">
        <FormField v-slot="{ componentField }" name="name">
            <FormItem>
                <FormLabel required> Name </FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter your name" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-if="props.type === 'create'" v-slot="{ componentField }" name="parent_id">
            <FormItem>
                <FormLabel>
                    Parent
                </FormLabel>
                <FormControl>
                    <div>
                        <TreeSelect v-bind="componentField" :options="tree" placeholder="Select a parent topic" />
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
    </form>
</template>

<script setup lang="ts">
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useTreeSelect } from '@/hooks/topic';
import { InputTopicSchema, type TInputTopicSchemaType } from '@/validators/topic';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { Input } from '../ui/input';
import { TreeSelect } from '../ui/tree-select';

const props = withDefaults(
    defineProps<{
        id?: 'topic-form'
        defaultValues?: TInputTopicSchemaType
        type?: 'update' | 'create'
    }>(),
    {
        id: 'topic-form',
        defaultValues: undefined,
        type: 'create'
    },
)

const emits = defineEmits({
    submit(_payload: TInputTopicSchemaType) { },
})

const form = useForm({
    validationSchema: toTypedSchema(InputTopicSchema),
    initialValues: props.defaultValues
})

const { data: tree } = useTreeSelect()


const handleSubmit = form.handleSubmit((values: TInputTopicSchemaType) => {
    emits('submit', values)
})
</script>

<style scoped></style>
