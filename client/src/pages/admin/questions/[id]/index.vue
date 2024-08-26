<!-- eslint-disable vue/no-v-html -->
<template>
    <div>
        <div v-if="isLoading" class="flex items-center justify-center">
            <Loader2 class="animate-spin" />
        </div>
        <div v-else class="space-y-6">
            <div class="flex items-center justify-between">
                <span class="text-lg font-semibold">
                    Question {{ data?.location }}
                </span>

                <RowAction />
            </div>
            <div class="flex items-start gap-4">
                <div v-if="data?.teaser?.text || data?.imageUrls.length !== 0 || data?.audioUrl"
                    class="space-y-4 max-w-[50%] w-full">
                    <audio v-if="data?.audioUrl" controls :src="data?.audioUrl" class="w-full" />
                    <ul v-if="data?.imageUrls?.length !== 0"
                        class="flex items-center gap-4 justify-center w-full flex-col">
                        <li v-for="image in data?.imageUrls" :key="image">
                            <img :src="image" alt="image" class="rounded w-full" />
                        </li>
                    </ul>
                    <div v-if="data?.teaser?.text || data?.teaser?.tran?.vi ||
                        data?.teaser?.trans?.vi
                    " class="space-y-2">

                        <Label class="text-lg font-semibold">
                            Teaser
                        </Label>
                        <div class="text-sm mx-auto" v-html="data?.teaser.text"></div>
                    </div>
                    <Separator v-if="data?.teaser?.text" />
                    <div v-if="
                        data?.teaser?.tran?.vi || data?.teaser.trans?.vi
                    " class="space-y-2">
                        <Label class="text-lg font-semibold">
                            Teaser Translation
                        </Label>
                        <div class="text-sm mx-auto" v-html="data?.teaser.tran?.vi || data?.teaser.trans?.vi
                            "></div>
                    </div>
                </div>
                <div>
                    <ul class="space-y-4">
                        <li v-for="(question) in data?.questions || []" :key="question.id">
                            <div>
                                <span class="font-medium">
                                    {{ question.location }}. {{ question.q?.replace(`${question.location}.`, '') }}
                                </span>

                                <Dialog>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger as-child>
                                                <DialogTrigger as-child>
                                                    <Button class="ml-2 p-0 w-4 h-4 rounded-full" variant="ghost">
                                                        <CircleHelp class="w-3 h-3" />
                                                    </Button>
                                                </DialogTrigger>


                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    Explanation
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Explanation
                                            </DialogTitle>
                                            <DialogDescription>
                                                This content below is the explanation of the question {{
                                                    question.location
                                                }}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <p class="text-sm whitespace-pre-line">
                                            {{
                                                question.trans.vi
                                            }}
                                        </p>
                                    </DialogContent>
                                </Dialog>

                            </div>
                            <ul>
                                <template v-for="(value, key) in question.opts" :key="key + question.id">
                                    <li v-if="value" :class="cn({
                                        'text-green-500': question.ans === key
                                    })">
                                        {{
                                            key.toUpperCase()
                                        }}. {{ value }}
                                    </li>
                                </template>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSectionQuestion } from '@/hooks/section-question';
import { cn } from '@/utils';
import { CircleHelp, Loader2 } from 'lucide-vue-next';
import { definePage, useRoute } from 'vue-router/auto';
import { RowAction } from './components';

const { params } = useRoute('/admin/questions/[id]/')

const { data, isLoading } = useSectionQuestion(params.id)


definePage({
    meta: {
        layout: 'Admin',
        title: "Questions Details",
        roles: ['ADMIN'],
        requiresAuth: true
    },

})
</script>

<style scoped></style>