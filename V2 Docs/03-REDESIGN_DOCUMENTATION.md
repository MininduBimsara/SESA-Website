# SESA Website Redesign Documentation

This document outlines the major layout, style, typography, and structure changes implemented during the website redesign.

## Overview of Redesign Goals
- **Full-Screen Media Hero**: Replaced the static, dark-background hero with a full-viewport media and text Swiper carousel to highlight club events and activities.
- **Serif Typography**: Applied an elegant serif font to headers website-wide for a classic, high-end, and editorial feel.
- **Card-Framed Page Structure**: Aligned sub-pages with the homepage's distinctive "floating cards on a page" layout using structured container frames, rounded corners, and soft shadows.
- **Global Header/Footer Consolidation**: Consolidated the global navigation and footer blocks to ensure a single, consistent user interface across all routes.

---

## Implemented Changes

### 1. Swiper-based Homepage Hero Carousel
- **Component File**: [HomeHero.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/components/HomeHero.tsx)
- **Features**:
  - Full-viewport height (`100dvh`) Swiper container with fade-through slide transitions (`EffectFade`).
  - **4 Dynamic Slides** mapping out core SESA activities (Hackathons, Workshops, Community, and Career Growth) using real representative images.
  - Transparent overlay header for a seamless edge-to-edge backdrop.
  - Reduced title/subtitle typography sizes and serif font styles (`font-serif`) for a balanced layout.
  - Slide pagination bullets styled as modern pill-shaped progress indicators.
  - Slide swipe/drag capability enabled; navigation arrows removed for a cleaner look.
  - Entrance slide text fade-up animations powered by `framer-motion`.

### 2. Global Typography (Serif Headings)
- **Styling File**: [globals.css](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/globals.css)
- **Details**:
  - Added global base styling rules targeting all heading levels (`h1, h2, h3, h4, h5, h6`) to use:
    ```css
    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    ```
  - Instantly aligns all text headings across the home page, team page, events page, about page, and blogs/news lists.

### 3. Redesigned Global Navigation Header
- **Component File**: [Navbar.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/components/Navbar.tsx)
- **Details**:
  - Redesigned the navigation layout to mirror the homepage header overlay structure: Navigation links on the left, SESA brand logo centered, and search bar, "Join Us" button, and hamburger drawer menu toggle on the right.
  - Retained the floating morphing animation: Navbar is transparent full-width at scroll-top, and morphs into a floating glassmorphic capsule on scroll down.
  - Added theme-aware styling to the search bar and action buttons to adapt when scrolled (light background) vs. scroll-top (dark background).

### 4. Card-Framed Sub-Pages Restructuring
Restructured the sub-pages to match the homepage cards theme, enclosing layouts in container frames:
- **Common Outer Container**:
  ```tsx
  <div className="w-full max-w-[1600px] mx-auto px-3 pt-24 pb-8 md:px-5 md:pt-28 bg-white flex flex-col gap-6 md:gap-8">
  ```
- **Consistent Section Cards**: Enclosed major blocks inside rounded white shadow cards:
  ```tsx
  <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
  ```
- **Unified Hero Banner Cards**: Sub-page headers are now styled as dark, rounded, shadow-card heroes with background images (low opacity, mix-blend-overlay) related to the page content (matches the homepage hero aesthetic).
- **Consolidated Footers**: Removed local duplicate contact and copyright footer blocks from the sub-pages, letting the global `Footer.tsx` render uniquely at the very bottom.
- **Affected Pages**:
  - [About Page](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/about/page.tsx)
  - [Team Page](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/team/TeamPageClient.tsx)
  - [Events Page](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/events/EventsPageClient.tsx)
  - [Blogs Page](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/blogs/page.tsx)
  - [News Page](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/news/page.tsx)

---

## Build Status & Validation
- **Command**: `npm run build`
- **Result**: Compiles successfully with zero TypeScript, syntax, or routing generation errors.
