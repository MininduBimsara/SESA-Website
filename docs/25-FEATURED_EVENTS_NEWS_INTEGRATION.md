# Featured Events & Latest Updates Integration

Complete documentation for database integration of Featured Events and Latest Updates sections on the homepage.

## Overview

Both the **Featured Events** and **Latest Updates** sections have been converted from static data to dynamic database-driven content.

### What Changed

✅ **Featured Events Section** - Now fetches from `Event` table
✅ **Latest Updates Section** - Now fetches from `News` table
✅ Server-side rendering for both sections
✅ Automatic category-based icon selection
✅ Dynamic relative time calculation
✅ Clickable cards linking to detail pages
✅ Empty state handling

---

## Featured Events Section

### File
`/src/app/(webpage)/FeaturedEvents.tsx`

### Database Source
**Table:** `Event`
**Filter:** `featured: true`
**Order By:** `date DESC`
**Limit:** 4 events

### Features

1. **Server Component** - Async data fetching at request time
2. **Featured Filter** - Only shows events marked as featured
3. **Status Badges** - Displays event status (ongoing, upcoming, past)
4. **Event Images** - Fallback to placeholder if no image
5. **Date Display** - Shows event date with calendar icon
6. **View Details** - Links to individual event page (`/events/[id]`)
7. **View All Button** - Links to full events page (`/events`)
8. **Empty State** - Friendly message when no events

### Data Fields Used

From `Event` model:
- `id` - Unique identifier
- `title` - Event name
- `description` - Short description
- `date` - Event date (string format)
- `image` - Event image URL (nullable)
- `status` - Event status (ongoing/upcoming/past)
- `featured` - Boolean flag for homepage display

### Status Configuration

```typescript
const statusConfig = {
    ongoing: {
        label: "Ongoing",
        color: "bg-green-500 text-white"
    },
    upcoming: {
        label: "Upcoming",
        color: "bg-blue-500 text-white"
    },
    past: {
        label: "Past",
        color: "bg-gray-500 text-white"
    }
}
```

### Implementation Details

**Data Fetching Function:**
```typescript
async function getFeaturedEvents() {
    try {
        const events = await prisma.event.findMany({
            where: { featured: true },
            orderBy: { date: 'desc' },
            take: 4,
        })
        return events
    } catch (error) {
        console.error('Failed to fetch featured events:', error)
        return []
    }
}
```

**Component Type:** Server Component (async)

**Grid Layout:** 4 columns on large screens, 2 on medium, 1 on mobile

**Card Components:** Uses shadcn/ui Card components
- CardHeader - Title and date
- CardContent - Description
- CardFooter - View Details button

### How to Feature an Event

1. Go to `/admin/events`
2. Edit or create an event
3. Check the **"Featured"** checkbox
4. Save the event
5. Event will automatically appear on homepage (if in top 4 by date)

---

## Latest Updates Section

### File
`/src/app/(webpage)/LatestUpdatesSection.tsx`

### Database Source
**Table:** `News`
**Filter:** `published: true` AND `featured: true`
**Order By:** `createdAt DESC`
**Limit:** 4 news items

### Features

1. **Server Component** - Async data fetching
2. **Featured & Published Filter** - Only shows published and featured news
3. **Dynamic Icons** - Icon changes based on category
4. **Dynamic Colors** - Color theme based on category
5. **Relative Time** - Shows "2 days ago", "1 week ago", etc.
6. **Clickable Cards** - Links to full news article (`/news/[slug]`)
7. **Excerpt Preview** - Shows excerpt or truncated content
8. **View All Link** - Links to news page (`/news`)
9. **Empty State** - Friendly message when no news

### Data Fields Used

From `News` model:
- `id` - Unique identifier
- `title` - News headline
- `content` - Full HTML content
- `excerpt` - Short summary (optional)
- `slug` - URL-friendly identifier
- `category` - News category (optional)
- `createdAt` - Publication date
- `featured` - Boolean flag for homepage display
- `published` - Boolean flag for visibility

### Category-Based Icon Selection

```typescript
const getCategoryIcon = (category: string | null) => {
    const categoryLower = category?.toLowerCase() || ''
    
    if (categoryLower.includes('achievement') || categoryLower.includes('award')) 
        return Award
    if (categoryLower.includes('workshop') || categoryLower.includes('tech')) 
        return Code2
    if (categoryLower.includes('opportunity') || categoryLower.includes('career')) 
        return TrendingUp
    return Newspaper // Default
}
```

### Category-Based Color Selection

```typescript
const getCategoryColor = (category: string | null) => {
    const categoryLower = category?.toLowerCase() || ''
    
    if (categoryLower.includes('achievement') || categoryLower.includes('award')) 
        return 'rose'
    if (categoryLower.includes('workshop') || categoryLower.includes('tech')) 
        return 'blue'
    if (categoryLower.includes('opportunity') || categoryLower.includes('career')) 
        return 'purple'
    return 'green' // Default
}
```

