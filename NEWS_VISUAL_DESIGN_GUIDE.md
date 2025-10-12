# News Article Page - Visual Design Guide

## 🎨 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     HERO SECTION (70vh)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [← Back Button]                         [Glass-blur] │  │
│  │                                                        │  │
│  │  [Category Badge] [Featured Badge]                    │  │
│  │                                                        │  │
│  │  ARTICLE TITLE IN LARGE BOLD TEXT                     │  │
│  │  With dramatic shadow effect                          │  │
│  │                                                        │  │
│  │  [👤 Author] [📅 Date] [⏱️ 5 min read]               │  │
│  └──────────────────────────────────────────────────────┘  │
│                Background: Hero Image with Gradient         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    CONTENT SECTION                           │
│  ┌──────────────────────────┬──────────────────────────┐   │
│  │   MAIN CONTENT (75%)     │   SIDEBAR (25%)          │   │
│  │  ┌────────────────────┐  │  ┌────────────────────┐  │   │
│  │  │  EXCERPT SECTION   │  │  │  QUICK ACTIONS     │  │   │
│  │  │  (Rose gradient)   │  │  │  ┌──────────────┐  │  │   │
│  │  │  "Quote style..."  │  │  │  │ 🖨️ Print     │  │  │   │
│  │  └────────────────────┘  │  │  │ 🔗 Share     │  │  │   │
│  │                          │  │  │ ← All News   │  │  │   │
│  │  ┌────────────────────┐  │  │  └──────────────┘  │  │   │
│  │  │  ARTICLE CONTENT   │  │  └────────────────────┘  │   │
│  │  │                    │  │                          │   │
│  │  │  # Heading 1       │  │  ┌────────────────────┐  │   │
│  │  │  ## Heading 2      │  │  │  ARTICLE INFO      │  │   │
│  │  │                    │  │  │  ⏱️ Reading: 5 min │  │   │
│  │  │  Paragraph text... │  │  │  📅 Published:...  │  │   │
│  │  │                    │  │  │  👤 Author: ...    │  │   │
│  │  │  - List items      │  │  └────────────────────┘  │   │
│  │  │  - More items      │  │         (Sticky)         │   │
│  │  └────────────────────┘  │                          │   │
│  │                          │                          │   │
│  │  ┌────────────────────┐  │                          │   │
│  │  │  RELATED TOPICS    │  │                          │   │
│  │  │  #tag1 #tag2 #tag3 │  │                          │   │
│  │  └────────────────────┘  │                          │   │
│  │                          │                          │   │
│  │  ┌────────────────────┐  │                          │   │
│  │  │  AUTHOR & SHARE    │  │                          │   │
│  │  │  [Avatar] Author   │  │                          │   │
│  │  │  [f][t][in][✉][🔗]│  │                          │   │
│  │  └────────────────────┘  │                          │   │
│  └──────────────────────────┴──────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  RELATED ARTICLES SECTION                    │
│  "Related Articles"                    [View All News →]    │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                    │
│  │ [Image] │  │ [Image] │  │ [Image] │                    │
│  │ Title   │  │ Title   │  │ Title   │                    │
│  │ Excerpt │  │ Excerpt │  │ Excerpt │                    │
│  │ 📅 ⏱️   │  │ 📅 ⏱️   │  │ 📅 ⏱️   │                    │
│  │[Button] │  │[Button] │  │[Button] │                    │
│  └─────────┘  └─────────┘  └─────────┘                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    CTA SECTION (Rose Gradient)               │
│                    [Newspaper Icon]                          │
│              Stay Informed with SESA News                    │
│         Don't miss out on latest updates...                  │
│                                                              │
│         [Explore All News] [Back to Home]                    │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Color Palette

### Primary Colors

```css
Rose 500:  #f43f5e  ████  Brand primary
Rose 600:  #e11d48  ████  Hover states
Rose 50:   #fff1f2  ░░░░  Light backgrounds
Rose 100:  #ffe4e6  ░░░░  Excerpt background
```

### Neutral Colors

```css
Gray 900:  #111827  ████  Headings
Gray 800:  #1f2937  ████  Dark text
Gray 700:  #374151  ███░  Body text
Gray 600:  #4b5563  ███░  Secondary text
Gray 50:   #f9fafb  ░░░░  Backgrounds
White:     #ffffff  ░░░░  Cards
```

### Accent Colors

```css
Amber 500: #f59e0b  ████  Featured badge
Blue 600:  #2563eb  ████  Social (FB, LinkedIn)
Sky 600:   #0284c7  ████  Social (Twitter)
```

## 📐 Spacing System

### Container Widths

```
Hero Container:     max-w-5xl (1024px)
Content Container:  max-w-5xl (1024px)
Related Container:  max-w-7xl (1280px)
CTA Container:      max-w-4xl (896px)
```

