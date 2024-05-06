<template>
    <div class="min-h-svh flex items-center justify-center">
        <div class="w-full max-w-sm flex flex-col gap-4">
            <div class="space-y-2">
                <h2 class="text-2xl font-bold text-center">
                    Login to <span class="text-primary"> ELand </span>
                </h2>
                <p class="text-sm text-muted-foreground text-center">
                    Enter your email and password to login to your account.
                </p>
            </div>
            <LoginForm id="login-form" @submit="handleLogin" />
            <Button
                form="login-form"
                type="submit"
                :loading="loginMutation.isPending.value"
            >
                Login
            </Button>

            <div class="text-center text-sm text-muted-foreground">
                Don't have an account?
                <RouterLink to="/register" class="underline">
                    Sign up
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LoginForm } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { useLogin } from '@/hooks/auth'
import type { LoginSchemaType } from '@/validators'
import { definePage } from 'vue-router/auto'

definePage({
    meta: {
        layout: 'Auth',
    },
})

const loginMutation = useLogin()

const handleLogin = (values: LoginSchemaType) => {
    loginMutation.mutate(values)
}
</script>

<style scoped></style>
