<template>
    <div>

    </div>
</template>
<script lang="ts">


</script>
<script setup>
import { useTitle } from '@vueuse/core';
import { definePage } from 'vue-router/auto';

useTitle('Manage Questions | ELand')

definePage({
    meta: {
        layout: 'Admin',
        title: "Manage Questions"
    }
})

</script>

<style lang="scss" scoped></style>