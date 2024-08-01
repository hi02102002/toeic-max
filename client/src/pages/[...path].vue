<template>
    <div>
        not found
    </div>
</template>
<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (
        _to: any,
        _from: any,
        next: any
    ) => {
        next({ path: '/404' })
    },
})</script>
<script setup lang="ts">
import { defineComponent } from 'vue';
</script>

<style scoped></style>