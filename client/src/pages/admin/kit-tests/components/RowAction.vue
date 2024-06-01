<template>
    <div class="flex items-center gap-2">
        <UpdateDialog>
            <Button class="p-0 w-8 h-8" variant="outline">
                <Pencil class="w-4 h-4 flex-shrink-0" />
            </Button>
        </UpdateDialog>
        <Button class="p-0 w-8 h-8" variant="destructive">
            <Trash2 class="w-4 h-4 flex-shrink-0" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-vue-next';
import UpdateDialog from './UpdateDialog.vue';


</script>

<style scoped></style>