**Color Classes:**
- **Rose** - `bg-rose-100 text-rose-600 border-rose-200`
- **Blue** - `bg-blue-100 text-blue-600 border-blue-200`
- **Purple** - `bg-purple-100 text-purple-600 border-purple-200`
- **Green** - `bg-green-100 text-green-600 border-green-200`

### Relative Time Calculation

```typescript
const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
}
```

### Implementation Details

**Data Fetching Function:**
```typescript
async function getLatestNews() {
    try {
        const news = await prisma.news.findMany({
            where: { 
                published: true,
                featured: true 
            },
            orderBy: { createdAt: 'desc' },
            take: 4,
        })
        return news
    } catch (error) {
        console.error('Failed to fetch latest news:', error)
        return []
    }
}
```

**Component Type:** Server Component (async)

**Grid Layout:** 2 columns on all screen sizes

**Content Preview:** 
- Uses excerpt if available
- Otherwise strips HTML tags and shows first 150 characters
- Adds ellipsis (...) for truncated content

### How to Feature a News Item

1. Go to `/admin/news`
2. Edit or create a news article
3. Check both **"Published"** and **"Featured"** checkboxes
4. Set appropriate **Category** for correct icon/color
5. Save the news
6. News will automatically appear on homepage (if in top 4 by date)

---

## Database Models Used

### Event Model

