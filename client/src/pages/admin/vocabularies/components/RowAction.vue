<template>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant="outline" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                <DotsHorizontalIcon class="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem @click="() => {
                router.push(`/admin/vocabularies/${props.row.original.id}/update`)
            }">
                Update
            </DropdownMenuItem>
            <DropdownMenuItem @click="isShowConfirm = true">
                Remove
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <Confirm :open="isShowConfirm" text-confirm="Remove" title="Are you sure?"
        description="This action cannot be undone. This will permanently remove this item."
        @cancel="isShowConfirm = false" @confirm="() => {
            deleteVocabularyMutation.mutate(props.row.original.id)
        }" />
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import Confirm from '@/components/ui/confirm/Confirm.vue';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteVocabulary } from '@/hooks/vocabulary';
import type { TVocabulary } from '@/types/vocabulary';
import { DotsHorizontalIcon } from '@radix-icons/vue';
import type { Row } from '@tanstack/vue-table';
import { ref } from 'vue';
import { useRouter } from 'vue-router/auto';
const router = useRouter()

type RowActionProps = {
    row: Row<TVocabulary>
}

const props = defineProps<RowActionProps>()

const isShowConfirm = ref(false);

const deleteVocabularyMutation = useDeleteVocabulary({
    onExtraSuccess() {
        isShowConfirm.value = false
    },
})


</script>

<style scoped></style>