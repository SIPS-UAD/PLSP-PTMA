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

export const AuthLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      auth: {
        default: 'public',
        parseHTML: (element) => element.getAttribute('data-auth') || 'public',
        renderHTML: (attributes) => {
          if (attributes.auth === 'protected') {
            return { 'data-auth': 'protected' };
          }
          return {};
        },
      },
    };
  },
});

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => {
          const width = element.getAttribute('width') || element.style.width;
          return width ? parseInt(width) : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {};
          }
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => {
          const height = element.getAttribute('height') || element.style.height;
          return height ? parseInt(height) : null;
        },
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
      container.className = 'relative inline-block group my-2';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || '';
      img.className = 'max-w-full h-auto rounded-lg border border-gray-200';

      // Apply saved dimensions or set initial size
      if (node.attrs.width) {
        img.style.width = node.attrs.width + 'px';
      } else {
        // Set a default max-width for new images
        img.style.maxWidth = '100%';
      }

      if (node.attrs.height) {
        img.style.height = node.attrs.height + 'px';
      } else {
        img.style.height = 'auto';
      }

      const resizeHandle = document.createElement('div');
      resizeHandle.className =
        'absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity z-10';
      resizeHandle.title = 'Drag to resize';

      const deleteButton = document.createElement('button');
      deleteButton.className =
        'absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center hover:bg-red-600';
      deleteButton.innerHTML = '×';
      deleteButton.title = 'Delete image';
      deleteButton.onclick = (e) => {
        e.preventDefault();
        const pos = getPos();
        if (typeof pos === 'number') {
          editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + node.nodeSize })
            .run();
        }
      };

      let isResizing = false;
      let startX = 0;
      let startWidth = 0;
      let startHeight = 0;

      resizeHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing = true;
        startX = e.clientX;
        startWidth = img.offsetWidth;
        startHeight = img.offsetHeight;

        const onMouseMove = (e: MouseEvent) => {
          if (!isResizing) return;

          const deltaX = e.clientX - startX;
          const width = startWidth + deltaX;

          if (width > 100) {
            // Maintain aspect ratio
            const aspectRatio = startHeight / startWidth;
            const height = width * aspectRatio;

            img.style.width = width + 'px';
            img.style.height = height + 'px';
          }
        };

        const onMouseUp = () => {
          if (!isResizing) return;
          isResizing = false;

          const pos = getPos();
          if (typeof pos === 'number') {
            editor
              .chain()
              .focus()
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

      // Make the image selectable
      img.onclick = () => {
        const pos = getPos();
        if (typeof pos === 'number') {
          editor.chain().focus().setNodeSelection(pos).run();
        }
      };

      container.appendChild(img);
      container.appendChild(resizeHandle);
      container.appendChild(deleteButton);

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
  const [isProtected, setIsProtected] = useState(false);
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
      AuthLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      ResizableImage.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
        inline: false,
        allowBase64: true, // Allow base64 images
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
        class:
          'prose prose-sm max-w-none p-4 focus:outline-none [&_h1]:text-3xl [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:mb-2 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-2 [&_li]:mb-1 min-h-[200px]',
      },
    },
  });
  const prevValueRef = useRef(value);

  if (editor && value !== prevValueRef.current && value !== editor.getHTML()) {
    editor.commands.setContent(value);
    prevValueRef.current = value;
  }

  const setLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setShowLinkInput(false);
      return;
    }

    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;

    if (!hasSelection) {
      editor
        .chain()
        .focus()
        .insertContent(
          `<a href="${linkUrl}" data-auth="${isProtected ? 'protected' : 'public'}">${linkUrl}</a>`,
        )
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({
          href: linkUrl,
          auth: isProtected ? 'protected' : 'public',
        })
        .run();
    }

    setLinkUrl('');
    setIsProtected(false);
    setShowLinkInput(false);
  }, [editor, isProtected, linkUrl]);

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
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <Tabs
        value={activeTab}
        onValueChange={(v: string) => setActiveTab(v as 'edit' | 'preview')}
        className="w-full"
      >
        <div className="flex items-center justify-between border-b bg-muted/50 p-2">
          <div className="flex flex-wrap gap-1">
            {/* Text Formatting */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(editor.isActive('bold') && 'bg-gray-300')}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(editor.isActive('italic') && 'bg-gray-300')}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={cn(editor.isActive('underline') && 'bg-gray-300')}
              title="Underline"
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(editor.isActive('strike') && 'bg-gray-300')}
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
                      editor.getAttributes('textStyle').color || '#000000',
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
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(
                editor.isActive('heading', { level: 1 }) && 'bg-gray-300',
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
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn(
                editor.isActive('heading', { level: 2 }) && 'bg-gray-300',
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
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={cn(
                editor.isActive('heading', { level: 3 }) && 'bg-gray-300',
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
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(editor.isActive('bulletList') && 'bg-gray-300')}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(editor.isActive('orderedList') && 'bg-gray-300')}
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
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={cn(
                editor.isActive({ textAlign: 'left' }) && 'bg-gray-300',
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
                editor.chain().focus().setTextAlign('center').run()
              }
              className={cn(
                editor.isActive({ textAlign: 'center' }) && 'bg-gray-300',
              )}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={cn(
                editor.isActive({ textAlign: 'right' }) && 'bg-gray-300',
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
                editor.chain().focus().setTextAlign('justify').run()
              }
              className={cn(
                editor.isActive({ textAlign: 'justify' }) && 'bg-gray-300',
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
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(editor.isActive('blockquote') && 'bg-gray-300')}
              title="Blockquote"
            >
              <Quote className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={cn(editor.isActive('codeBlock') && 'bg-gray-300')}
              title="Code Block"
            >
              <Code className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
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
              className={cn(editor.isActive('link') && 'bg-gray-300')}
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
                editor.chain().focus().clearNodes().unsetAllMarks().run()
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
            className="min-h-[200px] max-w-none [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror_h1]:mt-0 [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:mt-0 [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:mt-0 [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_ol]:mb-2 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_p]:mt-0 [&_.ProseMirror_p]:mb-2 [&_.ProseMirror_ul]:mb-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6"
          />
        </TabsContent>
        <TabsContent value="preview">
          <div
            className="prose prose-sm max-w-none p-4 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </TabsContent>
      </Tabs>

      {showColorPicker && (
        <div className="flex items-center gap-2 border-b bg-muted/30 p-3">
          <Label htmlFor="text-color" className="text-sm whitespace-nowrap">
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
          <Label htmlFor="link-url" className="text-sm whitespace-nowrap">
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
          <Label className="flex items-center gap-1 text-sm">
            <Input
              type="checkbox"
              checked={isProtected}
              onChange={(e) => setIsProtected(e.target.checked)}
            />
            Protected
          </Label>
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
