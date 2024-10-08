<template>
    <TableBuilder :columns="cols" :query-key="API_ENDPOINTS.KIT_TESTS.INDEX" :api-action="kitTestApi.getPaginate"
        :query="state">
        <template #extra-button>
            <CreateDialog />
        </template>
        <template #extra-filter>
            <Select :model-value="state.kitId" @update:model-value="handleChangeKit">
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
import Badge from '@/components/ui/badge/Badge.vue';
import { TableHeader } from '@/components/ui/data-table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableBuilder } from '@/components/ui/table-builder';
import { API_ENDPOINTS, NOT_CHOOSE } from '@/constants';
import { useForSelectKit } from '@/hooks/kit';
import { useQueryState } from '@/hooks/use-query-state';
import type { TTest } from '@/types/test';
import type { ColumnDef } from '@tanstack/vue-table';
import { useTitle } from '@vueuse/core';
import { get } from 'lodash';
import { h } from 'vue';
import { definePage } from 'vue-router/auto';
import { CreateDialog, RowAction } from './components';

const { state, handleChange } = useQueryState({
    kitId: ''
}
)

const { data: options } = useForSelectKit()


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
    {
        accessorKey: 'kit.name',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Kit',
                column
            })
        },
        cell({ row }) {
            return h(Badge, {

            }, get(row.original, 'kit.name', 'N/A')) || 'N/A'
        }
    },
    {
        accessorKey: 'actions',
        header() {
            return h('div', {
                class: 'text-xs',

            }, 'Actions')
        },
        cell({ row }) {
            return h(RowAction, {
                row
            })
        }
    }
]

const handleChangeKit = (value: string) => {
    handleChange('kitId', value)
}

useTitle('Manage Tests | ELand')

definePage({
    meta: {
        layout: 'Admin',
        title: 'Manage Tests',
        roles: ['ADMIN'],
        requiresAuth: true
    },

})

</script>

<style scoped></style>