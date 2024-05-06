<template>
    <form class="space-y-3" @submit="handleSubmit" :id="props.id">
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel required> Email </FormLabel>
                <FormControl>
                    <Input
                        type="text"
                        placeholder="Enter your email"
                        v-bind="componentField"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <div class="flex items-center justify-between">
                    <FormLabel required> Password </FormLabel>
                    <RouterLink
                        class="text-sm text-muted-foreground hover:underline"
                        :to="ROUTES.AUTH.FORGOT_PASSWORD"
                    >
                        Forgot password?
                    </RouterLink>
                </div>
                <FormControl>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        v-bind="componentField"
                    />
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
import { ROUTES } from '@/constants'
import { LoginSchema, type LoginSchemaType } from '@/validators'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const props = withDefaults(
    defineProps<{
        id?: 'login-form'
    }>(),
    {
        id: 'login-form',
    },
)

const emits = defineEmits({
    submit(payload: LoginSchemaType) {},
})

const form = useForm({
    validationSchema: toTypedSchema(LoginSchema),
})

const handleSubmit = form.handleSubmit((values: LoginSchemaType) => {
    emits('submit', values)
})
</script>

<style scoped></style>
