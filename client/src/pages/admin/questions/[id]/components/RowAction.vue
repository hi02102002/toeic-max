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
                router.push(`/admin/questions/${route.params.id}/update`)
            }">
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem @click="isShowConfirm = true">
                Remove
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <Confirm :open="isShowConfirm" text-confirm="Remove" title="Are you sure?"
        description="This action cannot be undone. This will permanently remove this item."
        @cancel="isShowConfirm = false" />
</template>

<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Confirm from '@/components/ui/confirm/Confirm.vue';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-icons/vue';
import { useRouter } from 'vue-router/auto';
import { useRoute } from 'vue-router/auto';
const router = useRouter()

const route = useRoute('/admin/questions/[id]/')

const isShowConfirm = ref(false);


</script>

<style scoped></style>