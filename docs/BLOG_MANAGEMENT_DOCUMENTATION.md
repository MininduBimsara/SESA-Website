# Blog Management System Documentation

## Overview
A complete blog management system for the SESA website admin panel, featuring full CRUD operations, rich text editing, and a professional admin interface styled consistently with the news management system.

## Features

### ✨ Key Features
- **Full CRUD Operations**: Create, Read, Update, and Delete blog posts
- **Rich Text Editor**: TipTap-based HTML editor with formatting options
- **Image Upload**: Support for featured images with file size validation
- **Tag Management**: Add and manage multiple tags per post
- **Category System**: Organize posts by categories (Technical, Career, Events, Tutorials, Community, Insights)
- **Draft System**: Save posts as drafts before publishing
- **Featured Posts**: Mark posts as featured for homepage display
- **Search & Filter**: Real-time search and filter by publication status
- **Preview Mode**: Preview posts before publishing
- **Statistics Dashboard**: View total posts, published, drafts, and featured counts
- **Read Time**: Optional read time field for better user experience

## File Structure

```
src/
├── types/
│   └── blog.ts                      # Blog TypeScript interface
├── components/
│   └── admin/
│       └── BlogForm.tsx              # Blog creation/editing form
├── app/
│   ├── admin/
│   │   └── blogs/
│   │       └── page.tsx              # Main blog management page
│   └── api/
│       └── blogs/
│           ├── route.ts              # GET all, POST create
│           ├── [id]/
│           │   └── route.ts          # GET, PUT, DELETE by ID
│           └── slug/
│               └── [slug]/
│                   └── route.ts      # GET by slug (for public pages)
prisma/
└── schema.prisma                     # Database schema with Blog model
```

## Database Schema

