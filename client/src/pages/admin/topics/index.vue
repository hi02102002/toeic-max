<template>
    <TableBuilder :columns="cols" :query-key="API_ENDPOINTS.TOPICS.INDEX" :api-action="topicApi.getPaginate"
        :query="state">
        <template #extra-button>
            <CreateTopicDialog />
        </template>
    </TableBuilder>
</template>

<script setup lang="ts">
import { topicApi } from '@/apis/topic.api';
import { Badge } from '@/components/ui/badge';
import { TableHeader } from '@/components/ui/data-table';
import TableBuilder from '@/components/ui/table-builder/TableBuilder.vue';
import { API_ENDPOINTS } from '@/constants';
import { useQueryState } from '@/hooks/use-query-state';
import type { TTopic } from '@/types/topic';
import type { ColumnDef } from '@tanstack/vue-table';
import { useTitle } from '@vueuse/core';
import * as dayFns from 'date-fns';
import { get } from 'lodash';
import { h, watch } from 'vue';
import { definePage, useRoute } from 'vue-router/auto';
import { CreateTopicDialog } from './components';
import RowAction from './components/RowAction.vue';

const { handleChange, state } = useQueryState({
    parent_id: undefined
})

const route = useRoute()


useTitle('Manage Topic | ELand')


const cols: ColumnDef<TTopic>[] = [
    {
        accessorKey: 'id',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Id',
                column,
            })
        },

    },
    {
        accessorKey: 'name',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Name',
                column,
            })
        },


    }
    , {
        accessorKey: 'slug',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Slug',
                column,
            })
        }
    },
    {
        accessorKey: 'parent.name',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Parent Id',
                column,
            })
        },
        cell({ row }) {
            return h(Badge, {},
                get(row.original, 'parent.name', 'N/A') || 'N/A'
            )
        },
        enableSorting: false
    },
    {
        accessorKey: 'created_at',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Created At',
                column
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
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Updated At',
                column
            })
        },
        cell({ row }) {
            return h('span', {},
                dayFns.format(new Date(row.original.updated_at), 'dd/MM/yyyy HH:mm')
            )
        }
    },
    {
        accessorKey: 'actions',
        header() {
            return h('div', {
                class: 'text-xs',

            }, 'Actions')
        },
        cell({ row }: any) {
            return h(RowAction, {
                row,
            })
        }
    }

]


watch(
    () => route.query.parent_id,
    (value) => {
        handleChange('parent_id', value)
    },
    {
        immediate: true
    }
)

definePage({
    meta: {
        layout: 'Admin',
        title: 'Manage Topics',
        roles: ['ADMIN'],
        requiresAuth: true
    },
})

</script>

<style scoped></style>