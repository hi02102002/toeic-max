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
            <DropdownMenuItem v-if="get(
                props.row.original, 'children_count', 0
            )" @click="() => {
                router.push(`/admin/topics?parent_id=${props.row.original.id}`)

            }">
                View sub topic
            </DropdownMenuItem>
            <DropdownMenuItem @click="() => {
                router.push(`/admin/vocabularies?topic_id=${props.row.original.id}`)
            }">
                View vocabularies
            </DropdownMenuItem>
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
        @cancel="isShowConfirm = false" @confirm="() => {
            deleteTopicMutation.mutate(props.row.original.id)
        }" />
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
import { useDeleteTopic } from '@/hooks/topic';
import type { TTopic } from '@/types/topic';
import { DotsHorizontalIcon } from '@radix-icons/vue';
import type { Row } from '@tanstack/vue-table';
import { get } from 'lodash';
import { ref } from 'vue';
import { useRouter } from 'vue-router/auto';
import UpdateDialog from './UpdateDialog.vue';
const router = useRouter()

type RowActionProps = {
    row: Row<TTopic>
}

const props = defineProps<RowActionProps>()

const isShowConfirm = ref(false);
const isShowUpdateDialog = ref(false)

const deleteTopicMutation = useDeleteTopic({
    onExtraSuccess() {
        isShowConfirm.value = false
    },
})


</script>

<style scoped></style>