```prisma
model Blog {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  content     String   // HTML content
  excerpt     String?
  slug        String   @unique
  author      String
  featured    Boolean  @default(false)
  published   Boolean  @default(false)
  image       String?
  category    String?
  tags        String[]
  readTime    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## API Endpoints

### GET /api/blogs
Fetch all blog posts (sorted by creation date, descending).

**Response**: Array of blog objects

### POST /api/blogs
Create a new blog post.

**Request Body**:
```json
{
  "title": "My Blog Post",
  "content": "<p>HTML content...</p>",
  "excerpt": "Short summary",
  "slug": "my-blog-post",
  "author": "John Doe",
  "category": "technical",
  "tags": ["React", "Next.js"],
  "image": "data:image/...",
  "readTime": "5 min read",
  "featured": false,
  "published": true
}
```

**Validation**:
- `title`, `content`, and `author` are required
- Slug must be unique and lowercase with hyphens
- Image max size: 5MB
- Excerpt max length: 300 characters

**Response**: Created blog object (201)

**Errors**:
- 400: Missing required fields
- 409: Slug already exists

### GET /api/blogs/[id]
Fetch a single blog post by ID.

**Response**: Blog object or 404 if not found

### PUT /api/blogs/[id]
Update an existing blog post.

**Request Body**: Same as POST (all fields optional except required validations)

**Response**: Updated blog object

**Errors**:
- 404: Blog not found
- 409: Slug already exists

### DELETE /api/blogs/[id]
Delete a blog post.

**Response**: Success message

**Errors**:
- 404: Blog not found

### GET /api/blogs/slug/[slug]
Fetch a blog post by its slug (used for public pages).

**Response**: Blog object or 404 if not found

## Admin Interface

### Main Page (`/admin/blogs`)

#### Statistics Cards
- **Total Posts**: Count of all blog posts
- **Published**: Count of published posts
- **Drafts**: Count of draft posts
- **Featured**: Count of featured posts

#### Search & Filter
- Real-time search by title, author, or tags
- Filter by status: All, Published, Drafts

#### Blog Table
Displays:
- Featured image thumbnail (if available)
- Title with featured star indicator
- Excerpt preview
- Read time (if provided)
- Author name
- Category badge
- Publication status (Published/Draft)
- Creation date
- Action buttons: Preview, Edit, Delete

### Blog Form (`BlogForm.tsx`)

#### Form Fields

1. **Title*** (Required)
   - Text input
   - Auto-generates slug on blur

2. **Slug*** (Required)
   - Text input (lowercase only)
   - Validation: Only lowercase letters, numbers, and hyphens
   - Preview URL shown below field

3. **Content*** (Required)
   - TipTap rich text editor
   - Toggle preview mode
   - Supports: Headings, bold, italic, lists, code blocks, links, images, etc.

4. **Excerpt** (Optional)
   - Textarea
   - Max 300 characters
   - Character counter displayed

5. **Author*** (Required)
   - Text input

6. **Category** (Optional)
   - Dropdown select
   - Options: Technical, Career, Events, Tutorials, Community, Insights

7. **Read Time** (Optional)
   - Text input
   - Example: "5 min read"

8. **Tags** (Optional)
   - Dynamic tag input
   - Press Enter or click "Add Tag" to add
   - Click X to remove tags
   - Indigo-themed badges

9. **Featured Image** (Optional)
   - File upload
   - Max size: 5MB
   - Recommended: 1200x630px
   - Preview shown after upload

10. **Checkboxes**
    - Featured Post
    - Published

#### Form Actions
- **Cancel**: Close form without saving
- **Save/Update Post**: Submit form with validation
- **Show/Hide Preview**: Toggle content preview

## Styling & Theme

### Color Scheme
- Primary: Indigo-600/700 (matches blog theme)
- Success: Green-600 (for published status)
- Warning: Amber-600 (for featured items)
- Danger: Red-600 (for delete actions)
- Neutral: Gray shades

### Components
- Uses shadcn/ui components (Button, Card)
- Lucide React icons
- Tailwind CSS utility classes
- Responsive design (mobile-friendly)

## Validations

### Frontend Validations
1. **Title**: Cannot be empty
2. **Content**: Cannot be empty or just `<p><br></p>`
3. **Slug**: 
   - Cannot be empty
   - Must match pattern: `/^[a-z0-9-]+$/`
4. **Author**: Cannot be empty
5. **Excerpt**: Max 300 characters
6. **Image**: Max 5MB file size

### Backend Validations
1. Required fields: title, content, author
2. Unique slug constraint (database level)
3. Safe HTML content (stored as-is, sanitize on display if needed)

## Usage Examples

### Creating a New Blog Post
1. Navigate to `/admin/blogs`
2. Click "Create Post" button
3. Fill in required fields (Title, Content, Author)
4. Optionally add:
   - Excerpt for better SEO
   - Category and tags for organization
   - Featured image
   - Read time estimate
5. Toggle "Published" to publish immediately (or leave as draft)
6. Click "Save Post"

### Editing a Post
1. Click the Edit icon in the blog table
2. Modify desired fields
3. Click "Update Post"

### Deleting a Post
1. Click the Delete icon in the blog table
2. Confirm deletion in the dialog
3. Post is permanently removed

### Previewing a Post
1. Click the Eye icon in the blog table
2. View full rendered post in modal
3. Close to return to table

### Searching & Filtering
1. Type in search box to filter by title, author, or tags
2. Click status buttons to filter by publication status
3. Results update in real-time

## Integration Notes

### With Public Blog Pages
The blog system is designed to work with public-facing blog pages:
- Use `/api/blogs/slug/[slug]` endpoint to fetch posts by slug
- Filter by `published: true` for public display
- Use `featured: true` for homepage featured section

### With Existing Systems
- Follows same patterns as News management system
- Uses same TipTap editor component
- Consistent styling with admin dashboard
- Shares Prisma client configuration

## Future Enhancements

Potential improvements:
- [ ] Comment system
- [ ] View count tracking
- [ ] SEO metadata fields (meta description, keywords)
- [ ] Scheduled publishing
- [ ] Multi-author support with user authentication
- [ ] Blog series/collection grouping
- [ ] Social media auto-sharing
- [ ] Analytics integration
- [ ] Revision history
- [ ] Bulk operations

## Troubleshooting

### Issue: Prisma errors after adding Blog model
**Solution**: Run `npx prisma generate` to regenerate the Prisma client

### Issue: Slug conflict error
**Solution**: Choose a different slug or modify the existing post with that slug

### Issue: Image upload fails
**Solution**: 
- Ensure image is under 5MB
- Check file is a valid image format
- Verify browser localStorage isn't full

### Issue: Editor content not saving
**Solution**:
- Check browser console for errors
- Ensure content isn't just `<p><br></p>`
- Verify TipTap editor loaded correctly

## Security Considerations

1. **Authentication**: Ensure admin routes are protected with authentication middleware
2. **Input Sanitization**: HTML content should be sanitized on display (XSS prevention)
3. **Image Validation**: Server-side validation for uploaded images
4. **CSRF Protection**: Implement CSRF tokens for form submissions
5. **Rate Limiting**: Add rate limiting to API endpoints
6. **Role-Based Access**: Consider different permission levels (editor, admin, etc.)

## Performance Tips

1. **Pagination**: Add pagination for large blog lists
2. **Image Optimization**: Use Next.js Image component for optimized images
3. **Lazy Loading**: Implement lazy loading for blog table
4. **Caching**: Cache frequently accessed blogs
5. **Database Indexing**: Ensure slug and createdAt are indexed

---

**Last Updated**: October 13, 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
