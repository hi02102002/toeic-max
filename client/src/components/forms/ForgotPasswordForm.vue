<template>
    <form class="space-y-3" @submit="handleSubmit" :id="props.id">
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel required> Email </FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter your email" v-bind="componentField" />
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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    ForgotPasswordSchema,
    type ForgotPasswordSchemaType,
} from '@/validators'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const props = withDefaults(
    defineProps<{
        id?: 'forgot-password-form'
    }>(),
    {
        id: 'forgot-password-form',
    },
)

const emits = defineEmits({
    submit(_payload: ForgotPasswordSchemaType) { },
})

const form = useForm({
    validationSchema: toTypedSchema(ForgotPasswordSchema),
})

const handleSubmit = form.handleSubmit((values: ForgotPasswordSchemaType) => {
    emits('submit', values)
})
</script>

<style scoped></style>
