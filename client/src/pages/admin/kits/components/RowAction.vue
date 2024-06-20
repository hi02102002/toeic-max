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
            <DropdownMenuItem @click="isShowUpdateDialog = true">
                Update
            </DropdownMenuItem>
            <DropdownMenuItem @click="isShowConfirm = true">
                Remove
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <Confirm :open="isShowConfirm" text-confirm="Remove" title="Are you sure?"
        description="This action cannot be undone. This will permanently remove this item."
        :loading="deleteMutation.isPending.value" @confirm="async () => {
            await deleteMutation.mutateAsync(props.row.original.id);
            isShowConfirm = false;

        }" @cancel="isShowConfirm = false" />
    <UpdateDialog v-model:is-open="isShowUpdateDialog" :row="props.row" />
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
import { useDeleteKit } from '@/hooks/kit';
import type { TKit } from '@/types/kit';
import { DotsHorizontalIcon } from '@radix-icons/vue';
import type { Row } from '@tanstack/vue-table';
import { ref } from 'vue';
import UpdateDialog from './UpdateDialog.vue';

type RowActionProps = {
    row: Row<TKit>
}

const props = defineProps<RowActionProps>()

const isShowConfirm = ref(false);
const isShowUpdateDialog = ref(false);

const deleteMutation = useDeleteKit()


</script>

<style scoped></style>