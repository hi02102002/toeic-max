<template>
    <div class="min-h-svh flex items-center justify-center">
        <div class="w-full max-w-sm flex flex-col gap-4">
            <div class="space-y-2">
                <h2 class="text-2xl font-bold text-center">
                    Create an account?
                </h2>
                <p class="text-sm text-muted-foreground text-center">
                    Enter your information to create an account.
                </p>
            </div>
            <RegisterForm :id="'register-form'" @submit="registerMutation.mutate" />
            <Button form="register-form" type="submit" :loading="registerMutation.isPending.value">
                Create account
            </Button>

            <div class="text-center text-sm text-muted-foreground">
                Already have an account?
                <RouterLink :to="ROUTES.AUTH.LOGIN" class="underline">
                    Login
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RegisterForm } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { useRegister } from '@/hooks/auth'
import { definePage } from 'vue-router/auto'

definePage({
    meta: {
        layout: 'Auth',
        isAuthRoute: true,
    },
})

const registerMutation = useRegister()
</script>

<style scoped></style>
