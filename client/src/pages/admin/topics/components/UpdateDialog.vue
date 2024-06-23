<template>
    <Dialog v-model:open="model">
        <DialogTrigger as-child>
            <slot />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Update topic
                </DialogTitle>
                <DialogDescription>
                    Fill in the form below to update the topic record
                </DialogDescription>
            </DialogHeader>
            <TopicForm :default-values="{
                name: props.row.original.name,
                parent_id: props.row.original.parent_id
            }" type="update" @submit="handleSubmit" />
            <DialogFooter>
                <Button type="submit" form="topic-form" :loading="updateTopicMutation.isPending.value">
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { TopicForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUpdateTopic } from '@/hooks/topic';
import type { TTopic } from '@/types/topic';
import type { TInputTopicSchemaType } from '@/validators/topic';
import type { Row } from '@tanstack/vue-table';

type Props = {
    row: Row<TTopic>
}

const props = defineProps<Props>()

const model = defineModel('isOpen', {
    type: Boolean,
})

const updateTopicMutation = useUpdateTopic()

const handleSubmit = (values: TInputTopicSchemaType) => {
    updateTopicMutation.mutate({
        id: props.row.original.id,
        data: values,
    })
    model.value = false
}

</script>

<style scoped></style>