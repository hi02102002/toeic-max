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
                    <Input type="text" placeholder="Enter year" v-bind="componentField" disabled />
                </FormControl>
                <FormMessage />
            </FormItem>

        </FormField>
        <FormField v-slot="{ componentField }" name="kit_id" :validate-on-blur="false">
            <FormItem>
                <FormLabel required>
                    Kit
                </FormLabel>
                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select kit" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="option in options" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
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
import { useForSelectKit } from '@/hooks/kit';
import { KitTestInputSchema, type KitTestInputSchemaType } from '@/validators/kit-test';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { watch } from 'vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
const props = withDefaults(
    defineProps<{
        id?: 'kit-test-form'
        defaultValues?: KitTestInputSchemaType
    }>(),
    {
        id: 'kit-test-form',
        defaultValues: undefined
    },
)

const { data: options } = useForSelectKit()


const emits = defineEmits({
    submit(_payload: KitTestInputSchemaType) { },
})


const form = useForm({
    validationSchema: toTypedSchema(KitTestInputSchema),
    initialValues: props.defaultValues,
})

const { value: kit_id } = useField<string>('kit_id', {}, {
    form,
})

const handleSubmit = form.handleSubmit((values: KitTestInputSchemaType) => {
    emits('submit', values)
})

watch(kit_id, (newValue) => {
    const kit = options.value.find((option) => option.value === newValue)

    if (kit) {
        const kitSplitted = kit.label.split(' ')

        const year = Number(kitSplitted[kitSplitted.length - 1])

        form.setValues({ year })
    }
})

</script>

<style scoped></style>
