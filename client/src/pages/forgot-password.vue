<template>
    <div class="min-h-svh flex items-center justify-center px-4">
        <div class="w-full max-w-sm flex flex-col gap-4">
            <div class="space-y-2">
                <h2 class="text-2xl font-bold text-center">
                    Forgot your password?
                </h2>
                <p class="text-sm text-muted-foreground text-center">
                    Enter your email to reset your password.
                </p>
            </div>
            <ForgotPasswordForm id="forgot-password-form" />
            <Button form="forgot-password-form" type="submit" duolingo>
                Send Reset Link
            </Button>
            <RouterLink :to="ROUTES.AUTH.LOGIN" :class="buttonVariants({
                variant: 'outline',
            })
                ">
                Back to login
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ForgotPasswordForm } from '@/components/forms'
import { Button, buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { RouterLink } from 'vue-router'
import { definePage } from 'vue-router/auto'


definePage({
    meta: {
        layout: 'Auth',
        isAuthRoute: true,
    },
})
</script>

<style scoped></style>
