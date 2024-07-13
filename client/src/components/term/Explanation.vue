<!-- eslint-disable vue/no-v-html -->
<template>
    <Sheet>
        <SheetTrigger as-child>
            <slot />
        </SheetTrigger>
        <SheetContent side='bottom' class="max-h-[100vh]">
            <SheetHeader>
                <SheetTitle>
                    Explanation
                </SheetTitle>
            </SheetHeader>
            <div v-if="props.sectionQuestion.teaser.text || props.sectionQuestion.teaser.tran?.vi || props.sectionQuestion.teaser.trans?.vi || props.sectionQuestion.questions.length > 1"
                class="py-4">
                <Tabs>
                    <TabsList class="grid py" :style="{
                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`
                    }">
                        <TabsTrigger v-if="props.sectionQuestion.teaser.text" value="subtitle">
                            Subtitle
                        </TabsTrigger>
                        <TabsTrigger
                            v-if="props.sectionQuestion.teaser.tran?.vi || props.sectionQuestion.teaser.trans?.vi"
                            value="translation">
                            Translation
                        </TabsTrigger>
                        <TabsTrigger v-for="question in props.sectionQuestion.questions" :key="question.id"
                            :value="question.id">
                            {{ question.location }}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent v-if="props.sectionQuestion.teaser.text" value="subtitle">
                        <ScrollArea class='h-[400px]'>
                            <div class="text-sm text-muted-foreground " v-html="props.sectionQuestion.teaser.text">
                            </div>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent
                        v-if="props.sectionQuestion?.teaser?.tran?.vi || props.sectionQuestion?.teaser?.trans?.vi"
                        value="translation">
                        <ScrollArea class='h-[400px]'>
                            <div class="text-sm  text-muted-foreground"
                                v-html="props.sectionQuestion?.teaser?.tran?.vi || props.sectionQuestion?.teaser?.trans?.vi">
                            </div>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent v-for="question in props.sectionQuestion.questions" :key="question.id"
                        :value="question.id">
                        <ScrollArea class='h-[400px]'>
                            <p class="text-sm whitespace-pre-line text-muted-foreground">
                                {{ question.trans.vi }}
                            </p>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>

            <div v-else class='py-4'>
                <p class="text-sm whitespace-pre-line text-muted-foreground">
                    {{
                        props.sectionQuestion.questions[0].trans?.vi
                    }}
                </p>
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import type { TSectionQuestion } from '@/types/question';
import { computed } from 'vue';
import { ScrollArea } from '../ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type Props = {
    sectionQuestion: TSectionQuestion
}

const props = defineProps<Props>()

const gridColumns = computed(() => {
    let columns = 0

    if (props.sectionQuestion.teaser.text) {
        columns++
    }

    if (props.sectionQuestion.teaser.tran?.vi || props.sectionQuestion.teaser.trans?.vi) {
        columns++
    }

    if (props.sectionQuestion.questions.length > 1) {
        columns += props.sectionQuestion.questions.length
    }

    return columns
})

</script>

<style scoped></style>