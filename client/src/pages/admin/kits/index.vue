<template>
    <TableBuilder :columns="cols" :query-key="'kits'" :api-action="kitApi.getPaginate">
        <template #extra-button>
            <Button size="sm" @click="handleFilter">
                Create Kit
            </Button>
        </template>
        <template #extra-filter>
            Hi
        </template>
    </TableBuilder>
</template>

<script setup lang="ts">
import { kitApi } from '@/apis/kit.api';
import { Button } from '@/components/ui/button';
import { TableHeader } from '@/components/ui/data-table';
import { TableBuilder } from '@/components/ui/table-builder';
import type { TBaseQueryParams } from '@/types/common';
import type { TKit } from '@/types/kit';
import type { ColumnDef } from '@tanstack/vue-table';
import { useTitle, useUrlSearchParams } from '@vueuse/core';
import * as dayFns from 'date-fns';
import { h } from 'vue';
import { definePage } from 'vue-router/auto';
import RowAction from './components/RowAction.vue';

const params = useUrlSearchParams<TBaseQueryParams & {
    hi: string
}>('history',)

const handleFilter = () => {
    params.hi = 'Hello'
}

const cols: ColumnDef<TKit>[] = [
    {
        accessorKey: 'id',
        header({ column }) {
            return h(TableHeader, {
                title: 'Id',
                column: column
            })
        },

    }, {
        accessorKey: 'name',
        header({ column }) {
            return h(TableHeader, {
                title: 'Name',
                column: column
            })
        },
    }, {
        accessorKey: 'year',
        header({ column }) {
            return h(TableHeader, {
                title: 'Year',
                column: column
            })
        },
    },
    {
        accessorKey: 'created_at',
        header({ column }) {
            return h(TableHeader, {
                title: 'Created At',
                column: column
            })
        },
        cell({ row }) {
            return h('span', {},
                dayFns.format(new Date(row.original.created_at), 'dd/MM/yyyy HH:mm')
            )
        }
    },
    {
        accessorKey: 'updated_at',
        header({ column }) {
            return h(TableHeader, {
                title: 'Updated At',
                column: column
            })
        },
        cell({ row }) {
            return h('span', {},
                dayFns.format(new Date(row.original.updated_at), 'dd/MM/yyyy HH:mm')
            )
        }
    }, {
        accessorKey: 'actions',
        header() {
            return h('div', {
                class: 'text-xs',

            }, 'Actions')
        },
        cell() {
            return h(RowAction)
        }
    }
]


useTitle('Manage Kits | ELand')

definePage({
    meta: {
        layout: 'Admin',
        title: 'Manage Kits'
    }
})


</script>

<style scoped></style>