<template>
    <TableBuilder :columns="cols" :query-key="API_ENDPOINTS.KITS.INDEX" :api-action="kitApi.getPaginate">
        <template #extra-button>
            <CreateDialog />
        </template>
    </TableBuilder>
</template>


<script setup lang="ts">
import { kitApi } from '@/apis/kit.api';
import { TableHeader } from '@/components/ui/data-table';
import { TableBuilder } from '@/components/ui/table-builder';
import { API_ENDPOINTS } from '@/constants';
import type { TKit } from '@/types/kit';
import { getAppTitle } from '@/utils/common';
import type { ColumnDef } from '@tanstack/vue-table';
import { useTitle } from '@vueuse/core';
import * as dayFns from 'date-fns';
import { h } from 'vue';
import { definePage } from 'vue-router/auto';
import { CreateDialog } from './components';
import RowAction from './components/RowAction.vue';


const cols: ColumnDef<TKit>[] = [
    {
        accessorKey: 'id',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Id',
                column,
            })
        },

    }, {
        accessorKey: 'name',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Name',
                column,
            })
        },
    }, {
        accessorKey: 'year',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Year',
                column
            })
        },
    },

    {
        accessorKey: 'createdAt',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Created At',
                column
            })
        },
        cell({ row }) {
            return h('span', {},
                dayFns.format(new Date(row.original.createdAt), 'dd/MM/yyyy HH:mm')
            )
        }
    },
    {
        accessorKey: 'updatedAt',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Updated At',
                column
            })
        },
        cell({ row }) {
            return h('span', {},
                dayFns.format(new Date(row.original.updatedAt), 'dd/MM/yyyy HH:mm')
            )
        }
    }, {
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


useTitle(getAppTitle('Manage Kits'))

definePage({
    meta: {
        layout: 'Admin',
        title: 'Manage Kits',
        roles: ['ADMIN'],
        requiresAuth: true
    }
})


</script>

<style scoped></style>