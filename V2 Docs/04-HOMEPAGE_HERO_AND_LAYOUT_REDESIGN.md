# Homepage Hero & Widescreen Layout Redesign

This document details the visual redesign, card components, #EC1640 red/black/white color scheme, and smooth scrolled navbar layout transitions implemented for the SESA website homepage and global footer.

---

## 1. Design System & Aesthetics

The homepage has been restructured into a cohesive, high-impact design system consisting of a stack of floating cards matching the reference mockup card container.

### Colors
- **Signature Red**: `#EC1640` used for badges, accents, glowing borders, active hover states, and primary button indicators.
- **Sleek Dark Theme**: Black (`bg-black`, `bg-neutral-950`, `border-neutral-900`) used for sections requiring contrast (Impact Stats and Call to Action) and the global footer.
- **Premium Light Theme**: White (`bg-white`) used for sections, headers, and container card frames.

### Containers & Frames
- All main sections wrap their contents inside a widescreen container frame (`max-w-[1600px] mx-auto px-3 pb-6 md:px-5`).
- Sections are encased in custom card elements with thick rounded corners (`rounded-[2rem] md:rounded-[2.5rem]`), a subtle border, and deep shadows (`border-slate-200/80 shadow-2xl`).

---

## 2. Component Enhancements

### Homepage Hero Section (`HomeHero.tsx` - [NEW])
- **Embedded Header**: Features SESA menu links on the left, centered `SESA_Logo_Black-01.png` logo, search pill with magnifying glass button, black "Join Us" button, and hamburger menu toggle on the right. Includes a slide-down mobile navigation panel.
- **Hero Inner Card**: Taller height profile (`h-[500px]` to `h-[840px]`), utilizing a high-quality developer background with dark gradients, custom bold typography (*"Code In / Build Strong / Deploy Free"*), a vertical social links sidebar, and a bottom-right frosted glass stats overlay (`backdrop-blur-md bg-white/10`).

### Homepage Body Sections ([REDESIGNED])
- **About SESA & What We Do**: Upgraded layout to double-columns. Redesigned core value cards with modern hover-border highlights and sleek, minimal icons (replacing generic colored circles).
- **Impact Stats**: Redesigned as a grand black widescreen container with radial blur glows. Stats metrics are housed inside custom dark cards (`bg-neutral-950/60 border-neutral-850 hover:border-[#EC1640]/60`) featuring glowing `#EC1640` numbers.
- **Featured Events**: Replaced standard grid cards with custom rounded image-zoom cards. Features dynamic `#EC1640` status badges and premium outlines to black hover buttons.
- **Latest Updates**: Combined news/blogs preview boxes updated with red category tag markers and modern card highlights on hover.
- **Testimonials**: Restructured quotes into floating card formats with custom red icons and circle user avatars that transition to a red `#EC1640` ring border on hover.
- **Partners**: Designed logo tiles as clean outline grids that light up in `#EC1640` and transition grayscale logos to color on hover.
- **Call To Action (CTA)**: Redesigned as a black widescreen card containing transparent outline cards, radial red/purple blurs, and action buttons styled as red `#EC1640` and white border pill buttons.

---

## 3. Navbar & Scroll Transition Optimization

### Global Navbar Redesign (`Navbar.tsx` - [REDESIGNED])
- ** homepage Header Offset**: Hides the global floating navigation bar when at the top of the homepage (`/` and `!hasScrolled`) to avoid overlapping the hero's built-in header. 
- **Floating Scrolled Pill State**: Restyled the floating scrolled state (`isDetached = true`) to use a red shadow blur (`shadow-[0_18px_45px_rgba(236,22,64,0.12)]`), red hover link text, `#EC1640` indicators, and a solid black CTA follow button that turns red `#EC1640` on hover.
- **Dynamic Logo Image**: Integrates the SESA logo (`SESA_Logo_Black-01.png`) inside the scrolled navbar. Programmed the logo to automatically invert to white using CSS filters (`brightness-0 invert`) when the navbar is in dark mode (on dark pages).
- **Smoothed Scroll Morph Transition**:
  - Replaced the inner container `div` in `Navbar.tsx` with a `<motion.div layout>` component.
  - Specified a layout transition (`duration: 0.45, ease: [0.22, 1, 0.36, 1]`) to animate margins (`mt-0` to `mt-6`), width (`w-full` to `w-[min(92%,1100px)]`), and border-radius (`rounded-none` to `rounded-full`) with hardware acceleration.
  - Removed conflicting global CSS transitions (`transition-all duration-500`) from the outer header wrapper to prevent frame drop stutter.

---

## 4. Widescreen Footer Redesign (`Footer.tsx` - [REDESIGNED])
- Wrapped the global footer inside the matching container system (`max-w-[1600px] border rounded-[2.5rem] bg-neutral-950`).
- Added a subtle `#EC1640` red radial glow in the background.
- Replaced all previous rose-400 styles with `#EC1640` brand red across contact icons, links, and hover states.

---

## 5. Summary of Files Affected

- **[public/SESA_Logo_Black-01.png](file:///c:/Users/minin/Documents/GitHub/SESA-Website/public/SESA_Logo_Black-01.png)**: Static logo asset placement.
- **[src/components/HomeHero.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/components/HomeHero.tsx)**: Main homepage hero layout.
- **[src/components/Navbar.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/components/Navbar.tsx)**: Scroll-morph navbar logic & layout animation.
- **[src/components/Footer.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/components/Footer.tsx)**: Global themed footer.
- **[src/app/(webpage)/page.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/page.tsx)**: Homepage import integration.
- **[src/app/(webpage)/AboutSection.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/AboutSection.tsx)**: Rounded card container wrapper & core value cards.
- **[src/app/(webpage)/StatsSection.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/StatsSection.tsx)**: Widescreen dark impact stats.
- **[src/app/(webpage)/FeaturedEvents.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/FeaturedEvents.tsx)**: Rounded image-zoom event cards.
- **[src/app/(webpage)/LatestUpdatesSection.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/LatestUpdatesSection.tsx)**: Modern hover preview posts.
- **[src/app/(webpage)/TestimonialsSection.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/TestimonialsSection.tsx)**: Floating quotes & red avatar highlights.
- **[src/app/(webpage)/PartnersSection.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/PartnersSection.tsx)**: Glowing network logos.
- **[src/app/(webpage)/CTASection.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/CTASection.tsx)**: Footer dark card CTA.
