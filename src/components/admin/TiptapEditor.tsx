'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link as LinkIcon,
    Image as ImageIcon,
    Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-rose-500 underline hover:text-rose-600 font-medium',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg shadow-lg my-8 max-w-full h-auto',
                },
            }),
            TextStyle,
            Color,
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] p-6 text-gray-700',
            },
        },
    });

    // Update editor content when prop changes (e.g., when editing existing news)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [editor, content]);

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = window.prompt('Enter URL');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('Enter image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setColor = () => {
        const color = window.prompt('Enter color (e.g., #ff0000 or red)');
        if (color) {
            editor.chain().focus().setColor(color).run();
        }
    };

    return (
        <div className="border-2 border-gray-200 rounded-lg bg-white shadow-sm">
            {/* Toolbar */}
            <div className="border-b-2 border-gray-200 p-3 flex flex-wrap gap-1 bg-gradient-to-r from-gray-50 to-white sticky top-[84px] z-10">
                {/* Text Formatting */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Bold"
                >
                    <Bold size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Italic"
                >
                    <Italic size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Underline"
                >
                    <UnderlineIcon size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Strikethrough"
                >
                    <Strikethrough size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Inline Code"
                >
                    <Code size={18} />
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Headings */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Heading 1"
                >
                    <Heading1 size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Heading 2"
                >
                    <Heading2 size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Heading 3"
                >
                    <Heading3 size={18} />
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Lists */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Bullet List"
                >
                    <List size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Numbered List"
                >
                    <ListOrdered size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Code Block"
                >
                    <Code size={18} className="mr-1" />
                    Block
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Blockquote"
                >
                    <Quote size={18} />
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Alignment */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Align Left"
                >
                    <AlignLeft size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Align Center"
                >
                    <AlignCenter size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Align Right"
                >
                    <AlignRight size={18} />
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Insert */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addLink}
                    className={editor.isActive('link') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
                    title="Add Link"
                >
                    <LinkIcon size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addImage}
                    className="hover:bg-gray-100"
                    title="Add Image"
                >
                    <ImageIcon size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={setColor}
                    className="hover:bg-gray-100"
                    title="Text Color"
                >
                    <Palette size={18} />
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Undo/Redo */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo"
                >
                    <Undo size={18} />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Redo"
                >
                    <Redo size={18} />
                </Button>
            </div>

            {/* Editor Content */}
            <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
                <EditorContent editor={editor} />
            </div>

            {/* Global Styles matching ArticleContent */}
            <style jsx global>{`
                /* Tiptap Editor Styles - Matching ArticleContent */
                .ProseMirror {
                    outline: none;
                }
                
                .ProseMirror h1 {
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: #111827;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }
                
                .ProseMirror h2 {
                    font-size: 1.875rem;
                    font-weight: 700;
                    color: #111827;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                }
                
                .ProseMirror h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin-top: 2rem;
                    margin-bottom: 0.75rem;
                    line-height: 1.4;
                }
                
                .ProseMirror p {
                    margin-bottom: 1.25rem;
                    line-height: 1.75;
                    color: #374151;
                }
                
                .ProseMirror ul,
                .ProseMirror ol {
                    margin-bottom: 1.25rem;
                    padding-left: 1.5rem;
                }
                
                .ProseMirror li {
                    margin-bottom: 0.5rem;
                    line-height: 1.75;
                    color: #374151;
                }
                
                .ProseMirror ul li {
                    list-style-type: disc;
                }
                
                .ProseMirror ol li {
                    list-style-type: decimal;
                }
                
                .ProseMirror strong {
                    font-weight: 600;
                    color: #111827;
                }
                
                .ProseMirror em {
                    font-style: italic;
                    color: #4b5563;
                }
                
                .ProseMirror code {
                    background: #1f2937;
                    color: #f3f4f6;
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.25rem;
                    font-size: 0.875em;
                    font-family: 'Courier New', monospace;
                }
                
                .ProseMirror pre {
                    background: #1f2937;
                    color: #f3f4f6;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                }
                
                .ProseMirror pre code {
                    background: transparent;
                    padding: 0;
                    color: #f3f4f6;
                }
                
                .ProseMirror a {
                    color: #f43f5e;
                    text-decoration: underline;
                    font-weight: 500;
                }
                
                .ProseMirror a:hover {
                    color: #e11d48;
                }
                
                .ProseMirror blockquote {
                    border-left: 4px solid #f43f5e;
                    padding-left: 1rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                    color: #4b5563;
                    background: #f9fafb;
                    padding: 1rem;
                    border-radius: 0 0.5rem 0.5rem 0;
                }
                
                .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    margin: 2rem 0;
                }
                
                .ProseMirror hr {
                    border: none;
                    border-top: 2px solid #e5e7eb;
                    margin: 2rem 0;
                }
                
                /* Placeholder */
                .ProseMirror p.is-empty:first-child::before {
                    content: 'Start writing your content here... Use the toolbar above to format text, add headings, lists, links, and images.';
                    float: left;
                    color: #9ca3af;
                    pointer-events: none;
                    height: 0;
                }
                
                /* Selection */
                .ProseMirror ::selection {
                    background: #fecdd3;
                }
                
                /* Focus styles for lists */
                .ProseMirror ul:focus,
                .ProseMirror ol:focus {
                    outline: none;
                }
                
                /* Table styles (if you add table support later) */
                .ProseMirror table {
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                    width: 100%;
                }
                
                .ProseMirror table td,
                .ProseMirror table th {
                    border: 1px solid #e5e7eb;
                    padding: 0.5rem 1rem;
                }
                
                .ProseMirror table th {
                    background: #f9fafb;
                    font-weight: 600;
                    text-align: left;
                }
            `}</style>
        </div>
    );
};

export default TiptapEditor;
