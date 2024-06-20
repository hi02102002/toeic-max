<template>
    <div v-if="isLoading" class="flex items-center justify-center">
        <Loader2 class="animate-spin" />
    </div>
    <div v-else class="space-y-3 max-w-2xl w-full mx-auto">
        <QuestionSectionForm :default-values="{
            location: data?.location || '',
            teaser: {
                text: data?.teaser?.text || '',
                trans: {
                    vi: data?.teaser?.trans?.vi || data?.teaser?.tran?.vi || '',
                },
            },
            questions: data?.questions || [],
            part: data?.part.toString() as unknown as number,
            test_kit_id: data?.test_kit_id || '',
            audio_url: data?.audio_url || '',
            image_urls: data?.image_urls || [],
        }" @submit="handleSubmit" />
        <div class="flex items-center justify-end">
            <Button type="submit" form="question-section-form">
                Save changes
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { QuestionSectionForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { useSectionQuestion, useUpdateSectionQuestion } from '@/hooks/section-question';
import type { QuestionSectionSchemaType } from '@/validators/question-section';
import { Loader2 } from 'lucide-vue-next';
import { definePage, useRoute, useRouter } from 'vue-router/auto';

const { params } = useRoute('/admin/questions/[id]/')
const router = useRouter()

const { data, isLoading } = useSectionQuestion(params.id)

const updateQuestionMutation = useUpdateSectionQuestion({
    onExtraSuccess(res) {
        router.push(`/admin/questions/${res.data.id}`)

    },
})

const handleSubmit = (data: QuestionSectionSchemaType) => {
    updateQuestionMutation.mutate({
        id: params.id,
        data,
    })
}

definePage({
    meta: {
        layout: 'Admin',
        title: "Update Question",
        roles: ['ADMIN'],
        requiresAuth: true
    },
})
</script>

<style scoped></style>