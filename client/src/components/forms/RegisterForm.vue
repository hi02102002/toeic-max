<template>
    <form class="space-y-3" @submit="handleSubmit" :id="props.id">
        <FormField v-slot="{ componentField }" name="name">
            <FormItem>
                <FormLabel required> Name </FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter your name" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel required> Email </FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter your email" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel required> Password </FormLabel>

                <FormControl>
                    <Input type="password" placeholder="Enter your password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="passwordConfirm">
            <FormItem>
                <FormLabel required> Confirm Password </FormLabel>
                <FormControl>
                    <Input type="password" placeholder="Enter your password" v-bind="componentField" />
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
import { RegisterSchema, type RegisterSchemaType } from '@/validators/register'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const props = withDefaults(
    defineProps<{
        id?: 'register-form'
    }>(),
    {
        id: 'register-form',
    },
)

const emits = defineEmits({
    submit(_payload: RegisterSchemaType) { },
})

const form = useForm({
    validationSchema: toTypedSchema(RegisterSchema),
})

const handleSubmit = form.handleSubmit((values: RegisterSchemaType) => {
    emits('submit', values)
})
</script>

<style scoped></style>