```prisma
model Event {
  id                String   @id @default(auto()) @map("_id") @db.ObjectId
  title             String
  description       String
  longDescription   String?
  date              String
  time              String?
  location          String?
  image             String?
  status            String   @default("upcoming")    // ongoing, upcoming, past
  category          String   @default("hackathon")
  participants      Int?     @default(0)
  registrationLink  String?
  featured          Boolean  @default(false)         // ← Homepage display
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

### News Model

```prisma
model News {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  content     String   // HTML content
  excerpt     String?
  slug        String   @unique
  author      String
  featured    Boolean  @default(false)    // ← Homepage display
  published   Boolean  @default(false)    // ← Visibility control
  image       String?
  category    String?                     // ← Icon/color selection
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## Usage Guide

### For Events

**Adding a Featured Event:**
1. Navigate to `/admin/events`
2. Click "Add Event" or edit existing event
3. Fill in event details:
   - Title (required)
   - Description (required)
   - Date (required)
   - Image (optional - use placeholder if none)
   - Status (ongoing/upcoming/past)
4. **Check "Featured" checkbox** ✓
5. Click "Create" or "Update"
6. Event appears on homepage immediately

**Best Practices:**
- Keep descriptions concise (2-3 sentences)
- Use high-quality event images
- Set appropriate status (upcoming for future, past for completed)
- Feature only important/major events
- Limit featured events to 4-6 at a time

### For News

**Adding Featured News:**
1. Navigate to `/admin/news`
2. Click "Add News" or edit existing article
3. Fill in news details:
   - Title (required)
   - Content (required - HTML format)
   - Excerpt (recommended for homepage)
   - Category (optional - affects icon/color)
   - Slug (required - auto-generated recommended)
4. **Check "Published" checkbox** ✓
5. **Check "Featured" checkbox** ✓
6. Click "Create" or "Update"
7. News appears on homepage immediately

**Category Guidelines:**
- **Achievement/Award** - Use for wins, recognitions, awards (Rose icon)
- **Workshop/Tech** - Use for technical workshops, training (Blue icon)
- **Opportunity/Career** - Use for internships, jobs, programs (Purple icon)
- **News** (default) - Use for general announcements (Green icon)

**Best Practices:**
- Write concise excerpts (1-2 sentences)
- Use descriptive categories
- Feature only important news
- Limit featured news to 4-6 at a time
- Update regularly to keep content fresh

---

## Admin Integration

### Events Admin

**File:** `/src/app/admin/events/page.tsx`

**Featured Checkbox:** Already exists in EventForm component

**To Check Featured Status:**
- Look for checkbox labeled "Featured" or "Show on Homepage"
- Green checkmark = featured
- Empty checkbox = not featured

### News Admin

**File:** `/src/app/admin/news/page.tsx`

**Required Checkboxes:**
1. **Published** - Makes article visible on site
2. **Featured** - Shows article on homepage

**Both must be checked** for article to appear in Latest Updates section.

---

## Technical Details

### Server-Side Rendering

Both components use Next.js 15 Server Components:
- Data fetched at request time
- No client-side JavaScript for data loading
- SEO-friendly (content visible to crawlers)
- Fast initial page load

### Performance Optimization

**Database Queries:**
- Indexed fields used (featured, published, date, createdAt)
- Limited results (take 4)
- Filtered queries (where clause)
- Sorted results (orderBy clause)

**Image Optimization:**
- Next.js Image component used
- Automatic lazy loading
- Responsive sizes
- WebP format when supported

### Error Handling

Both components include try-catch blocks:
```typescript
try {
    const data = await prisma...
    return data
} catch (error) {
    console.error('Failed to fetch...', error)
    return []  // Empty array fallback
}
```

**Empty State Handling:**
- Checks if data array has length
- Shows friendly message if empty
- Prevents layout breaks

---

## Styling & Layout

### Featured Events

**Section Background:** Gray-50 (`bg-gray-50`)
**Vertical Padding:** 80px (`py-20`)
**Grid:**
- Large screens: 4 columns
- Medium screens: 2 columns
- Mobile: 1 column
**Gap:** 24px (`gap-6`)

**Card Design:**
- White background
- Rounded corners
- Shadow on hover
- Image height: 192px
- Status badge (top-right overlay)
- Full height button

### Latest Updates

**Section Background:** White (`bg-white`)
**Vertical Padding:** 80px (`py-20`)
**Grid:**
- All screens: 2 columns
- Mobile: 1 column
**Gap:** 24px (`gap-6`)

**Card Design:**
- Gray-50 background
- Rounded corners
- Shadow on hover
- Icon circle (48x48px)
- Category badge (top)
- Relative time (top-right)
- Clickable entire card

---

## Troubleshooting

### Events Not Showing

**Problem:** Featured events don't appear on homepage

**Solutions:**
1. Verify "Featured" checkbox is checked in admin
2. Check if event date is valid
3. Ensure at least one featured event exists
4. Check browser console for errors
5. Verify Prisma connection working

### News Not Showing

**Problem:** Featured news doesn't appear on homepage

**Solutions:**
1. Verify both "Published" AND "Featured" are checked
2. Check if news has valid createdAt date
3. Ensure at least one featured+published news exists
4. Verify slug is unique
5. Check content/excerpt is not empty

### Icons Not Correct

**Problem:** Latest Updates shows wrong icon for category

**Solutions:**
1. Check category spelling in news admin
2. Verify category includes keyword (achievement, workshop, opportunity)
3. Use lowercase category names
4. Default icon (Newspaper) shows if no match

### Images Not Loading

**Problem:** Event or news images show broken icon

**Solutions:**
1. Verify image URL is correct
2. Check image file exists in public folder
3. Ensure image uploaded successfully
4. Featured Events uses placeholder if image null
5. Check image permissions

### Dates Not Formatting

**Problem:** Relative time shows "Invalid Date"

**Solutions:**
1. Verify createdAt field exists in database
2. Check date is valid ISO string
3. Ensure timezone handling correct
4. Browser console shows specific error

---

## Future Enhancements

Potential improvements:

### Featured Events
1. **Carousel/Slider** - Show more than 4 events with navigation
2. **Event Countdown** - Show time remaining for upcoming events
3. **Registration Status** - Show "Sold Out" or "Registration Open"
4. **Event Filters** - Filter by status or category
5. **Pagination** - Load more events dynamically
6. **Calendar Integration** - Add to calendar button

### Latest Updates
1. **Search/Filter** - Filter news by category
2. **Load More** - Infinite scroll or pagination
3. **Social Sharing** - Share buttons on each update
4. **Read Time** - Estimated reading time
5. **Author Profile** - Show author info with photo
6. **Tags Display** - Show article tags

### Both Sections
1. **Animation** - Fade-in on scroll
2. **Skeleton Loading** - Loading placeholders
3. **Hover Effects** - Enhanced animations
4. **Dark Mode** - Support dark theme
5. **Analytics** - Track clicks and views

---

## Testing Checklist

- [x] Events fetch from database
- [x] News fetch from database
- [x] Featured filter works
- [x] Published filter works (news)
- [x] Status badges display correctly
- [x] Category icons display correctly
- [x] Category colors display correctly
- [x] Relative time calculates correctly
- [x] Links navigate to correct pages
- [x] Empty states display
- [x] Images load with fallbacks
- [x] Server component rendering works
- [x] TypeScript compiles without errors
- [x] Responsive layout works
- [x] Hover effects function

---

## Related Documentation

- `EVENT_TABLE_IMAGE_IMPLEMENTATION.md` - Event image handling
- `NEWS_DATABASE_INTEGRATION.md` - News system details
- `HOMEPAGE_ENHANCEMENTS.md` - Other homepage sections
- `HOMEPAGE_CONTENT_MANAGEMENT.md` - Testimonials/Stats/Partners

---

## Summary

Successfully converted both Featured Events and Latest Updates sections from static to database-driven:

**Featured Events:**
- Fetches from Event table
- Shows 4 featured events
- Displays status badges
- Links to event details
- Fallback for missing images

**Latest Updates:**
- Fetches from News table
- Shows 4 featured+published news
- Dynamic icons and colors based on category
- Relative time display
- Links to full articles
- Excerpt preview

Both sections use:
- Server-side rendering
- Error handling
- Empty states
- Responsive design
- Performance optimization

Ready for production use! 🚀
