<template>
    <Header />
    <Navbar :nav-items="[
        {
            name: 'Dashboard',
            url: '/admin'
        },

        {
            name: 'Kits',
            url: '/admin/kits'
        },
        {
            name: 'Tests',
            url: '/admin/kit-tests'
        },
        {
            name: 'Questions',
            url: '/admin/questions'
        },
        {
            name: 'Topics',
            url: '/admin/topics'
        },
        {
            name: 'Vocabularies',
            url: '/admin/vocabularies'
        },
        {
            name: 'Users',
            url: '/admin/users'
        },
    ]" class="fixed top-14 left-0 right-0 h-14 bg-white" />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Navbar from './Navbar.vue';


</script>

<style scoped></style>
