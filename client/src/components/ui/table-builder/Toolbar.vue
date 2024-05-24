<template>
    <div class="flex items-center gap-3 justify-between">
        <div class="flex items-center gap-3">
            <slot name="search" />
            <slot name="extra-filter" />
        </div>
        <div class="flex items-center gap-3">
            <slot name="extra-button" />
            <TableToggleCol :table="props.table" />
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import type { Table } from '@tanstack/vue-table';
import TableToggleCol from '../data-table/TableToggleCol.vue';

type Props = {
    table: Table<T>
}

const props = defineProps<Props>()

</script>

<style scoped></style>