<template>
    <div v-if="isLoading" class="flex items-center justify-center">
        <Loader2Icon class="animate-spin" />
    </div>
    <div v-else class="space-y-4">
        <div class="p-4 rounded bg-white border border-input shadow-sm md:max-w-3xl md:mx-auto">
            <span class="font-medium">
                {{ section?.name }}
            </span>
            <p class="text-sm text-muted-foreground">
                {{ section?.intro }}
            </p>
        </div>

        <div class="flex flex-col gap-4 items-center justify-center md:max-w-56 mx-auto">
            <Select v-model="numOfQuestion">
                <SelectTrigger>
                    <SelectValue placeholder="Select number of questions" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="num in [5, 10, 15, 20, 25, 30]" :key="num" :value="num.toString()">
                        {{ num }}
                    </SelectItem>
                </SelectContent>
            </Select>
            <Button class="w-full" :disabled="!numOfQuestion" @click="handleMoveToPractice">
                Start
            </Button>
        </div>


    </div>
</template>

<script lang="ts">

export default defineComponent({
    beforeRouteEnter: async (to: any) => {
        const part = get(to, 'params.part')

        await queryClient.prefetchQuery(sectionByPartQueryOptions(Number(Number(part))))
    },
})

</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sectionByPartQueryOptions, useSectionByPart } from '@/hooks/section';
import { queryClient } from '@/libs/react-query';
import { get } from 'lodash';
import { Loader2Icon, } from 'lucide-vue-next';
import { defineComponent, ref } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';

const { params: { part } } = useRoute('/dashboard/question/[part]/')

const router = useRouter()


const numOfQuestion = ref<string>('')

const { data: section, isLoading } = useSectionByPart(
    Number(part)
)

const handleMoveToPractice = () => {
    router.push(`/dashboard/question/${part}/practice/${numOfQuestion.value}`)
}

definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true
    },
})

</script>

<style scoped></style>