<!-- eslint-disable vue/no-v-html -->
<template>
    <div>
        <div v-if="isLoading"></div>
        <div v-else class="space-y-6">
            <div class="flex items-center justify-between">
                <span class="text-lg font-semibold">
                    Question {{ data?.location }}
                </span>

                <div class="flex items-center gap-3">
                    <Button variant="destructive">
                        Delete
                    </Button>
                    <Button>
                        Edit
                    </Button>
                </div>
            </div>
            <div class="flex items-start gap-4">
                <div v-if="data?.teaser.text || data?.image_urls.length !== 0 || data?.audio_url"
                    class="space-y-4 max-w-[50%] w-full">
                    <audio v-if="data?.audio_url" controls :src="data?.audio_url" class="w-full" />
                    <ul v-if="data?.image_urls.length !== 0" class="flex items-center gap-4 justify-center w-full">
                        <li v-for="image in data?.image_urls" :key="image">
                            <img :src="image" alt="image" class="rounded w-full" />
                        </li>
                    </ul>
                    <div class="text-sm max-w-xl mx-auto" v-html="data?.teaser.text"></div>
                </div>
                <div>
                    <ul class="space-y-4">
                        <li v-for="(question) in data?.questions || []" :key="question.id">
                            <div>
                                <span class="font-medium">
                                    {{ question.location }}. {{ question.q.replace(`${question.location}.`, '') }}
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
import { definePage } from 'vue-router/auto';
import { useSectionQuestion } from '@/hooks/section-question'
import { useRoute } from 'vue-router/auto';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import { CircleHelp } from 'lucide-vue-next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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