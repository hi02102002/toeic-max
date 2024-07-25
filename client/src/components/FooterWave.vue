<template>
    <div class="absolute bottom-0 pt-20 p-4 w-full bg-no-repeat left-0" :style="{
        backgroundSize: '100% 100%',
        backgroundImage: 'url(/images/wave.png)',
        backgroundPosition: '0px 2px'
    }">
        <slot />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>