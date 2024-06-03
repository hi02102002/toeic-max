<template>
    <nav :class="cn('flex items-center border-b border-input border-solid bg-white z-50 ', props.class)">
        <div class="container-app flex items-center gap-3">
            <RouterLink v-for="nav in props.navItems" :key="nav.url" :to="nav.url" active-class="active-link"
                class="nav-link">
                <span>
                    {{ nav.name }}
                </span>
            </RouterLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { cn } from '@/utils';


type Props = {
    navItems: Array<{
        url: string;
        name: string;

    }>,
    class?: string
}

const props = defineProps<Props>()
</script>

<style scoped>
.nav-link {
    @apply relative
}

.nav-link::after {
    content: "";
    @apply left-0 right-0 absolute -bottom-1 h-[2px] bg-primary opacity-0 invisible;
    transition: all 0.3s ease
}

.nav-link:hover::after,
.active-link::after {
    @apply w-full visible opacity-100
}
</style>