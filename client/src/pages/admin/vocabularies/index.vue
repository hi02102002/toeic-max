<template>
    <TableBuilder :columns="cols" :query-key="API_ENDPOINTS.VOCABULARIES.INDEX" :api-action="vocabularyApi.getPaginate"
        :query="state">
    </TableBuilder>
</template>

<script setup lang="ts">
import { topicApi } from '@/apis/topic.api';
import { vocabularyApi } from '@/apis/vocabulary.api';
import { BadgeApi } from '@/components/ui/badge-api';
import { TableHeader } from '@/components/ui/data-table';
import TableBuilder from '@/components/ui/table-builder/TableBuilder.vue';
import { API_ENDPOINTS } from '@/constants';
import { useQueryState } from '@/hooks/use-query-state';
import type { TQueryVocabulary, TVocabulary } from '@/types/vocabulary';
import type { ColumnDef } from '@tanstack/vue-table';
import { useTitle } from '@vueuse/core';
import { capitalize, unescape } from 'lodash';
import { h, watch } from 'vue';
import { definePage, useRoute } from 'vue-router/auto';

const { handleChange, state } = useQueryState<TQueryVocabulary>({
    topic_id: undefined
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
        accessorKey: 'category',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Category',
                column,
            })
        },
    },
    {
        accessorKey: 'topic_id',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Topic',
                column,
            })
        },
        enableSorting: false,
        cell({ row }) {
            return h(BadgeApi, {
                apiAction: () => topicApi.getById(row.original.topic_id).then((res) => res.data.name),
                queryKey: `topic-${row.original.topic_id}`
            })
        }

    }

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