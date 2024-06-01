<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child>
            <Button size="sm">
                Create Kit
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Create new kit
                </DialogTitle>
                <DialogDescription>
                    Fill in the form below to create a new kit record.
                </DialogDescription>
            </DialogHeader>
            <KitForm @submit="handleSubmit" />
            <DialogFooter>
                <Button type="submit" form="kit-form">
                    Create
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { KitForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCreateKit } from '@/hooks/kit/use-create-kit';
import type { KitInputSchemaType } from '@/validators/kit';
import { ref } from 'vue';

const isOpen = ref(false)

const createKitMutation = useCreateKit()

const handleSubmit = (values: KitInputSchemaType) => {
    createKitMutation.mutate(values)
    isOpen.value = false
}

</script>

<style scoped></style>