<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child>
            <Button size="sm">
                Create test
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Create Test
                </DialogTitle>
                <DialogDescription>
                    Fill in the form below to create a new test
                </DialogDescription>
            </DialogHeader>
            <KitTestForm @submit="handleSubmit" />
            <DialogFooter>
                <Button type="submit" form="kit-test-form">
                    Create
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { KitTestForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCreateKitTest } from '@/hooks/kit-test/use-create-test';
import type { KitTestInputSchemaType } from '@/validators/kit-test';
import { ref } from 'vue';

const isOpen = ref(false)

const createKitTestMutation = useCreateKitTest()

const handleSubmit = (values: KitTestInputSchemaType) => {
    createKitTestMutation.mutate(values)
    isOpen.value = false
}

</script>

<style scoped></style>