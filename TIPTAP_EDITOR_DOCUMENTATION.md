# Enhanced Tiptap Editor Documentation

## Overview

The TiptapEditor component has been updated to match the styling of the ArticleContent component, ensuring a consistent WYSIWYG experience - what you see in the editor is exactly what appears in the published article.

---

## Features

### ✅ WYSIWYG Styling

The editor now uses the exact same styles as ArticleContent, providing a true "What You See Is What You Get" experience.

### ✅ Complete Formatting Toolbar

- **Text Formatting:** Bold, Italic, Underline, Strikethrough, Inline Code
- **Headings:** H1, H2, H3
- **Lists:** Bullet lists, Numbered lists
- **Blocks:** Code blocks, Blockquotes
- **Alignment:** Left, Center, Right
- **Media:** Links, Images
- **Colors:** Custom text colors
- **History:** Undo, Redo

### ✅ Consistent Design System

- Active buttons highlight in rose-100/rose-700 (matching site theme)
- Hover effects on all buttons
- Organized toolbar with visual separators
- Larger icons (18px) for better visibility
- Sticky toolbar stays visible while scrolling

---

## Styling Match with ArticleContent

### Headings

```css
H1: 2.25rem (36px), bold, #111827, mt-2.5rem
H2: 1.875rem (30px), bold, #111827, mt-2.5rem
H3: 1.5rem (24px), semibold, #1f2937, mt-2rem
```

### Typography

```css
Paragraphs: #374151, line-height 1.75, mb-1.25rem
Lists: Proper indentation with disc/decimal markers
Strong: #111827, font-weight 600
Emphasis: italic, #4b5563
```

### Code Blocks

```css
Background: #1f2937 (dark gray)
Color: #f3f4f6 (light gray)
Padding: 1rem
Border-radius: 0.5rem
Monospace font
```

### Links

```css
Color: #f43f5e (rose-500)
Hover: #e11d48 (rose-600)
Underlined, font-weight 500
```

### Blockquotes

```css
Border-left: 4px solid rose-500
Background: #f9fafb (gray-50)
Padding: 1rem
Border-radius: 0 0.5rem 0.5rem 0
Italic text
```

### Images

```css
Max-width: 100%
Border-radius: 0.5rem
Box-shadow for depth
Margin: 2rem 0
```

---

## Usage

### Basic Implementation

```tsx
import TiptapEditor from '@/components/admin/TiptapEditor'

const [content, setContent] = useState('<p>Initial content</p>')

<TiptapEditor
    content={content}
    onChange={setContent}
/>
```

### With Form

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // content now contains formatted HTML
  console.log(content);
};

<form onSubmit={handleSubmit}>
  <TiptapEditor content={content} onChange={setContent} />
  <button type="submit">Save</button>
</form>;
```

---

## Props

### `content: string`

- **Type:** `string`
- **Required:** Yes
- **Description:** Initial HTML content to display in the editor
- **Example:** `"<p>Hello world</p>"`

### `onChange: (content: string) => void`

- **Type:** Function
- **Required:** Yes
- **Description:** Callback fired when content changes
- **Parameters:** Updated HTML content as string
- **Example:** `(html) => setFormData({...formData, content: html})`

---

## Toolbar Reference

### Text Formatting Row

| Button | Shortcut             | Action               |
| ------ | -------------------- | -------------------- |
| **B**  | Ctrl/Cmd + B         | Toggle bold          |
| _I_    | Ctrl/Cmd + I         | Toggle italic        |
| U      | Ctrl/Cmd + U         | Toggle underline     |
| ~~S~~  | Ctrl/Cmd + Shift + X | Toggle strikethrough |
| `<>`   | Ctrl/Cmd + E         | Toggle inline code   |

### Headings Row

| Button | Shortcut           | Action    |
| ------ | ------------------ | --------- |
| H1     | Ctrl/Cmd + Alt + 1 | Heading 1 |
| H2     | Ctrl/Cmd + Alt + 2 | Heading 2 |
| H3     | Ctrl/Cmd + Alt + 3 | Heading 3 |

### Lists and Blocks Row

| Button     | Shortcut             | Action        |
| ---------- | -------------------- | ------------- |
| • List     | Ctrl/Cmd + Shift + 8 | Bullet list   |
| 1. List    | Ctrl/Cmd + Shift + 7 | Numbered list |
| Code Block | Ctrl/Cmd + Alt + C   | Code block    |
| Quote      | Ctrl/Cmd + Shift + B | Blockquote    |

### Alignment Row

| Button       | Action            |
| ------------ | ----------------- |
| Align Left   | Left align text   |
| Align Center | Center align text |
| Align Right  | Right align text  |

### Media and Tools Row

| Button | Action            |
| ------ | ----------------- |
| Link   | Insert/edit link  |
| Image  | Insert image      |
| Color  | Change text color |

### History Row

| Button | Shortcut     | Action             |
| ------ | ------------ | ------------------ |
| Undo   | Ctrl/Cmd + Z | Undo last action   |
| Redo   | Ctrl/Cmd + Y | Redo undone action |

---

## Advanced Features

### Adding Links

1. Select text
2. Click Link button
3. Enter URL in prompt
4. Link is created with rose-500 color

### Adding Images

1. Click Image button
2. Enter image URL in prompt
3. Image is inserted with proper styling
4. Images are responsive and have shadow

### Text Colors

1. Select text
2. Click Color button
3. Enter color (hex, rgb, or name)
4. Text color is applied

### Code Blocks

1. Click Code Block button
2. Type or paste code
3. Code appears with dark theme styling
4. Proper syntax preservation

---

## Keyboard Shortcuts

All standard Tiptap/ProseMirror shortcuts work:

### Text Formatting

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + U` - Underline

