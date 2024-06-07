<template>
    <header class="flex items-center h-14 fixed top-0 left-0 right-0 bg-white z-50">
        <div class="container-app flex items-center justify-between">
            <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold text-primary">
                <img :src="logo" alt="Logo" class="h-8 w-8" />
                <span> ELand </span>
            </RouterLink>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" class="flex items-center gap-3 cursor-pointer py-1 h-auto">
                        <Avatar class="w-9 h-9">
                            <AvatarImage alt="@radix-vue" :src="currentUserStore.currentUser?.avatar as string">
                            </AvatarImage>
                            <AvatarFallback>
                                {{ currentUserStore.currentUser?.name.charAt(0) }}
                            </AvatarFallback>
                        </Avatar>
                        <div class="flex flex-col">
                            <span>
                                {{ currentUserStore.currentUser?.name }}
                            </span>
                        </div>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem>
                        Back to site
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="logoutMutation.mutate">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

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
    <Teleport to="body">
        <LoadingFullPage v-if="logoutMutation.isPending.value" />
    </Teleport>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router/auto';
import Navbar from './Navbar.vue';
import { useCurrentUserStore } from '@/stores/current-user';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { useLogout } from '@/hooks/auth';
import LoadingFullPage from '@/components/LoadingFullPage.vue';

const logoutMutation = useLogout()


const currentUserStore = useCurrentUserStore();

</script>

<style scoped></style>