### Vertical Spacing

```
Hero:        py-20  (80px)
Section:     py-16  (64px)
Card:        p-8 md:p-12  (32-48px)
Gap:         gap-6 to gap-8  (24-32px)
```

## 🔤 Typography Scale

### Headings

```
Article Title (Hero):   text-6xl (96px)  font-bold
Section Heading:        text-4xl (36px)  font-bold
Card Title:             text-xl (20px)   font-bold

Prose Headings:
H1:                     text-4xl (36px)
H2:                     text-3xl (30px)
H3:                     text-2xl (24px)
```

### Body Text

```
Article Body:     text-lg (18px)    prose-lg
Excerpt:          text-2xl (24px)   italic serif
Card Description: text-sm (14px)
Meta Info:        text-base (16px)
```

## 🎭 Component Styles

### Hero Section

```css
Height: 70vh (minimum 500px)
Background: Image with opacity-50
Overlay: Gradient from-gray-900/70 to-gray-900
Title: text-6xl with text-shadow
Badges: Backdrop blur + shadow-lg
```

### Excerpt Block

```css
Background: Rose gradient (from-rose-50 to-rose-100)
Border: 4px left border (rose-500)
Typography: text-2xl, serif, italic
Padding: p-12
Quote marks: &ldquo; &rdquo;
```

### Content Card

```css
Background: White
Shadow: shadow-2xl
Border-radius: rounded-2xl
Padding: p-8 md:p-12
```

### Sidebar Cards

```css
Position: Sticky (top-6)
Background: White with gradient header
Shadow: shadow-lg
Border: border-2
```

### Related Articles

```css
Grid: md:grid-cols-3
Image Height: h-56 (224px)
Hover: scale-110 + shadow-2xl
Border: border-2 hover:border-rose-200
```

## 🎯 Interactive Elements

### Buttons

```css
Primary:
  bg-rose-500 hover:bg-rose-600
  text-white font-semibold
  rounded-xl px-8 py-6

Outline:
  border-2 hover:bg-rose-50
  hover:text-rose-600 hover:border-rose-600

Social:
  Individual hover colors per platform
  Facebook: hover:bg-blue-50
  Twitter: hover:bg-sky-50
  LinkedIn: hover:bg-blue-50
```

### Links

```css
prose-a:
  text-rose-600
  no-underline
  hover:underline
  hover:text-rose-700
```

### Hover Effects

```css
Images:       scale-110 (500ms duration)
Cards:        shadow-xl elevation
Buttons:      Color + background transition
Tags:         bg-rose-50 + text-rose-600
```

## 📱 Responsive Breakpoints

### Mobile (< 768px)

- Single column layout
- Sidebar below content
- Smaller typography
- Touch-friendly buttons (min 44px)
- Hero: text-3xl (30px)

### Tablet (768px - 1024px)

- 2-column grid for related
- Adjusted spacing
- Hero: text-4xl (36px)
- Medium card padding

### Desktop (> 1024px)

- 4-column grid (3+1 sidebar)
- Full sidebar sticky
- Hero: text-6xl (96px)
- Maximum padding

## 🎨 Visual Hierarchy

### Level 1 (Most Important)

- Article title in hero
- Hero image
- Call-to-action buttons

### Level 2 (Important)

- Section headings
- Excerpt block
- Author information
- Social share buttons

### Level 3 (Supporting)

- Body content
- Tags
- Related articles
- Meta information

### Level 4 (Minimal)

- Sidebar actions
- Footer links
- Secondary text

## ✨ Special Effects

### Text Shadow (Hero)

```css
text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
```

### Backdrop Blur (Badges)

```css
backdrop-blur-md
bg-white/10
border-white/30
```

### Gradient Animation (CTA)

```css
background-size: 200% 200%
animation: gradient-animation 15s ease infinite
```

### Float Animation (Icons)

```css
@keyframes float {
  0%, 100%: translateY(0px)
  50%: translateY(-10px)
}
animation: float 3s ease-in-out infinite
```

## 🖨️ Print Styles

### Hidden Elements

- Navigation
- Buttons
- Sidebar
- Social share
- CTA section

### Optimized Elements

- Font size: 12pt
- Line height: 1.6
- Show link URLs
- Page break controls
- Optimized margins

## 🎯 Key Design Principles

1. **Visual Hierarchy**: Clear distinction between content levels
2. **Whitespace**: Generous spacing for readability
3. **Consistency**: Unified color scheme and spacing
4. **Accessibility**: High contrast, focus states
5. **Responsiveness**: Mobile-first approach
6. **Performance**: Optimized images and animations
7. **User Experience**: Intuitive navigation and actions

---

This design creates a **professional, modern news platform** that rivals industry-leading publications while maintaining the SESA brand identity.
