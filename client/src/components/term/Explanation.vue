<!-- eslint-disable vue/no-v-html -->
<template>
    <Dialog>
        <DialogTrigger as-child>
            <slot />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Explanation
                </DialogTitle>
                <DialogDescription>
                    This content below is the explanation of the question {{
                        props.sectionQuestion.location
                    }}
                </DialogDescription>
            </DialogHeader>
            <Tabs
                v-if="props.sectionQuestion.teaser.text || props.sectionQuestion.teaser.tran?.vi || props.sectionQuestion.teaser.trans?.vi || props.sectionQuestion.questions.length > 1">
                <TabsList class="grid" :style="{
                    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`
                }">
                    <TabsTrigger v-if="props.sectionQuestion.teaser.text" value="subtitle">
                        Subtitle
                    </TabsTrigger>
                    <TabsTrigger v-if="props.sectionQuestion.teaser.tran?.vi || props.sectionQuestion.teaser.trans?.vi"
                        value="translation">
                        Translation
                    </TabsTrigger>
                    <TabsTrigger v-for="question in props.sectionQuestion.questions" :key="question.id"
                        :value="question.id">
                        {{ question.location }}
                    </TabsTrigger>
                </TabsList>
                <TabsContent v-if="props.sectionQuestion.teaser.text" value="subtitle">
                    <div class="text-sm text-muted-foreground " v-html="props.sectionQuestion.teaser.text"></div>
                </TabsContent>
                <TabsContent v-if="props.sectionQuestion?.teaser?.tran?.vi || props.sectionQuestion?.teaser?.trans?.vi"
                    value="translation">
                    <div class="text-sm  text-muted-foreground"
                        v-html="props.sectionQuestion?.teaser?.tran?.vi || props.sectionQuestion?.teaser?.trans?.vi">
                    </div>
                </TabsContent>
                <TabsContent v-for="question in props.sectionQuestion.questions" :key="question.id"
                    :value="question.id">
                    <p class="text-sm whitespace-pre-line text-muted-foreground">
                        {{ question.trans.vi }}
                    </p>
                </TabsContent>
            </Tabs>

            <div v-else>
                <p class="text-sm whitespace-pre-line text-muted-foreground">
                    {{
                        props.sectionQuestion.questions[0].trans?.vi
                    }}
                </p>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import type { TSectionQuestion } from '@/types/question';
import { computed } from 'vue';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
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