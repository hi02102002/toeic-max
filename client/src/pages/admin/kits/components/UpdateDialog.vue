<template>
    <Dialog v-model:open="model">
        <DialogTrigger as-child>
            <slot />
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Update kit
                </DialogTitle>
                <DialogDescription>
                    Fill in the form below to update the kit record.
                </DialogDescription>
            </DialogHeader>
            <KitForm :default-values="props.row.original" @submit="handleSubmit" />
            <DialogFooter>
                <Button type="submit" form="kit-form" :loading="updateKitMutation.isPending.value">
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { KitForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUpdateKit } from '@/hooks/kit';
import type { TKit } from '@/types/kit';
import type { KitInputSchemaType } from '@/validators/kit';
import type { Row } from '@tanstack/vue-table';

type Props = {
    row: Row<TKit>
}

const props = defineProps<Props>()

const model = defineModel('isOpen', {
    type: Boolean,
})

const updateKitMutation = useUpdateKit()

const handleSubmit = (values: KitInputSchemaType) => {
    updateKitMutation.mutate({
        id: props.row.original.id,
        data: values,
    })
    model.value = false
}

</script>

<style scoped></style>