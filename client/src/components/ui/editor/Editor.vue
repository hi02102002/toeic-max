<template>
    <div class="shadow-sm border rounded border-input focus-within:ring-1 focus-within:ring-primary">
        <div class="flex items-center gap-3 flex-wrap p-3 border-b border-input">
            <Button type="button" variant="outline" :class="cn('w-8 h-8 p-0', {
                'bg-accent': editor?.isActive('heading', {
                    level: 1
                })
            })" @click="editor?.chain().focus().toggleHeading({
                level: 1
            }).run()">
                <Heading1 class="w-4 h-4" />
            </Button>
            <Button type="button" variant="outline" :class="cn('w-8 h-8 p-0', {
                'bg-accent': editor?.isActive('heading', {
                    level: 2
                })
            })" @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()">
                <Heading2 class="w-4 h-4" />
            </Button>
            <Button type="button" variant="outline" :class="cn('w-8 h-8 p-0', {
                'bg-accent': editor?.isActive('heading', {
                    level: 3
                })
            })" @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()">
                <Heading3 class="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" class="self-stretch h-auto" />
            <Button type="button" variant="outline" :class="cn('w-8 h-8 p-0', {
                'bg-accent': editor?.isActive('bold')
            })" @click="editor?.chain().focus().toggleBold().run()">
                <BoldIcon class="w-4 h-4" />
            </Button>
            <Button type="button" variant="outline" :class="cn('w-8 h-8 p-0', {
                'bg-accent': editor?.isActive('italic')

            })" @click="editor?.chain().focus().toggleItalic().run()">
                <ItalicIcon class="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" class="self-stretch h-auto" />
            <Button type="button" variant="outline" :class="cn('w-8 h-8 p-0', {
                'bg-accent': editor?.isActive('bulletList')
            })" @click="editor?.chain().focus().toggleBulletList().run()">
                <ListBulletIcon class="w-4 h-4" />
            </Button>
            <Button type="button" variant="outline" :class="cn('w-8 h-8 p-0', {
                'bg-accent': editor?.isActive('orderedList')

            })" @click="editor?.chain().focus().toggleOrderedList().run()">
                <ListOrderedIcon class="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" class="self-stretch h-auto" />
            <Button type="button" variant="outline" :class="cn('w-8 h-8 p-0', {
                'bg-accent': editor?.isActive('link')
            })" @click="handleToggleLink">
                <LinkIcon class="w-4 h-4" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button type="button" variant="outline" :class="cn('w-8 h-8 p-0')">
                        <TableIcon class="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Table
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem
                                @click="editor?.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()">
                                Insert table
                            </DropdownMenuItem>
                            <DropdownMenuItem :disabled="!editor?.can().deleteTable()"
                                @click="editor?.chain().focus().deleteTable().run()">
                                Remove table
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Column
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem :disabled="!editor?.can().addColumnAfter()"
                                @click="editor?.chain().focus().addColumnAfter().run()">
                                Insert column after
                            </DropdownMenuItem>
                            <DropdownMenuItem :disabled="!editor?.can().deleteColumn()"
                                @click="editor?.chain().focus().deleteColumn().run()">
                                Remove column
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Row
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem :disabled="!editor?.can().addRowAfter()"
                                @click="editor?.chain().focus().addRowAfter().run()">
                                Insert row after
                            </DropdownMenuItem>
                            <DropdownMenuItem :disabled="!editor?.can().deleteRow()"
                                @click="editor?.chain().focus().deleteRow().run()">
                                Remove row
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
        <ScrollArea class="h-80">
            <EditorContent :editor="editor" class="min-h-80 editor prose  prose-green prose-primary max-w-full" />
        </ScrollArea>
    </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils';
import { ListBulletIcon } from '@radix-icons/vue';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { BoldIcon, Heading1, Heading2, Heading3, ItalicIcon, LinkIcon, ListOrderedIcon, TableIcon } from 'lucide-vue-next';
import { onBeforeUnmount } from 'vue';
import { Button } from '../button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../dropdown-menu';
import DropdownMenuSub from '../dropdown-menu/DropdownMenuSub.vue';
import { ScrollArea } from '../scroll-area';
import { Separator } from '../separator';

type Props = {
    modelValue?: string
    defaultValue?: string;
    placeholder?: string
}

const emits = defineEmits<{
    (e: 'update:modelValue', content: string): void
}>()

const props = defineProps<Props>()


const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder: props.placeholder
        }),
        Link,
        Table.configure({
            resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
    ],
    onUpdate({ editor }) {
        let content = editor.getHTML();
        const json = editor.getJSON().content;

        if (Array.isArray(json) && json.length === 1 && !Object.prototype.hasOwnProperty.call(json[0], "content")) {
            content = ''
        }

        emits('update:modelValue', content)
    },
    content: props.modelValue
})


const handleToggleLink = () => {
    if (editor.value?.isActive('link')) {
        editor.value?.chain().focus().unsetLink().run()
    } else {
        const url = window.prompt(
            'Enter the URL of the link',
            'https://'
        )

        if (url) {
            editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        }
    }
}


onBeforeUnmount(() => {
    editor.value?.destroy()
})

</script>

<style>
.editor .tiptap {
    @apply rounded-b p-3
}

.tiptap .ProseMirror {
    @apply outline-none focus-visible:outline-none
}

.ProseMirror:focus-visible {
    @apply outline-none;
}
</style>