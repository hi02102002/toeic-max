<template>
    <Badge>
        <span v-if="isLoading">
            Loading...
        </span>
        <span v-else class="whitespace-nowrap">
            {{ data }}
        </span>
    </Badge>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { Badge } from '../badge';


type Props = {
    apiAction: () => Promise<string>
    queryKey: string
}


const props = defineProps<Props>()


const useBadgeApi = () => {
    return useQuery({
        queryKey: ['badge', props.queryKey],
        queryFn: props.apiAction,
    })
}


const { data, isLoading } = useBadgeApi()


</script>
