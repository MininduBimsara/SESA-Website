# Image Asset Migration and Fallback Updates

This document describes the replacement of legacy, placeholder, and AI-generated image assets with high-quality real images across SESA webpage components.

---

## Overview

To improve visual excellence, maintain rich aesthetics, and eliminate generic, AI-generated, or broken placeholder images, the website's core pages and layouts were updated to utilize the six real photographic assets (`1.jpeg` through `6.jpeg`) located in the `/public` directory.

---

## Image Reference Mapping

The six new high-resolution images are mapped across the components and pages as follows:

| Asset Path | Context / Role | Assigned Page or Component |
| :--- | :--- | :--- |
| `/1.jpeg` | SESA CodeFest & Hackathons | `HomeHero` (Slide 1), `AboutSection` (Skill Development focus card), and `News` (Mock Announcement 1 & Bento grid highlight fallback) |
| `/2.jpeg` | Workshops & Tech Seminars | `HomeHero` (Slide 2), `AboutSection` (Research & Innovation focus card), and default fallback for `FeaturedEvents` & `EventsPageClient` |
| `/3.jpeg` | SESA Community | `HomeHero` (Slide 3), `AboutSection` (Industry Collaboration focus card), and `News` (Mock Student Spotlight 2 & card fallback) |
| `/4.jpeg` | Career & Mentorship | `HomeHero` (Slide 4) and `News` (Mock Partnerships article 3) |
| `/5.jpeg` | Community Collaboration | `AboutSection` (Community Building focus card) and `News` (Mock Media article 4 & card fallback) |
| `/6.jpeg` | Undergraduate Teamwork | `About Page` (Main undergraduate collaboration showcase) |

---

## Component Updates Detailed

### 1. Homepage Hero Slider
- **File**: [HomeHero.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/components/HomeHero.tsx)
- **Change**: Updated Slide 4 to use `/4.jpeg` instead of repeating `/1.jpeg`.
- **Outcome**: The slider now cycles through four distinct, high-quality images.

### 2. Homepage Focus Areas
- **File**: [AboutSection.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/AboutSection.tsx)
- **Change**: Updated the four core focus card image fields.
  - *Skill Development* -> `/1.jpeg`
  - *Research & Innovation* -> `/2.jpeg`
  - *Industry Collaboration* -> `/3.jpeg`
  - *Community Building* -> `/5.jpeg`

### 3. Events Pages & Fallbacks
- **Files**: 
  - [FeaturedEvents.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/FeaturedEvents.tsx)
  - [EventsPageClient.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/events/EventsPageClient.tsx)
- **Change**: Changed the default fallback image from the legacy `/tech-workshop-and-coding-event-with-students.jpg` to `/2.jpeg`.
- **Outcome**: Events that lack custom images in the database now fallback cleanly to the workshops/seminars photo.

### 4. About Page
- **File**: [about/page.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/about/page.tsx)
- **Change**: Replaced the main undergraduate collaboration showcase image with `/6.jpeg`.

### 5. News Page Mock Articles & Bento Layout Fallbacks
- **File**: [news/page.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/news/page.tsx)
- **Change**: Swapped out the mock news item images and card fallback images with the newly mapped `/1.jpeg`, `/3.jpeg`, `/4.jpeg`, and `/5.jpeg` files.
- **Outcome**: Ensures a consistent look across the Bento Grid layout with no missing or broken assets.

---

> [!TIP]
> Always use local photographic assets (`/1.jpeg` through `/6.jpeg`) instead of referencing external or generic placeholder images to maintain the premium dark mode layout consistency.
