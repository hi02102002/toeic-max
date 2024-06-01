<template>
    <header class="flex items-center h-14 fixed top-0 left-0 right-0 bg-white">
        <div class="container-app flex items-center justify-between">
            <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold text-primary">
                <img :src="logo" alt="Logo" class="h-8 w-8" />
                <span> ELand </span>
            </RouterLink>
            <Button variant="ghost" class="flex items-center gap-3 cursor-pointer py-1 h-auto">
                <Avatar class="w-9 h-9">
                    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div class="flex flex-col">
                    <span>
                        Hoang Huy
                    </span>
                    <span class="text-xs">
                        (Admin)
                    </span>
                </div>
            </Button>
        </div>
    </header>
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
        }
    ]" class="fixed top-14 left-0 right-0 h-14 bg-white" />
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router/auto';
import Navbar from './Navbar.vue';
</script>

<style scoped></style>
