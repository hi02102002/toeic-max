<template>
    <div class="space-y-3 max-w-2xl w-full mx-auto">
        <QuestionSectionForm @submit="handleSubmit" />
        <div class="flex items-center justify-end">
            <Button type="submit" form="question-section-form">
                Create Question
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { QuestionSectionForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { useCreateSectionQuestion } from '@/hooks/section-question';
import { definePage, useRouter } from 'vue-router/auto';
const router = useRouter()

const createQuestionMutation = useCreateSectionQuestion({
    onExtraSuccess(res) {
        router.push(`/admin/questions/${res.data.id}`)
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
        title: "Create Question",
        roles: ['ADMIN'],
        requiresAuth: true
    },
})
</script>

<style scoped></style>