<template>
    <div v-if="isLoading" class="flex items-center justify-center">
        <Loader2 class="animate-spin" />
    </div>
    <div v-else class="space-y-3 max-w-2xl w-full mx-auto">
        <VocabularyForm :default-value="data" @submit="handleSubmit" />
        <div class="flex items-center justify-end">
            <Button type="submit" form="vocab-form" :loading="updateVocabularyMutation.isPending.value">
                Save changes
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { VocabularyForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { useUpdateVocabulary, useVocabulary } from '@/hooks/vocabulary';
import type { TInputVocabularySchemaType } from '@/validators';
import { Loader2 } from 'lucide-vue-next';
import { definePage, useRoute, useRouter } from 'vue-router/auto';

const { params } = useRoute('/admin/vocabularies/[id]/update')
const router = useRouter()

const { data, isLoading } = useVocabulary(params.id)

const updateVocabularyMutation = useUpdateVocabulary({
    onExtraSuccess() {
        router.push(`/admin/vocabularies`)

    },
})

const handleSubmit = (data: TInputVocabularySchemaType) => {
    updateVocabularyMutation.mutate({
        id: params.id,
        data,
    })
}

definePage({
    meta: {
        layout: 'Admin',
        title: "Update Vocabulary",
        roles: ['ADMIN'],
        requiresAuth: true
    },
})
</script>

<style scoped></style>