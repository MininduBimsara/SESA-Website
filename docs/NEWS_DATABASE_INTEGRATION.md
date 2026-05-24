# News System - Database Integration

## Overview

The news system has been successfully updated to fetch and display data from the database instead of using hardcoded data. This provides dynamic content management through the admin panel.

## Changes Made

### 1. News List Page (`/news`)

**File:** `src/app/(webpage)/news/page.tsx`

**Key Updates:**

- Converted to dynamic data fetching with `useEffect` hook
- Fetches news from `/api/news` endpoint
- Filters to show only published news articles
- Added loading state with spinner
- Added error handling
- Maps database fields to UI components:
  - `News.excerpt` or truncated `content` → card summary
  - `News.createdAt` → formatted date display
  - `News.slug` → navigation links
  - `News.author` → author display
  - `News.category` → category badges
  - `News.tags` → tag display
  - `News.featured` → featured news section
  - `News.image` → news card images

**Features:**

- Breaking News banner with latest article
- Featured news section (3 articles)
- Search functionality (by title, excerpt, tags)
- Category filtering (all, achievements, announcements, partnerships, student-spotlight, media)
- Loading state with animated spinner
- Error state with user-friendly message
- Empty state when no news found

### 2. News Detail Page (`/news/[slug]`)

**File:** `src/app/(webpage)/news/[slug]/page.tsx`

**Key Updates:**

- Created new dynamic route using `[slug]` instead of `[id]`
- Fetches specific news article by slug from `/api/news/slug/[slug]`
- Displays full HTML content from database
- Shows related news from the same category
- Added loading and error states
- Validates that article is published

**Features:**

- Full-screen hero section with article image
- Article metadata (author, date, category)
- Excerpt highlight section
- Full HTML content rendering
- Tag display and interaction
- Share functionality (native share API or clipboard)
- Related news section (up to 3 articles)
- Back to news navigation
- Not found handling

### 3. New API Route for Slug-Based Lookup

**File:** `src/app/api/news/slug/[slug]/route.ts`

**Purpose:**

- Optimized endpoint for fetching single news article by slug
- Reduces payload size compared to fetching all news
- Better performance for detail page

**Endpoint:** `GET /api/news/slug/[slug]`

## Database Schema

The news system uses the following Prisma model:

```prisma
model News {
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
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Field Mappings

| Database Field | UI Display           | Notes                                            |
| -------------- | -------------------- | ------------------------------------------------ |
| `title`        | Article title        | Used in cards and detail page                    |
| `content`      | Full article content | Rendered as HTML with `dangerouslySetInnerHTML`  |
| `excerpt`      | Summary text         | Falls back to truncated content if not available |
| `slug`         | URL parameter        | Used for SEO-friendly URLs                       |
| `author`       | Author name          | Displayed with user icon                         |
| `featured`     | Featured badge       | Shows in featured news section                   |
| `published`    | Visibility control   | Only published news shown to users               |
| `image`        | Article images       | Falls back to placeholder if missing             |
| `category`     | Category badge       | Filterable categories                            |
| `tags`         | Tag chips            | Searchable and clickable                         |
| `createdAt`    | Publication date     | Formatted as "Month Day, Year"                   |

## User Flow

### Viewing News List

1. User navigates to `/news`
2. System fetches all published news from database
3. Display breaking news banner with latest article
4. Show featured news in special section
5. Display all news with filters and search

### Reading Article

1. User clicks on news card
2. Navigate to `/news/[slug]`
3. System fetches article by slug
4. Display full content with rich formatting
5. Show related articles from same category
6. Provide share functionality

### Search & Filter

1. User enters search query
2. Filter by title, excerpt, or tags
3. Select category filter
4. Results update in real-time

## Admin Integration

To create and manage news articles:

1. Go to admin panel (`/admin/news`)
2. Create new article with all fields
3. Set `published: true` to make visible
4. Set `featured: true` for featured section
5. Articles automatically appear on news page

## Next Steps

1. ✅ Fetch news from database
2. ✅ Create slug-based routing
3. ✅ Implement search and filters
4. ✅ Add loading and error states
5. 🔄 Add pagination for large news lists
6. 🔄 Implement server-side rendering for better SEO
7. 🔄 Add social media share meta tags
8. 🔄 Create RSS feed for news

## Testing Checklist

- [ ] Verify news list loads from database
- [ ] Check featured news section displays correctly
- [ ] Test search functionality
- [ ] Test category filtering
- [ ] Verify news detail page loads correctly
- [ ] Check related news appears
- [ ] Test share functionality
- [ ] Verify only published news is visible
- [ ] Check loading states appear
- [ ] Test error handling (network errors, 404s)
- [ ] Verify images load with fallback
- [ ] Test responsive design on mobile

## Performance Considerations

- News list fetches all articles at once (consider pagination for 100+ articles)
- Images should be optimized before upload
- HTML content is rendered with `dangerouslySetInnerHTML` (ensure content is sanitized in admin)
- Consider implementing ISR (Incremental Static Regeneration) for better performance

## Security Notes

- Only published news is visible to public
- HTML content should be sanitized in admin panel
- Slug-based routing prevents exposure of database IDs
- Share functionality uses native API when available
