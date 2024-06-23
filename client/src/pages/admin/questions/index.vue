<template>
    <TableBuilder :columns="cols" :query-key="API_ENDPOINTS.QUESTIONS.INDEX" :api-action="questionApi.getPaginate"
        :is-show-search="false" :query="state">
        <template #extra-filter>
            <div class="flex items-center gap-3">
                <Select :model-value="state.test_kit_id" @update:model-value="handleChangeTestKit">
                    <SelectTrigger class="w-[180px] h-8">
                        <SelectValue placeholder="Select a kit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>
                                Kit tests
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
                <Select :model-value="state.part" @update:model-value="handleChangePart">
                    <SelectTrigger class="w-[180px] h-8">
                        <SelectValue placeholder="Select a part" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>
                                Parts
                            </SelectLabel>
                            <SelectItem :value="NOT_CHOOSE">
                                All
                            </SelectItem>
                            <SelectItem v-for="option in PARTS" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

        </template>
        <template #extra-button>
            <RouterLink to="/admin/questions/create" :class="buttonVariants({
                size: 'sm'
            })">
                Create question
            </RouterLink>
        </template>
    </TableBuilder>
</template>

<script setup lang="ts">
import { questionApi } from '@/apis/question.api';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { TableHeader } from '@/components/ui/data-table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableBuilder } from '@/components/ui/table-builder';
import { API_ENDPOINTS, NOT_CHOOSE, PARTS } from '@/constants';
import { useForSelectKitTest } from '@/hooks/kit-test';
import { useQueryState } from '@/hooks/use-query-state';
import type { TSectionQuestion } from '@/types/question';
import type { ColumnDef } from '@tanstack/vue-table';
import { useTitle } from '@vueuse/core';
import * as dayFns from 'date-fns';
import { get } from 'lodash';
import { h } from 'vue';
import { definePage } from 'vue-router/auto';
import RowAction from './components/RowAction.vue';

useTitle('Manage Questions | ELand')

const { data: options } = useForSelectKitTest()

const { state, handleChange } = useQueryState({
    test_kit_id: '',
    part: '',
}
)

const handleChangeTestKit = (value: string) => {
    handleChange('test_kit_id', value)
}

const handleChangePart = (value: string) => {
    handleChange('part', value)
}

definePage({
    meta: {
        layout: 'Admin',
        title: "Manage Questions",
        roles: ['ADMIN'],
        requiresAuth: true
    },

})

const cols: ColumnDef<TSectionQuestion>[] = [
    {
        accessorKey: 'location',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Question',
                column,
            })
        },
    }, {
        accessorKey: 'part',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Part',
                column,
            })
        },
    }, {
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
        accessorKey: 'test_kit.name',
        header({ column }: any) {
            return h(TableHeader, {
                title: 'Test',
                column
            })
        },
        enableSorting: false,
        cell({ row }) {
            return h(
                Badge, {}, get(row.original, 'test_kit.name', 'N/A') || 'N/A'
            )
        },

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

</script>

<style scoped></style>
