<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts" generic="T extends Record<string,unknown> = Record<string,unknown>">
import type {
    ColumnDef,
    OnChangeFn,
    PaginationState,
    SortingState,
    TableOptions,
    Updater,
    VisibilityState
} from '@tanstack/vue-table';
import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable
} from '@tanstack/vue-table';

import { valueUpdater } from '@/utils';

import { Loader2 } from 'lucide-vue-next';
import { reactive, ref, watch } from 'vue';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import TablePagination from './TablePagination.vue';


interface DataTableProps {
    columns: ColumnDef<T, unknown>[]
    sorting?: SortingState
    pagination?: PaginationState
    rowCount?: number
    pageCount?: number
    isHasPagination?: boolean;
    items: T[]
    loading?: boolean
}


const props = withDefaults(defineProps<DataTableProps>(), {
    isHasPagination: true
})


const emits = defineEmits<{
    (e: 'sortingChange', updaterOrValue: Updater<SortingState>): OnChangeFn<SortingState>
    (e: 'paginationChange',
        updaterOrValue: Updater<PaginationState>
    ): OnChangeFn<PaginationState>
}>()

const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const pagination = ref<PaginationState>(props.pagination || {
    pageIndex: 0,
    pageSize: 10
})
const sorting = ref<SortingState>(props.sorting || [])

watch(() => props, (value) => {
    if (value.pagination) {
        pagination.value.pageIndex = value.pagination.pageIndex
        pagination.value.pageSize = value.pagination.pageSize
    }

    if (value.sorting && value.sorting.length > 0) {
        sorting.value[0].id = value.sorting[0].id
        sorting.value[0].desc = value.sorting[0].desc
    }


}, { immediate: true, deep: true })

const tableOptions = reactive<TableOptions<T>>({
    get columns() {
        return props.columns
    },
    get data() {
        return props.items
    },
    state: {
        sorting: sorting.value,
        rowSelection: rowSelection.value,
        pagination: pagination.value,
    },
    enableRowSelection: true,
    onSortingChange: (updaterOrValue) => {
        emits('sortingChange', updaterOrValue)
    },
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    onPaginationChange: (updaterOrValue) => {
        emits('paginationChange', updaterOrValue)
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: props.pageCount,
    rowCount: props.rowCount,
})


const table = useVueTable(tableOptions as TableOptions<T>)


</script>

<template>
    <div class="space-y-4">
        <slot name="toolbar" :table="table" />
        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="props.loading">
                        <TableRow>
                            <TableCell :colspan="columns.length" class="h-24 text-center">
                                <div class="flex items-center justify-center">
                                    <Loader2 class="w-6 h-6 animate-spin text-muted-foreground" />
                                </div>
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <template v-if="table.getRowModel().rows?.length">
                            <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                                :data-state="row.getIsSelected() && 'selected'">
                                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                                </TableCell>
                            </TableRow>
                        </template>
                        <TableRow v-else>
                            <TableCell :colspan="columns.length" class="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
        <TablePagination v-if="props.isHasPagination" :table="table" />
    </div>
</template>