<template>
    <TableBuilder :columns="cols" :query-key="API_ENDPOINTS.KIT_TESTS.INDEX" :api-action="kitTestApi.getPaginate"
        :query="query">
        <template #extra-button>
            <CreateDialog />
        </template>
        <template #extra-filter>
            <Select :model-value="query.kit_id" @update:model-value="handleChangeKit">
                <SelectTrigger class="w-[180px] h-8">
                    <SelectValue placeholder="Select a kit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>
                            Kits
                        </SelectLabel>
                        <SelectItem :value="NOT_CHOOSE">
                            All
                        </SelectItem>
                        <SelectItem v-for="option in options" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

        </template>
    </TableBuilder>
</template>

<script setup lang="ts">
import { kitTestApi } from '@/apis/kit-test.api';
import { TableHeader } from '@/components/ui/data-table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableBuilder } from '@/components/ui/table-builder';
import { API_ENDPOINTS, NOT_CHOOSE } from '@/constants';
import { useKitsForSelect } from '@/hooks/kit';
import type { TTest } from '@/types/test';
import type { ColumnDef } from '@tanstack/vue-table';
import { useTitle, useUrlSearchParams } from '@vueuse/core';
import { h, reactive, watch } from 'vue';
import { definePage } from 'vue-router/auto';
import { CreateDialog } from './components';

const query = reactive({
    kit_id: ''
})

const params = useUrlSearchParams<Record<string, any>>('history')


const { data: options } = useKitsForSelect()


const cols: ColumnDef<TTest>[] = [
    {
        accessorKey: 'name',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Name',
                column,
            })
        },
    },
    {
        accessorKey: 'slug',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Slug',
                column,
            })
        },
    },
    {
        accessorKey: 'year',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Year',
                column
            })
        },
    },
]

const handleChangeKit = (value: string) => {
    if (value === NOT_CHOOSE) {
        query.kit_id = ''
    } else {
        query.kit_id = value
    }
}

watch(() => query.kit_id, (value) => {
    if (value.trim() !== '') {
        params.kit_id = value
    } else {
        params.kit_id = undefined
    }
})

watch(params, (value) => {
    if (value.kit_id) {
        query.kit_id = value.kit_id
    }
}, { immediate: true, deep: true })


useTitle('Manage Tests | ELand')

definePage({
    meta: {
        layout: 'Admin',
        title: 'Manage Tests'
    }
})

</script>

<style scoped></style>