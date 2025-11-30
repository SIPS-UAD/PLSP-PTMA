import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo,
    RemoveFormatting,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo,
} from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

const ResizableImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                parseHTML: (element) => element.getAttribute('width'),
                renderHTML: (attributes) => {
                    if (!attributes.width) {
                        return {};
                    }
                    return { width: attributes.width };
                },
            },
            height: {
                default: null,
                parseHTML: (element) => element.getAttribute('height'),
                renderHTML: (attributes) => {
                    if (!attributes.height) {
                        return {};
                    }
                    return { height: attributes.height };
                },
            },
        };
    },
    addNodeView() {
        return ({ node, getPos, editor }) => {
            const container = document.createElement('div');
            container.className = 'relative inline-block group';

            const img = document.createElement('img');
            img.src = node.attrs.src;
            img.alt = node.attrs.alt || '';
            img.className = 'max-w-full h-auto rounded-lg';

            if (node.attrs.width) {
                img.style.width = node.attrs.width + 'px';
            }
            if (node.attrs.height) {
                img.style.height = node.attrs.height + 'px';
            }

            const resizeHandle = document.createElement('div');
            resizeHandle.className =
                'absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity';

            let isResizing = false;
            let startX = 0;
            let startWidth = 0;

            resizeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isResizing = true;
                startX = e.clientX;
                startWidth = img.offsetWidth;

                const onMouseMove = (e: MouseEvent) => {
                    if (!isResizing) return;

                    const width = startWidth + (e.clientX - startX);
                    if (width > 100) {
                        img.style.width = width + 'px';
                        img.style.height = 'auto';
                    }
                };

                const onMouseUp = () => {
                    if (!isResizing) return;
                    isResizing = false;

                    const pos = getPos();
                    if (typeof pos === 'number') {
                        editor
                            .chain()
                            .setNodeSelection(pos)
                            .updateAttributes('image', {
                                width: img.offsetWidth,
                                height: img.offsetHeight,
                            })
                            .run();
                    }

                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });

            container.appendChild(img);
            container.appendChild(resizeHandle);

            return {
                dom: container,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== 'image') return false;

                    img.src = updatedNode.attrs.src;
                    img.alt = updatedNode.attrs.alt || '';

                    if (updatedNode.attrs.width) {
                        img.style.width = updatedNode.attrs.width + 'px';
                    }
                    if (updatedNode.attrs.height) {
                        img.style.height = updatedNode.attrs.height + 'px';
                    }

                    return true;
                },
            };
        };
    },
});

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start typing...',
    className,
}: RichTextEditorProps) {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [textColor, setTextColor] = useState('#000000');
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer',
                },
            }),
            ResizableImage.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 prose-li:my-0 min-h-[200px] max-w-none p-4 focus:outline-none',
            },
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;

        if (linkUrl === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            setShowLinkInput(false);
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: linkUrl })
            .run();

        setLinkUrl('');
        setShowLinkInput(false);
    }, [editor, linkUrl]);

    const handleImageUpload = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file || !editor) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const url = event.target?.result as string;
                editor.chain().focus().setImage({ src: url }).run();
            };
            reader.readAsDataURL(file);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        },
        [editor],
    );

    const applyColor = useCallback(() => {
        if (!editor) return;

        editor.chain().focus().setColor(textColor).run();
        setShowColorPicker(false);
    }, [editor, textColor]);

    if (!editor) {
        return null;
    }

    console.log(editor.getHTML());

    return (
        <div className={cn('overflow-hidden rounded-lg border', className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />

            <Tabs
                value={activeTab}
                onValueChange={(v: string) =>
                    setActiveTab(v as 'edit' | 'preview')
                }
                className="w-full"
            >
                <div className="flex items-center justify-between border-b bg-muted/50 p-2">
                    <div className="flex flex-wrap gap-1">
                        {/* Text Formatting */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                            className={cn(
                                editor.isActive('bold') && 'bg-accent',
                            )}
                            title="Bold"
                        >
                            <Bold className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                            className={cn(
                                editor.isActive('italic') && 'bg-accent',
                            )}
                            title="Italic"
                        >
                            <Italic className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor.chain().focus().toggleUnderline().run()
                            }
                            className={cn(
                                editor.isActive('underline') && 'bg-accent',
                            )}
                            title="Underline"
                        >
                            <UnderlineIcon className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor.chain().focus().toggleStrike().run()
                            }
                            className={cn(
                                editor.isActive('strike') && 'bg-accent',
                            )}
                            title="Strikethrough"
                        >
                            <Strikethrough className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            title="Text Color"
                        >
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-semibold">A</span>
                                <div
                                    className="h-1 w-4 rounded"
                                    style={{
                                        backgroundColor:
                                            editor.getAttributes('textStyle')
                                                .color || '#000000',
                                    }}
                                />
                            </div>
                        </Button>

                        <div className="mx-1 h-6 w-px bg-border" />

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run()
                            }
                            className={cn(
                                editor.isActive('heading', { level: 1 }) &&
                                    'bg-accent',
                            )}
                            title="Heading 1"
                        >
                            <Heading1 className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 2 })
                                    .run()
                            }
                            className={cn(
                                editor.isActive('heading', { level: 2 }) &&
                                    'bg-accent',
                            )}
                            title="Heading 2"
                        >
                            <Heading2 className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run()
                            }
                            className={cn(
                                editor.isActive('heading', { level: 3 }) &&
                                    'bg-accent',
                            )}
                            title="Heading 3"
                        >
                            <Heading3 className="h-4 w-4" />
                        </Button>

                        <div className="mx-1 h-6 w-px bg-border" />

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor.chain().focus().toggleBulletList().run()
                            }
                            className={cn(
                                editor.isActive('bulletList') && 'bg-accent',
                            )}
                            title="Bullet List"
                        >
                            <List className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor.chain().focus().toggleOrderedList().run()
                            }
                            className={cn(
                                editor.isActive('orderedList') && 'bg-accent',
                            )}
                            title="Numbered List"
                        >
                            <ListOrdered className="h-4 w-4" />
                        </Button>

                        <div className="mx-1 h-6 w-px bg-border" />

                        {/* Text Alignment */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign('left')
                                    .run()
                            }
                            className={cn(
                                editor.isActive({ textAlign: 'left' }) &&
                                    'bg-accent',
                            )}
                            title="Align Left"
                        >
                            <AlignLeft className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign('center')
                                    .run()
                            }
                            className={cn(
                                editor.isActive({ textAlign: 'center' }) &&
                                    'bg-accent',
                            )}
                            title="Align Center"
                        >
                            <AlignCenter className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign('right')
                                    .run()
                            }
                            className={cn(
                                editor.isActive({ textAlign: 'right' }) &&
                                    'bg-accent',
                            )}
                            title="Align Right"
                        >
                            <AlignRight className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign('justify')
                                    .run()
                            }
                            className={cn(
                                editor.isActive({ textAlign: 'justify' }) &&
                                    'bg-accent',
                            )}
                            title="Justify"
                        >
                            <AlignJustify className="h-4 w-4" />
                        </Button>

                        <div className="mx-1 h-6 w-px bg-border" />

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor.chain().focus().toggleBlockquote().run()
                            }
                            className={cn(
                                editor.isActive('blockquote') && 'bg-accent',
                            )}
                            title="Blockquote"
                        >
                            <Quote className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor.chain().focus().toggleCodeBlock().run()
                            }
                            className={cn(
                                editor.isActive('codeBlock') && 'bg-accent',
                            )}
                            title="Code Block"
                        >
                            <Code className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor.chain().focus().setHorizontalRule().run()
                            }
                            title="Horizontal Rule"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        <div className="mx-1 h-6 w-px bg-border" />

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowLinkInput(!showLinkInput)}
                            className={cn(
                                editor.isActive('link') && 'bg-accent',
                            )}
                            title="Add Link"
                        >
                            <LinkIcon className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            title="Add Image"
                        >
                            <ImageIcon className="h-4 w-4" />
                        </Button>

                        <div className="mx-1 h-6 w-px bg-border" />

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .clearNodes()
                                    .unsetAllMarks()
                                    .run()
                            }
                            title="Clear Formatting"
                        >
                            <RemoveFormatting className="h-4 w-4" />
                        </Button>

                        <div className="mx-1 h-6 w-px bg-border" />

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            title="Undo"
                        >
                            <Undo className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            title="Redo"
                        >
                            <Redo className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="edit">
                    <EditorContent
                        editor={editor}
                        className="min-h-[200px] max-w-none p-4 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror_li]:ml-4 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6"
                    />
                </TabsContent>
                <TabsContent value="preview">
                    <div
                        className="prose prose-sm prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 max-w-none p-4"
                        dangerouslySetInnerHTML={{ __html: value }}
                    />
                </TabsContent>
            </Tabs>

            {showColorPicker && (
                <div className="flex items-center gap-2 border-b bg-muted/30 p-3">
                    <Label
                        htmlFor="text-color"
                        className="text-sm whitespace-nowrap"
                    >
                        Text Color:
                    </Label>
                    <Input
                        id="text-color"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-10 w-20"
                    />
                    <Input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                    />
                    <Button type="button" size="sm" onClick={applyColor}>
                        Apply
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setShowColorPicker(false);
                            setTextColor('#000000');
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            )}

            {showLinkInput && (
                <div className="flex items-center gap-2 border-b bg-muted/30 p-3">
                    <Label
                        htmlFor="link-url"
                        className="text-sm whitespace-nowrap"
                    >
                        Link URL:
                    </Label>
                    <Input
                        id="link-url"
                        type="url"
                        placeholder="https://example.com"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                setLink();
                            }
                        }}
                        className="flex-1"
                    />
                    <Button type="button" size="sm" onClick={setLink}>
                        Add
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setShowLinkInput(false);
                            setLinkUrl('');
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
}
