# Quick Start: Using Reusable Article Components

## For Developers

If you need to create a new article-style page (tutorials, case studies, announcements, etc.), you can now use our reusable components for consistent styling.

---

## Available Components

### 1. ArticleContent

Renders HTML content with beautiful typography

```tsx
import { ArticleContent } from "@/components/ArticleContent";

<ArticleContent content={yourHtmlContent} />;
```

**What it does:**

- Styles all headings (h1-h6)
- Formats paragraphs, lists, blockquotes
- Styles code blocks with dark theme
- Formats links with rose accent
- Responsive typography

---

### 2. TagsSection

Displays tags with consistent styling

```tsx
import { TagsSection } from "@/components/TagsSection";

<TagsSection tags={["React", "TypeScript", "Web Dev"]} />;
```

**What it does:**

- Shows tags with rose-100 background
- Adds tag icon
- Hover effects
- Responsive wrapping

---

### 3. ShareButtons

Social media sharing buttons

```tsx
import { ShareButtons } from "@/components/ShareButtons";

<ShareButtons url="https://yoursite.com/article" title="Your Article Title" />;
```

**What it does:**

- Facebook, Twitter, LinkedIn sharing
- Opens in new window
- Consistent button styling
- Platform-specific colors

---

### 4. AuthorCard

Author information display

```tsx
import { AuthorCard } from "@/components/AuthorCard";

<AuthorCard authorName="John Doe" />;
```

**What it does:**

- Shows circular avatar with initial
- Displays author name and description
- Gradient background
- Rose color scheme

---

## Complete Example

Here's how to create a new article page:

```tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleContent } from "@/components/ArticleContent";
import { ShareButtons } from "@/components/ShareButtons";
import { AuthorCard } from "@/components/AuthorCard";
import { TagsSection } from "@/components/TagsSection";

const MyArticlePage = () => {
  const article = {
    title: "My Amazing Article",
    author: "Jane Smith",
    date: "January 20, 2025",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["React", "Next.js"],
    excerpt: "A brief summary of the article...",
    content: "<p>Your HTML content here...</p>",
    image: "/path/to/image.jpg",
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
          <Link href="/articles">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <span className="inline-block px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-semibold">
              {article.category}
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-rose-500" />
            <span className="font-medium">{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-500" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-500" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-rose-50 border-l-4 border-rose-500 p-6 mb-8 rounded-r-lg">
          <p className="text-lg text-gray-700 font-medium italic">
            {article.excerpt}
          </p>
        </div>

        {/* USE REUSABLE COMPONENTS */}
        <ArticleContent content={article.content} />
        <TagsSection tags={article.tags} />
        <AuthorCard authorName={article.author} />
        <ShareButtons url={shareUrl} title={article.title} />

        {/* Back Button */}
        <div className="text-center">
          <Link href="/articles">
            <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to All Articles
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default MyArticlePage;
```

---

## Customization

### Modify Component Styling

If you need to change the styling, edit the component files:

- **ArticleContent:** `src/components/ArticleContent.tsx`
- **ShareButtons:** `src/components/ShareButtons.tsx`
- **AuthorCard:** `src/components/AuthorCard.tsx`
- **TagsSection:** `src/components/TagsSection.tsx`

All pages using these components will automatically update.

---

## Current Usage

These components are currently used in:

- ✅ Blog detail page (`/blogs/[id]`)
- ✅ News detail page (`/news/[slug]`)

You can use them in:

- 📝 Tutorial pages
- 📝 Case study pages
- 📝 Announcement pages
- 📝 Documentation pages
- 📝 Any article-style content

---

## Benefits

### ✅ Consistency

All article pages will have the same look and feel

### ✅ Maintainability

Update once, apply everywhere

### ✅ Speed

Build new pages faster with pre-built components

### ✅ Quality

Professional styling out of the box

### ✅ Type Safety

TypeScript ensures proper usage

---

## Tips

1. **Keep the layout structure:** Use the example above as a template
2. **Customize colors:** All use rose/gray palette - easy to change
3. **Responsive by default:** All components work on mobile
4. **Add your own sections:** Insert custom content between components
5. **Test on mobile:** Always check responsive design

---

## Need Help?

See these docs:

- `REUSABLE_COMPONENTS_DOCUMENTATION.md` - Detailed component docs
- `NEWS_BLOG_COMPARISON.md` - Before/after comparison
- `NEWS_DATABASE_INTEGRATION.md` - Database integration guide

---

## Common Patterns

### Add a Section Before Content

```tsx
<article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
  <h1>Title</h1>
  <div>Meta info</div>

  {/* Your custom section */}
  <div className="bg-blue-50 p-6 mb-8">
    <h3>Pro Tip</h3>
    <p>Some helpful information</p>
  </div>

  <ArticleContent content={content} />
  {/* ... rest of components */}
</article>
```

### Skip Optional Components

```tsx
{
  /* Only use what you need */
}
<ArticleContent content={content} />;
{
  article.tags && <TagsSection tags={article.tags} />;
}
<ShareButtons url={url} title={title} />;
{
  /* Skip AuthorCard if not needed */
}
```

### Add Extra Share Options

Edit `ShareButtons.tsx` to add more platforms:

```tsx
// Add WhatsApp, Email, Copy Link, etc.
```

---

## TypeScript Interfaces

### ArticleContent

```typescript
interface ArticleContentProps {
  content: string; // HTML string
}
```

### ShareButtons

```typescript
interface ShareButtonsProps {
  url: string; // Full URL to share
  title: string; // Article title
}
```

### AuthorCard

```typescript
interface AuthorCardProps {
  authorName: string; // Author's name
}
```

### TagsSection

```typescript
interface TagsSectionProps {
  tags: string[]; // Array of tag strings
}
```

---

## Quick Checklist

When creating a new article page:

- [ ] Import all needed components
- [ ] Set up back button with correct link
- [ ] Add hero image with overlay
- [ ] Include title and meta information
- [ ] Add excerpt (optional but recommended)
- [ ] Use `<ArticleContent>` for main content
- [ ] Use `<TagsSection>` for tags
- [ ] Use `<AuthorCard>` for author info
- [ ] Use `<ShareButtons>` for social sharing
- [ ] Add back button at bottom
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify images load correctly

---

_Happy coding! 🚀_
_SESA Development Team_
