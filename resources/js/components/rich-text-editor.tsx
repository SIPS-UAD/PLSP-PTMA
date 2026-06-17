import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TableKit } from '@tiptap/extension-table';
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
  Table,
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
      align: {
        default: 'left',
        parseHTML: (element) => {
          const parentAlign = element.parentElement?.getAttribute('data-align');
          const elementAlign = element.getAttribute('data-align');
          return parentAlign || elementAlign || 'left';
        },
        renderHTML: (attributes) => {
          return { 'data-align': attributes.align };
        },
      },
    };
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div');
      const align = node.attrs.align || 'left';

      // Set container alignment
      const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      };

      container.className = `relative my-2 w-full ${alignmentClasses[align as keyof typeof alignmentClasses] || 'text-left'}`;

      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'inline-block relative group';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || '';
      img.className = 'max-w-full h-auto rounded-lg border border-gray-200';

      if (node.attrs.width) {
        img.style.width = node.attrs.width + 'px';
      } else {
        img.style.maxWidth = '100%';
      }

      if (node.attrs.height) {
        img.style.height = node.attrs.height + 'px';
      } else {
        img.style.height = 'auto';
      }

      // Alignment buttons
      const alignmentControls = document.createElement('div');
      alignmentControls.className =
        'absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white rounded-lg shadow-lg p-1';

      const createAlignButton = (alignType: string, icon: string) => {
        const button = document.createElement('button');
        button.className = `w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 ${node.attrs.align === alignType ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`;
        button.innerHTML = icon;
        button.title = `Align ${alignType}`;
        button.onclick = (e) => {
          e.preventDefault();
          const pos = getPos();
          if (typeof pos === 'number') {
            editor
              .chain()
              .focus()
              .setNodeSelection(pos)
              .updateAttributes('image', { align: alignType })
              .run();
          }
        };
        return button;
      };

      alignmentControls.appendChild(createAlignButton('left', '←'));
      alignmentControls.appendChild(createAlignButton('center', '↔'));
      alignmentControls.appendChild(createAlignButton('right', '→'));

      const resizeHandle = document.createElement('div');
      resizeHandle.className =
        'absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity z-10 translate-x-1/2 translate-y-1/2';
      resizeHandle.title = 'Drag to resize';

      const deleteButton = document.createElement('button');
      deleteButton.className =
        'absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center hover:bg-red-600 text-lg leading-none';
      deleteButton.innerHTML = '×';
      deleteButton.title = 'Delete image';
      deleteButton.style.lineHeight = '1';
      deleteButton.style.paddingBottom = '2px';
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

      img.onclick = () => {
        const pos = getPos();
        if (typeof pos === 'number') {
          editor.chain().focus().setNodeSelection(pos).run();
        }
      };

      imgWrapper.appendChild(img);
      imgWrapper.appendChild(resizeHandle);
      imgWrapper.appendChild(deleteButton);
      imgWrapper.appendChild(alignmentControls);
      container.appendChild(imgWrapper);

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

          const newAlign = updatedNode.attrs.align || 'left';
          const alignmentClasses = {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
          };
          container.className = `relative my-2 w-full ${alignmentClasses[newAlign as keyof typeof alignmentClasses] || 'text-left'}`;

          alignmentControls.querySelectorAll('button').forEach((btn, index) => {
            const alignTypes = ['left', 'center', 'right'];
            if (alignTypes[index] === newAlign) {
              btn.className =
                'w-6 h-6 flex items-center justify-center rounded bg-blue-100 text-blue-600';
            } else {
              btn.className =
                'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600';
            }
          });

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
  const [showTableInput, setShowTableInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isProtected, setIsProtected] = useState(false);
  const [textColor, setTextColor] = useState('#000000');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      TableKit.configure({
        table: {
          resizable: true,
          HTMLAttributes: {
            class: 'my-4 w-full border-collapse',
          },
        },
        tableHeader: {
          HTMLAttributes: {
            class: 'border border-gray-300 bg-gray-100 p-2 font-bold',
          },
        },
        tableRow: {
          HTMLAttributes: {
            class: 'border border-gray-300',
          },
        },
        tableCell: {
          HTMLAttributes: {
            class: 'border border-gray-300 p-2',
          },
        },
      }),
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
          'prose prose-sm max-w-none p-4 focus:outline-none [&_h1]:text-3xl [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:mb-2 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-2 [&_li]:mb-1 min-h-[200px] [&_.tableWrapper]:overflow-x-auto [&_.resize-cursor]:cursor-col-resize [&_.column-resize-handle]:absolute [&_.column-resize-handle]:right-[-2px] [&_.column-resize-handle]:top-0 [&_.column-resize-handle]:bottom-0 [&_.column-resize-handle]:w-1 [&_.column-resize-handle]:bg-blue-500 [&_.column-resize-handle]:pointer-events-none',
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

  const insertTable = useCallback(() => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true })
      .run();

    setShowTableInput(false);
    setTableRows(3);
    setTableCols(3);
  }, [editor, tableRows, tableCols]);

  if (!editor) {
    return null;
  }


  return (
    <div className={cn('overflow-hidden rounded-lg border', className)}>
      {/* Add custom styles for table resizing */}
      <style>{`
        .ProseMirror .tableWrapper {
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }

        .ProseMirror td,
        .ProseMirror th {
          min-width: 1em;
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }

        .ProseMirror th {
          background-color: #f3f4f6;
          font-weight: bold;
        }

        .ProseMirror .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }

        .ProseMirror .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: -2px;
          width: 4px;
          background-color: #3b82f6;
          pointer-events: none;
        }

        .ProseMirror.resize-cursor {
          cursor: col-resize;
        }
      `}</style>

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

            {/* Table Controls */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowTableInput(!showTableInput)}
              className={cn(editor.isActive('table') && 'bg-gray-300')}
              title="Insert Table"
            >
              <Table className="h-4 w-4" />
            </Button>

            {editor.isActive('table') && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                  title="Add Column Before"
                >
                  <span className="text-xs">Col←</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                  title="Add Column After"
                >
                  <span className="text-xs">Col→</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                  title="Delete Column"
                >
                  <span className="text-xs">-Col</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                  title="Add Row Before"
                >
                  <span className="text-xs">Row↑</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                  title="Add Row After"
                >
                  <span className="text-xs">Row↓</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().deleteRow().run()}
                  title="Delete Row"
                >
                  <span className="text-xs">-Row</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().deleteTable().run()}
                  title="Delete Table"
                >
                  <span className="text-xs">Del</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeaderColumn().run()
                  }
                  title="Toggle Header Column"
                >
                  <span className="text-xs">H-Col</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                  title="Toggle Header Row"
                >
                  <span className="text-xs">H-Row</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeaderCell().run()
                  }
                  title="Toggle Header Cell"
                >
                  <span className="text-xs">H-Cell</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().mergeOrSplit().run()}
                  title="Merge or Split"
                >
                  <span className="text-xs">⊕/⊗</span>
                </Button>
              </>
            )}

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
            className="min-h-[200px] max-w-none [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none"
          />
        </TabsContent>
        <TabsContent value="preview">
          <div
            className="prose prose-sm max-w-none p-4 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_ol]:list-decimal [&_ol]:pl-6 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:p-2 [&_th]:font-bold [&_ul]:list-disc [&_ul]:pl-6"
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

      {showTableInput && (
        <div className="flex items-center gap-2 border-b bg-muted/30 p-3">
          <Label htmlFor="table-rows" className="text-sm whitespace-nowrap">
            Rows:
          </Label>
          <Input
            id="table-rows"
            type="number"
            min="1"
            max="20"
            value={tableRows}
            onChange={(e) => setTableRows(parseInt(e.target.value) || 1)}
            className="w-20"
          />
          <Label htmlFor="table-cols" className="text-sm whitespace-nowrap">
            Columns:
          </Label>
          <Input
            id="table-cols"
            type="number"
            min="1"
            max="20"
            value={tableCols}
            onChange={(e) => setTableCols(parseInt(e.target.value) || 1)}
            className="w-20"
          />
          <Button type="button" size="sm" onClick={insertTable}>
            Insert
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowTableInput(false);
              setTableRows(3);
              setTableCols(3);
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
