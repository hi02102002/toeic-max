<template>
    <TableBuilder :columns="cols" :query-key="API_ENDPOINTS.TOPICS.INDEX" :api-action="topicApi.getPaginate"
        :query="state">
    </TableBuilder>
</template>

<script setup lang="ts">
import { topicApi } from '@/apis/topic.api';
import { Badge } from '@/components/ui/badge';
import { BadgeApi } from '@/components/ui/badge-api';
import { TableHeader } from '@/components/ui/data-table';
import TableBuilder from '@/components/ui/table-builder/TableBuilder.vue';
import { API_ENDPOINTS } from '@/constants';
import { useQueryState } from '@/hooks/use-query-state';
import type { TTopic } from '@/types/topic';
import type { ColumnDef } from '@tanstack/vue-table';
import { useTitle } from '@vueuse/core';
import * as dayFns from 'date-fns';
import { h, watch } from 'vue';
import { definePage, useRoute } from 'vue-router/auto';
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
        accessorKey: 'parent_id',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Parent topic',
                column,
            })
        },
        enableSorting: false,
        cell({ row }) {
            return h('span', {},
                row.original.parent_id ?
                    h(BadgeApi, {
                        apiAction: () => topicApi.getById(row.original.parent_id).then(res => res.data.name),
                        queryKey: `topic-${row.original.parent_id}`
                    })
                    : h(Badge, {}, 'N/A')
            )
        }
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