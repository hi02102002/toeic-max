<template>
    <header :class="cn('flex items-center h-14 fixed top-0 left-0 right-0 bg-white z-50', $attrs.class as string)">
        <div class="container-app flex items-center justify-between">
            <RouterLink :to="isAdmin ? '/admin' : '/dashboard'"
                class="flex items-center gap-2 text-lg font-medium text-primary">
                <img src="/images/logo.png" alt="Logo" class="h-10 w-10" />
            </RouterLink>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" class="flex items-center gap-3 cursor-pointer py-1 h-auto px-0 md:px-4">
                        <Avatar class="w-9 h-9">
                            <AvatarImage alt="@radix-vue" :src="currentUserStore.currentUser?.avatar as string">
                            </AvatarImage>
                            <AvatarFallback>
                                {{ currentUserStore.currentUser?.name.charAt(0) }}
                            </AvatarFallback>
                        </Avatar>
                        <div class="flex-col md:flex hidden">
                            <span>
                                {{ currentUserStore.currentUser?.name }}
                            </span>
                        </div>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent :style="{
                    width: 'var(--radix-popper-anchor-width)'
                }" class="w-[var(--radix-popper-anchor-width)]" align="end">
                    <DropdownMenuItem v-if="isAdmin">
                        Back to site
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="logoutMutation.mutate">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    </header>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLogout } from '@/hooks/auth';
import { useCurrentUserStore } from '@/stores/current-user';
import { cn } from '@/utils';
import { computed } from 'vue';
import { RouterLink } from 'vue-router/auto';

const logoutMutation = useLogout()

const currentUserStore = useCurrentUserStore();

const isAdmin = computed(() => currentUserStore.currentUser?.roles.includes('ADMIN'))

</script>

<style scoped></style>