<template>
    <Badge>
        <span v-if="isLoading">
            Loading...
        </span>
        <span v-else class="whitespace-nowrap">
            {{ data || 'N/A' }}
        </span>
    </Badge>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { Badge } from '../badge';


type Props = {
    apiAction: () => Promise<string>
    queryKey: string
}

const queryKeyRef = ref('')

const props = defineProps<Props>()


const { data, isLoading } = useQuery({
    queryKey: ['badge', queryKeyRef.value],
    queryFn: props.apiAction,
})

watch(() => props.queryKey, (value) => {
    queryKeyRef.value = value
}, { immediate: true, deep: true })

</script>