### Headings

- `Ctrl/Cmd + Alt + 1` - Heading 1
- `Ctrl/Cmd + Alt + 2` - Heading 2
- `Ctrl/Cmd + Alt + 3` - Heading 3

### Lists

- `Ctrl/Cmd + Shift + 8` - Bullet list
- `Ctrl/Cmd + Shift + 7` - Numbered list

### Other

- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Y` or `Ctrl/Cmd + Shift + Z` - Redo
- `Enter` in list - New list item
- `Shift + Enter` - Soft break (line break without new paragraph)

---

## Styling Customization

If you need to customize the editor styling, edit these sections in `TiptapEditor.tsx`:

### Editor Container

```tsx
<div className="border-2 border-gray-200 rounded-lg bg-white shadow-sm">
```

### Toolbar

```tsx
<div className="border-b-2 border-gray-200 p-3 flex flex-wrap gap-1 bg-gradient-to-r from-gray-50 to-white sticky top-0 z-10">
```

### Active Button State

```tsx
className={editor.isActive('bold') ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'hover:bg-gray-100'}
```

### Editor Content Area

```tsx
<div className="min-h-[400px] max-h-[600px] overflow-y-auto">
```

---

## Style Inheritance

The editor inherits styles from:

1. **Tailwind Prose:** Base typography styles
2. **Custom ProseMirror Styles:** Specific to editor interaction
3. **ArticleContent Styles:** Matching published appearance

All three work together to provide a consistent experience.

---

## Integration with Forms

### News Form Example

```tsx
<TiptapEditor
  content={formData.content}
  onChange={(html) => setFormData({ ...formData, content: html })}
/>
```

### Blog Form Example

```tsx
<TiptapEditor
  content={post.body}
  onChange={(html) => setPost({ ...post, body: html })}
/>
```

### Event Form Example

```tsx
<TiptapEditor
  content={event.description}
  onChange={(html) => setEvent({ ...event, description: html })}
/>
```

---

## Current Usage

The TiptapEditor is currently used in:

- ✅ News Form (`src/components/admin/NewsForm.tsx`)
- ✅ Event Form (`src/components/admin/EventForm.tsx`)

Can be used in:

- 📝 Blog Form
- 📝 Announcement Form
- 📝 Tutorial Form
- 📝 Any content management form

---

## Comparison: Editor vs. Published

### In Editor

```html
<h2>My Heading</h2>
<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
```

### Published (with ArticleContent)

Renders with identical styling - same colors, spacing, and typography.

---

## Best Practices

### 1. Use Semantic HTML

- Use H2 for main sections
- Use H3 for subsections
- Don't skip heading levels

### 2. Format Code Properly

- Use inline code for commands: `npm install`
- Use code blocks for multiple lines
- Consider syntax highlighting for complex code

### 3. Structure Content

- Break long text into paragraphs
- Use lists for multiple points
- Use blockquotes for emphasis

### 4. Images

- Use descriptive alt text (add manually in HTML if needed)
- Optimize images before uploading
- Use appropriate image sizes

### 5. Links

- Use descriptive link text
- Test links before publishing
- Consider opening external links in new tab

---

## Troubleshooting

### Issue: Styling doesn't match published article

**Solution:** Clear browser cache and refresh. The styles are now identical.

### Issue: Toolbar buttons not responding

**Solution:** Check if editor has focus. Click inside editor area first.

### Issue: Can't undo/redo

**Solution:** Make sure you're using the toolbar buttons or keyboard shortcuts.

### Issue: Images not showing

**Solution:** Verify image URL is accessible and uses https://.

### Issue: Content looks different on mobile

**Solution:** All styles are responsive - test on actual device or browser dev tools.

---

## Technical Details

### Extensions Used

- **StarterKit:** Base editing functionality
- **Underline:** Underline text support
- **TextAlign:** Text alignment options
- **Link:** Hyperlink support
- **Image:** Image insertion
- **TextStyle:** Text styling foundation
- **Color:** Text color support

### Bundle Size

- Total: ~150KB (gzipped)
- Lazy loaded when admin form opens
- Does not affect public pages

### Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Touch-friendly

---

## Future Enhancements

Potential features to add:

1. **Table Support**
   - Add table extension
   - Table formatting toolbar
2. **Media Embed**

   - YouTube video embeds
   - Tweet embeds
   - General iframe support

3. **Advanced Code**

   - Syntax highlighting in editor
   - Language selection dropdown

4. **Collaboration**

   - Real-time co-editing
   - Comments and suggestions

5. **Templates**

   - Pre-built content templates
   - Quick insert sections

6. **Character/Word Count**
   - Live character counter
   - Reading time estimate

---

## Related Documentation

- `REUSABLE_COMPONENTS_DOCUMENTATION.md` - ArticleContent component
- `NEWS_DATABASE_INTEGRATION.md` - News system integration
- `QUICKSTART_ARTICLE_COMPONENTS.md` - Using article components

---

_Last Updated: October 2025_
_Version: 2.0 - Enhanced with ArticleContent styling_
