<template>
    <div class="space-y-3 max-w-2xl w-full mx-auto">
        <VocabularyForm @submit="handleSubmit" />
        <div class="flex items-center justify-end">
            <Button type="submit" form="vocab-form">
                Create Vocabulary
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { VocabularyForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { useCreateVocabulary } from '@/hooks/vocabulary';
import { definePage, useRouter } from 'vue-router/auto';
const router = useRouter()

const createQuestionMutation = useCreateVocabulary({
    onExtraSuccess() {
        router.push(`/admin/vocabularies`)
    },
})

const handleSubmit = (data: any) => {
    createQuestionMutation.mutate({
        data,
    })
}

definePage({
    meta: {
        layout: 'Admin',
        title: "Create Vocabulary",
        roles: ['ADMIN'],
        requiresAuth: true
    },
})
</script>

<style scoped></style>