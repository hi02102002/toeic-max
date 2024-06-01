<template>
    <DataTable :columns="props.columns" :sorting="sorting" :pagination="pagination" :items="data?.items || []"
        :loading="isLoading" :page-count="calcPageCount(
            data?.total || 0, pagination.pageSize || 10
        )" @sorting-change="handleSortingChange" @pagination-change="handlePaginationChange">
        <template #toolbar="toolbarProps">
            <Toolbar :table="toolbarProps.table">
                <template #search>
                    <div class="flex items-center gap-3">
                        <Input :model-value="search" placeholder="Search..." class="h-8"
                            @update:model-value="handleSearchChange" />
                        <Button v-if="search?.trim()?.length > 0" variant="outline" size="icon"
                            class="flex-shrink-0 h-8 w-8" @click="handleClear">
                            <XIcon class="w-4 h-4" />
                        </Button>
                    </div>
                </template>
                <template #extra-filter>
                    <slot name="extra-filter" />
                </template>
                <template #extra-button>
                    <slot name="extra-button" />
                </template>
            </Toolbar>
        </template>

    </DataTable>
</template>

<script setup lang="ts" generic="T extends Record<string,unknown>">
import type { TBaseQueryParams, TPaginateResponse } from '@/types/common';
import { calcPageCount, valueUpdater } from '@/utils';
import { useQuery } from '@tanstack/vue-query';
import type { ColumnDef, OnChangeFn, PaginationState, SortingState } from '@tanstack/vue-table';
import { useUrlSearchParams, watchDebounced } from '@vueuse/core';
import { XIcon } from 'lucide-vue-next';
import { defineProps, ref, watch } from 'vue';
import { Button } from '../button';
import { DataTable } from '../data-table';
import { Input } from '../input';
import Toolbar from './Toolbar.vue';

type Props = {
    queryKey: string
    columns: ColumnDef<T, unknown>[]
    apiAction: (params: TBaseQueryParams) => Promise<TPaginateResponse<T>>
    query?: Record<string, unknown>
}

const props = defineProps<Props>()


const params = useUrlSearchParams<Record<string, any>>('history', {
    initialValue: {
        orderBy: undefined,
        asc: undefined,
        page: 1,
        limit: 10,
        q: ''
    },

})


const { data, isLoading } = useQuery({
    queryKey: [props.queryKey, params],
    queryFn: () => props.apiAction(params).then((res) => res.data)
})


const sorting = ref<SortingState>([])
const pagination = ref<PaginationState>({
    pageIndex: 0,
    pageSize: 10
})

const search = ref<string>('')

const handleClear = () => {
    search.value = ''
}

const handleSearchChange = (value: string | number) => {
    if (typeof value === 'string') {
        search.value = value
    } else {
        search.value = `${value}`
    }
}


const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => valueUpdater(updaterOrValue, sorting)

const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => valueUpdater(updaterOrValue, pagination)


watch(sorting, (value) => {
    const [{ desc, id }] = value
    params.orderBy = id
    params.asc = desc === true ? false : true
})

watch(pagination, (value) => {
    const { pageIndex, pageSize } = value

    params.page = Number(pageIndex) + 1
    params.limit = Number(pageSize || 10)
})

watch(() => props.query, (newValue) => {
    if (!newValue) return;

    for (const [key, value] of Object.entries(newValue)) {
        if (!value) {
            params[key] = undefined
        } else {
            params[key] = value
        }
    }
}, { immediate: true, deep: true });


watch(params, (value) => {
    pagination.value.pageIndex = value.page ? Number(value.page) - 1 : 0
    pagination.value.pageSize = value.limit ? Number(value.limit) : 10

    if (sorting.value.length === 0) {
        sorting.value.push({
            id: value.orderBy || '',
            desc: value.asc === false ? true : false
        })
    } else {
        sorting.value[0].id = value.orderBy || ''
        sorting.value[0].desc = value.asc === false ? true : false

    }

    search.value = value.q || ''
}, { immediate: true, deep: true })


watchDebounced(
    search, (value) => {
        params.q = value
    }, {
    debounce: 800,
}
)


</script>

<style scoped></style>