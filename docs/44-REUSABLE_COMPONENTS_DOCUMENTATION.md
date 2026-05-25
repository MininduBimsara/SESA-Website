# Reusable Components Documentation

## Overview

This document describes the reusable components created to ensure consistent styling and functionality between the blog and news detail pages.

## Created Components

### 1. ArticleContent Component

**Location:** `src/components/ArticleContent.tsx`

**Purpose:** Renders article content with consistent prose styling across blog and news pages.

**Props:**

- `content: string` - HTML content to render

**Features:**

- Comprehensive typography styling for headings (h1-h6)
- Styled paragraphs with proper spacing
- List styling (ordered and unordered)
- Blockquote styling with rose accent
- Code block styling with dark theme
- Link styling with rose color scheme
- Image styling with rounded corners and shadows
- Table styling with borders and hover effects

**Usage:**

```tsx
import { ArticleContent } from "@/components/ArticleContent";

<ArticleContent content={article.content} />;
```

---

### 2. ShareButtons Component

**Location:** `src/components/ShareButtons.tsx`

**Purpose:** Provides social media sharing functionality with consistent button styling.

**Props:**

- `url: string` - URL to share
- `title: string` - Title of the content being shared

**Features:**

- Facebook sharing (blue-600 theme)
- Twitter sharing (sky-500 theme)
- LinkedIn sharing (blue-700 theme)
- Circular button design
- Hover effects
- Opens in new window

**Usage:**

```tsx
import { ShareButtons } from "@/components/ShareButtons";

<ShareButtons url="https://example.com/article" title="Article Title" />;
```

---

### 3. AuthorCard Component

**Location:** `src/components/AuthorCard.tsx`

**Purpose:** Displays author information with consistent styling.

**Props:**

- `authorName: string` - Name of the author

**Features:**

- Gradient background (from-rose-50 to-white)
- Circular avatar with initial letter
- Author name and role description
- Rose color scheme
- Responsive padding

**Usage:**

```tsx
import { AuthorCard } from "@/components/AuthorCard";

<AuthorCard authorName="John Doe" />;
```

---

### 4. TagsSection Component

**Location:** `src/components/TagsSection.tsx`

**Purpose:** Displays article tags with consistent styling matching the blog page design.

**Props:**

- `tags: string[]` - Array of tag strings

**Features:**

- Rose-100 background with rose-700 text (matching blog style)
- Rounded pill-shaped tags
- Hover effects (bg-rose-200)
- Responsive wrapping
- Tag icon indicator

**Usage:**

```tsx
import { TagsSection } from "@/components/TagsSection";

<TagsSection tags={["React", "Next.js", "TypeScript"]} />;
```

---

## Implementation Status

### ✅ News Detail Page (`src/app/(webpage)/news/[slug]/page.tsx`)

- Simplified from complex 4-column grid to single-column layout
- Removed sidebar and related news sections
- Integrated all 4 reusable components
- Matches blog page design language
- Clean, professional appearance

### ✅ Blog Detail Page (`src/app/(webpage)/blogs/[id]/page.tsx`)

- Updated to use reusable components
- Removed inline implementations
- Consistent styling with news page
- Shared component architecture

---

## Design Consistency

### Color Scheme

- **Primary Accent:** Rose-500, Rose-600
- **Background:** Gray-50, White
- **Text:** Gray-900 (headings), Gray-700 (body)
- **Tags:** Rose-100 background, Rose-700 text
- **Links:** Rose-600 with hover to Rose-700

### Typography

- **Titles:** 3xl to 5xl, bold, gray-900
- **Body:** Base to lg, gray-700, line-height 1.75
- **Meta Info:** Small to base, gray-600
- **Tags:** Small, font-medium

### Spacing

- Consistent margins (mb-6, mb-8)
- Proper padding (p-6, py-6)
- Border spacing (border-b with pb-8)

---

## Benefits

1. **Maintainability:** Changes to styling only need to be made once
2. **Consistency:** Both blog and news pages look identical
3. **Reusability:** Components can be used in future article-style pages
4. **DRY Principle:** Don't Repeat Yourself - single source of truth
5. **Type Safety:** TypeScript interfaces ensure proper usage

---

## Future Enhancements

Potential improvements for these components:

1. **ArticleContent:**

   - Add syntax highlighting for code blocks
   - Support for embedded media (videos, iframes)
   - Table of contents generation

2. **ShareButtons:**

   - Add more platforms (WhatsApp, Reddit, Email)
   - Copy link to clipboard functionality
   - Share count indicators

3. **AuthorCard:**

   - Link to author profile page
   - Display author bio from database
   - Show author's article count
   - Add author social media links

4. **TagsSection:**
   - Make tags clickable to filter articles
   - Add tag search/filter functionality
   - Display tag popularity/count

---

## Migration Notes

### From Old News Page to New

**Removed:**

- Complex 4-column grid layout
- Sidebar with quick actions
- Article info card
- Related news section
- CTA section
- Inline tag rendering
- Inline share buttons
- Inline author card

**Added:**

- Simple single-column layout
- Back button bar
- Hero image with overlay
- Reusable components integration
- Cleaner structure

### From Old Blog Page to New

**Replaced:**

- Inline prose CSS with ArticleContent component
- Manual tag rendering with TagsSection component
- Custom share buttons with ShareButtons component
- Inline author section with AuthorCard component

---

## Testing Checklist

- [x] News page displays correctly
- [x] Blog page displays correctly
- [x] Tags render with correct styling
- [x] Share buttons open correct URLs
- [x] Author card shows initials
- [x] Article content prose styling works
- [x] Responsive design on mobile
- [x] No TypeScript errors
- [x] No compilation errors

---

## Related Documentation

- `NEWS_DATABASE_INTEGRATION.md` - News API and database setup
- `README_EVENT_FORM_DOCS.md` - Similar component architecture for events

---

_Last Updated: January 2025_
_Created by: SESA Development Team_
