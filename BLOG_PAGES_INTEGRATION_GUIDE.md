# Blog Pages Database Integration - Implementation Guide

## Overview
This guide shows how to integrate the blog pages (`/blogs` list page and `/blogs/[slug]` detail page) with the database API, similar to how the news pages work.

## Files to Update

### 1. Blog List Page: `/src/app/(webpage)/blogs/page.tsx`
### 2. Blog Detail Page: `/src/app/(webpage)/blogs/[slug]/page.tsx`

---

## Changes Required

### Blog List Page Updates

#### Step 1: Update Imports
```typescript
// Add these imports:
import { useState, useEffect } from 'react' // Add useEffect
import { Loader2 } from 'lucide-react' // Add Loader2
import type { Blog } from '@/types/blog' // Add Blog type

// Change from:
interface BlogPost { ... }

// To: (remove the interface, use Blog type from @/types/blog)
```

#### Step 2: Replace Hardcoded Data with API Fetching
```typescript
// Remove the hardcoded blogPosts array

// Add state management:
const [blogPosts, setBlogPosts] = useState<Blog[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

// Add useEffect to fetch from API:
useEffect(() => {
    const fetchBlogs = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/blogs')
            if (!response.ok) {
                throw new Error('Failed to fetch blogs')
            }
            const data = await response.json()
            // Filter only published blogs
            const publishedBlogs = data.filter((item: Blog) => item.published)
            setBlogPosts(publishedBlogs)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            console.error('Error fetching blogs:', err)
        } finally {
            setLoading(false)
        }
    }

    fetchBlogs()
}, [])
```

#### Step 3: Add Date Formatting Helper
```typescript
const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
```

#### Step 4: Add Loading State
```typescript
if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-16 h-16 text-rose-500 animate-spin mx-auto mb-4" />
                <p className="text-xl text-gray-600">Loading blog posts...</p>
            </div>
        </div>
    )
}
```

#### Step 5: Add Error State
```typescript
if (error) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Blogs</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} className="bg-rose-500 hover:bg-rose-600">
                    Try Again
                </Button>
            </div>
        </div>
    )
}
```

#### Step 6: Update Blog Post Properties
Replace all references to:
- `post.date` → `formatDate(post.createdAt)`
- `post.id` (number) → `post.id` (string) or `post.slug` for URLs
- `href={`/blogs/${post.id}`}` → `href={`/blogs/${post.slug}`}`

#### Step 7: Handle Optional Fields
```typescript
// Add conditional rendering for optional fields:
{post.image ? (
    <Image src={post.image} alt={post.title} fill className="object-cover" />
) : (
    <div className="w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
        <BookOpen className="w-16 h-16 text-white/50" />
    </div>
)}

{post.excerpt && (
    <CardDescription>{post.excerpt}</CardDescription>
)}

{post.category && (
    <span className="px-3 py-1 bg-white/90 text-gray-700 capitalize">
        {post.category}
    </span>
)}

{post.readTime && (
    <div className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        <span>{post.readTime}</span>
    </div>
)}
```

---

### Blog Detail Page Updates

#### Step 1: Update Page to Use Slug Instead of ID
```typescript
// Change from:
const params = useParams()
const blogId = params?.id as string
const blog = blogData[blogId]

// To:
const params = useParams()
const slug = params?.slug as string // Note: change route from [id] to [slug]
```

#### Step 2: Add State Management
```typescript
const [blog, setBlog] = useState<Blog | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

#### Step 3: Fetch Blog by Slug
```typescript
useEffect(() => {
    const fetchBlogDetail = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/blogs/slug/${slug}`)
            
            if (!response.ok) {
                if (response.status === 404) {
                    setError('Blog post not found')
                } else {
                    throw new Error('Failed to fetch blog')
                }
                return
            }
            
            const foundBlog: Blog = await response.json()
            
            if (!foundBlog.published) {
                setError('Blog post not found')
                return
            }
            
            setBlog(foundBlog)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            console.error('Error fetching blog:', err)
        } finally {
            setLoading(false)
        }
    }

    if (slug) {
        fetchBlogDetail()
    }
}, [slug])
```

#### Step 4: Add Helper Functions
```typescript
const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const calculateReadingTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '')
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    const time = Math.ceil(words / wordsPerMinute)
    return `${time} min read`
}
```

#### Step 5: Update Property References
Replace:
- `blog.date` → `formatDate(blog.createdAt)`
- `blog.readTime` → `blog.readTime || calculateReadingTime(blog.content)`

#### Step 6: Rename Route Folder
```bash
# Rename the folder from [id] to [slug]
mv src/app/(webpage)/blogs/[id] src/app/(webpage)/blogs/[slug]
```

---

## Testing Checklist

After making these changes, test the following:

### Blog List Page (/blogs)
- [ ] Page loads without errors
- [ ] Loading spinner shows while fetching
- [ ] Published blogs display correctly
- [ ] Featured blogs show in featured section
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Blog cards show correct information
- [ ] Links use slugs instead of IDs
- [ ] Images display or show placeholder
- [ ] Dates format correctly

### Blog Detail Page (/blogs/[slug])
- [ ] Page loads with correct blog content
- [ ] Loading spinner shows while fetching
- [ ] 404 page shows for invalid slugs
- [ ] Unpublished blogs don't display
- [ ] All blog fields render correctly
- [ ] HTML content displays properly
- [ ] Tags display correctly
- [ ] Share buttons work
- [ ] Back button returns to blog list

---

## Quick Command Reference

```bash
# Test the blog list page
curl http://localhost:3000/api/blogs

# Test blog by slug
curl http://localhost:3000/api/blogs/slug/your-blog-slug

# Create a test blog via admin
# Go to: http://localhost:3000/admin/blogs
# Click "Create Post"
# Fill in required fields
# Save and publish
```

---

## Common Issues & Solutions

### Issue: "blogs is not iterable"
**Solution**: Ensure API returns an array and add `Array.isArray()` check

### Issue: "Property 'date' does not exist"
**Solution**: Replace `post.date` with `formatDate(post.createdAt)`

### Issue: "Cannot read property of undefined"
**Solution**: Add optional chaining and conditional rendering for optional fields

### Issue: "404 on blog detail page"
**Solution**: Ensure folder is named `[slug]` not `[id]`, and links use `post.slug`

### Issue: "Images not loading"
**Solution**: Add fallback placeholder for posts without images

---

## Benefits of Database Integration

✅ **Dynamic Content**: Add/edit blogs from admin panel without code changes
✅ **Real-time Updates**: Content updates immediately
✅ **Better UX**: Loading states and error handling
✅ **SEO Ready**: Slugs for SEO-friendly URLs
✅ **Scalable**: No hardcoded data limits
✅ **Type Safe**: Using TypeScript Blog type throughout

---

**Status**: Ready to implement
**Estimated Time**: 30-45 minutes
**Difficulty**: Medium
