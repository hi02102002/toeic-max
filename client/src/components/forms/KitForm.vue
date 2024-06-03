<template>
    <form :id="props.id" class="space-y-3" @submit="handleSubmit">
        <FormField v-slot="{ componentField }" name="name" :validate-on-blur="false">
            <FormItem>
                <FormLabel required>
                    Name
                </FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter kit name" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="year" :validate-on-blur="false">
            <FormItem>
                <FormLabel required>
                    Year
                </FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter year" v-bind="componentField" />
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
import { Input } from '@/components/ui/input';
import { KitInputSchema, type KitInputSchemaType } from '@/validators/kit';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
const props = withDefaults(
    defineProps<{
        id?: 'kit-form',
        defaultValues?: KitInputSchemaType,
    }>(),
    {
        id: 'kit-form',
        defaultValues: undefined
    },
)

const emits = defineEmits({
    submit(_payload: KitInputSchemaType) { },
})

const form = useForm({
    validationSchema: toTypedSchema(KitInputSchema),
    initialValues: {
        name: '',
        year: undefined,
        ...props.defaultValues,
    }
})

const handleSubmit = form.handleSubmit((values: KitInputSchemaType) => {
    emits('submit', values)
})
</script>

<style scoped></style>
