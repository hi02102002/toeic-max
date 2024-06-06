<template>
    <Dialog v-model:open="model">
        <DialogTrigger as-child>
            <slot />
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Update kit test
                </DialogTitle>
                <DialogDescription>
                    Fill in the form below to update the kit test record.
                </DialogDescription>
            </DialogHeader>
            <KitTestForm :default-values="props.row.original" @submit="handleSubmit" />
            <DialogFooter>
                <Button type="submit" form="kit-test-form" :loading="updateKitTestMutation.isPending.value">
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { KitTestForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUpdateKitTest } from '@/hooks/kit-test';
import type { TTest } from '@/types/test';
import type { KitTestInputSchemaType } from '@/validators/kit-test';
import type { Row } from '@tanstack/vue-table';


type Props = {
    row: Row<TTest>
}

const props = defineProps<Props>()

const model = defineModel('isOpen', {
    type: Boolean,
})

const updateKitTestMutation = useUpdateKitTest()

const handleSubmit = (values: KitTestInputSchemaType) => {
    updateKitTestMutation.mutate({
        id: props.row.original.id,
        data: values,
    })
    model.value = false
}
</script>

<style scoped></style>