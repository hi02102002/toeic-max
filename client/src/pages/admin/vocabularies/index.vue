<template>
    <TableBuilder :columns="cols" :query-key="API_ENDPOINTS.VOCABULARIES.INDEX" :api-action="vocabularyApi.getPaginate"
        :query="state">
        <template #extra-button>
            <RouterLink to="/admin/vocabularies/create" :class="buttonVariants({
                size: 'sm'
            })">
                Create Vocabulary
            </RouterLink>
        </template>
    </TableBuilder>
</template>

<script setup lang="ts">
import { vocabularyApi } from '@/apis/vocabulary.api';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { TableHeader } from '@/components/ui/data-table';
import TableBuilder from '@/components/ui/table-builder/TableBuilder.vue';
import { API_ENDPOINTS } from '@/constants';
import { useQueryState } from '@/hooks/use-query-state';
import type { TQueryVocabulary, TVocabulary } from '@/types/vocabulary';
import type { ColumnDef } from '@tanstack/vue-table';
import { useTitle } from '@vueuse/core';
import { capitalize, get, unescape } from 'lodash';
import { h, watch } from 'vue';
import { RouterLink, definePage, useRoute } from 'vue-router/auto';
import { RowAction } from './components';

const { handleChange, state } = useQueryState<TQueryVocabulary>({
    topicId: undefined
})

const route = useRoute()


useTitle('Manage Vocabularies | ELand')


const cols: ColumnDef<TVocabulary>[] = [
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
        accessorKey: 'image',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Image',
                column,
            })
        },
        cell({ row }) {
            return h('img', {
                src: row.original.image,
                alt: row.original.name,
                class: 'h-10 w-10 object-cover rounded'
            })
        },
        enableSorting: false
    },
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
        accessorKey: 'type',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Type',
                column,
            })
        },
        cell({ row }) {
            return row.original.type ? capitalize(row.original.type) : 'N/A'
        },
    },
    {
        accessorKey: 'spelling',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Spelling',
                column,
            })
        },
        cell({ row }) {
            return unescape(row.original.spelling)
        }
    },
    {
        accessorKey: 'meaning',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Meaning',
                column,
            })
        },
    },
    {
        accessorKey: 'example',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Example',
                column,
            })
        },
    },
    {
        accessorKey: 'category',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Category',
                column,
            })
        },
    },
    {
        accessorKey: 'topic.name',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Topic',
                column,
            })
        },
        cell(props) {
            return h(Badge, {}, get(props.row.original, 'topic.name', 'N/A'))
        },
        enableSorting: false
    },
    {
        accessorKey: 'actions',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Actions',
                column,
            })
        },
        cell({ row }) {
            return h(RowAction, {
                row,
            })
        },
        enableSorting: false
    },

]


watch(
    () => route.query.topic_id,
    (value) => {
        handleChange('topic_id', value)
    },
    {
        immediate: true
    }
)

definePage({
    meta: {
        layout: 'Admin',
        title: 'Manage Vocabularies',
        roles: ['ADMIN'],
        requiresAuth: true
    },
})

</script>

<style scoped></style>