<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child>
            <Button size="sm">
                Create Topic
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-3xl">
            <DialogHeader>
                <DialogTitle>
                    Create new topic
                </DialogTitle>
                <DialogDescription>
                    Fill in the form below to create a new topic record.
                </DialogDescription>
            </DialogHeader>
            <TopicForm @submit="handleSubmit" />
            <DialogFooter>
                <Button type="submit" form="topic-form">
                    Create
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { TopicForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCreateTopic } from '@/hooks/topic';
import type { TInputTopicSchemaType } from '@/validators/topic';
import { ref } from 'vue';

const isOpen = ref(false)

const createTopicMutation = useCreateTopic()

const handleSubmit = (values: TInputTopicSchemaType) => {
    createTopicMutation.mutate({
        data: values,

    })
    isOpen.value = false
}

</script>

<style scoped></style>