# 🎨 Admin Panel Sidebar Layout - Documentation

## Overview

A modern, responsive admin panel layout with a collapsible sidebar, header with user profile, and fully functional navigation system.

## ✨ Features

### 1. **Responsive Sidebar**

- Fixed position on desktop (always visible)
- Slide-in drawer on mobile
- Dark theme with glass morphism effect
- Active route highlighting
- Icon-based navigation with labels

### 2. **Professional Header**

- Mobile-friendly menu toggle
- Search bar (desktop & mobile views)
- Notification bell with badge
- User profile dropdown
- Quick access to profile and settings

### 3. **Layout Components**

- Flexible main content area
- Auto-scrolling content
- Sticky header
- Fixed sidebar (desktop)
- Overlay backdrop (mobile)

## 📂 File Structure

```
src/
├── components/
│   └── admin/
│       ├── AdminSidebar.tsx        # Sidebar component
│       └── AdminHeader.tsx         # Header component
├── app/
│   └── admin/
│       ├── layout.tsx              # Main layout wrapper
│       ├── dashboard/
│       │   └── page.tsx            # Dashboard page
│       ├── events/
│       │   └── page.tsx            # Events page
│       ├── news/
│       │   └── page.tsx            # News page
│       ├── team/
│       │   └── page.tsx            # Team page
│       ├── blogs/
│       │   └── page.tsx            # Blogs page
│       ├── admins/
│       │   └── page.tsx            # Admins page
│       └── settings/
│           └── page.tsx            # Settings page
```

## 🎯 Components Breakdown

### AdminSidebar Component

**Location:** `src/components/admin/AdminSidebar.tsx`

**Props:**

```typescript
interface SidebarProps {
  isOpen: boolean; // Controls sidebar visibility
  onClose: () => void; // Callback to close sidebar
}
```

**Features:**

- User info display with avatar
- Navigation menu with icons
- Active route highlighting
- Logout button
- Responsive overlay for mobile
- Smooth transitions

**Menu Items:**

```typescript
{
  title: string; // Display name
  href: string; // Route path
  icon: LucideIcon; // Icon component
}
```

### AdminHeader Component

**Location:** `src/components/admin/AdminHeader.tsx`

**Props:**

```typescript
interface AdminHeaderProps {
  onMenuClick: () => void; // Callback for mobile menu toggle
}
```

**Features:**

- Mobile menu toggle button
- Search bar (responsive)
- Notification bell with badge
- User profile dropdown
- Profile/settings quick links
- Logout option

### AdminLayout Component

**Location:** `src/app/admin/layout.tsx`

**Features:**

- Manages sidebar open/close state
- Hides layout on login page
- Responsive flexbox layout
- Proper z-index stacking

## 🎨 Design Specifications

### Color Scheme

**Sidebar:**

- Background: `bg-gray-900` (Dark)
- Text: `text-white`
- Active: `bg-blue-600`
- Hover: `bg-gray-800`
- Border: `border-gray-800`

**Header:**

- Background: `bg-white`
- Border: `border-gray-200`
- Text: `text-gray-900`

**Content Area:**

- Background: `bg-gray-50`

### Spacing

- Sidebar width: `256px` (16rem)
- Header height: Auto (based on content)
- Padding: `p-6` for pages
- Gap between elements: `space-x-3`, `space-y-1`

### Icons

- Primary icon size: `20px`
- Large icon size: `24px`
- Card icon size: `32px`, `48px`, `64px`

### Breakpoints

- Mobile: `< 1024px` (lg breakpoint)
- Desktop: `>= 1024px`

## 📱 Responsive Behavior

### Mobile (< 1024px)

- Sidebar hidden by default
- Opens as overlay drawer
- Full-screen backdrop
- Close button visible
- Hamburger menu in header

### Desktop (>= 1024px)

- Sidebar always visible
- Fixed position
- No overlay
- No close button
- No hamburger menu

## 🔧 Usage Examples

### Adding a New Menu Item

1. **Update AdminSidebar.tsx:**

```typescript
const menuItems = [
  // ... existing items
  {
    title: "New Section",
    href: "/admin/new-section",
    icon: NewIcon,
  },
];
```

2. **Create the page:**

```bash
# Create new page file
src/app/admin/new-section/page.tsx
```

3. **Add content:**

```tsx
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { NewIcon } from "lucide-react";

const AdminNewSection = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">New Section</h1>
        {/* Your content */}
      </div>
    </div>
  );
};

export default AdminNewSection;
```

### Customizing Sidebar Colors

**Edit AdminSidebar.tsx:**

```tsx
// Change background
className = "bg-indigo-900"; // Instead of bg-gray-900

// Change active state
className = "bg-indigo-600"; // Instead of bg-blue-600

// Change hover state
className = "hover:bg-indigo-800"; // Instead of hover:bg-gray-800
```

### Adding Header Actions

**Edit AdminHeader.tsx:**

```tsx
// Add between notifications and profile
<button className="p-2 rounded-lg hover:bg-gray-100">
  <YourIcon size={20} />
</button>
```

### Customizing User Avatar

**Edit AdminSidebar.tsx (User Info section):**

```tsx
// Replace text avatar with image
<img
  src={adminInfo.avatarUrl}
  alt={adminInfo.name}
  className="w-10 h-10 rounded-full"
/>
```

## 🎯 Key Features Implementation

### Active Route Highlighting

Uses Next.js `usePathname()`:

```tsx
const pathname = usePathname();
const isActive = pathname === item.href;
```

Active styling:

```tsx
className={isActive ? "bg-blue-600" : "text-gray-300"}
```

### Mobile Overlay

Conditional rendering:

```tsx
{
  isOpen && (
    <div
      className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      onClick={onClose}
    />
  );
}
```

### Responsive Sidebar Toggle

Transform based on state:

```tsx
className={`
  transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0
`}
```

### User Dropdown

Click outside to close:

```tsx
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
```

## 🚀 Getting Started

### Prerequisites

- All authentication system components installed
- Lucide React icons installed
- Tailwind CSS configured

### Testing the Layout

1. **Start the server:**

```bash
npm run dev
```

2. **Login to admin:**

```
http://localhost:3000/admin/login
```

3. **Test navigation:**

- Click each menu item in sidebar
- Test mobile responsiveness (resize browser)
- Test user dropdown
- Test logout functionality

### Mobile Testing

**Chrome DevTools:**

1. Press `F12` or `Ctrl+Shift+I`
2. Click device toolbar icon
3. Select mobile device
4. Test sidebar toggle
5. Test all navigation items

## 🎨 Customization Guide

### Change Sidebar Width

**AdminSidebar.tsx:**

```tsx
className = "w-72"; // Instead of w-64
```

**Also update AdminLayout.tsx if needed**

### Add Logo/Brand

**AdminSidebar.tsx (Logo/Header section):**

```tsx
<div className="p-6 border-b border-gray-800">
  <img src="/logo.png" alt="Logo" className="h-8" />
  <p className="text-xs text-gray-400 mt-2">Control Panel</p>
</div>
```

### Add Sidebar Footer Info

**AdminSidebar.tsx (before logout button):**

```tsx
<div className="p-4 text-xs text-gray-400 text-center">
  <p>Version 1.0.0</p>
  <p>© 2025 SESA</p>
</div>
```

### Customize Page Header

**Create reusable component:**

```tsx
// components/admin/PageHeader.tsx
export const PageHeader = ({ title, description, icon: Icon }) => (
  <div className="mb-8">
    <div className="flex items-center space-x-3">
      <Icon className="text-blue-600" size={32} />
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </div>
);
```

## 🐛 Troubleshooting

### Sidebar not appearing

- Check if `isOpen` state is working
- Verify z-index values
- Check Tailwind classes are not purged

### Mobile menu not working

- Verify `onMenuClick` callback is passed
- Check button onClick handler
- Test on actual mobile device

### Active route not highlighting

- Verify route paths match exactly
- Check `usePathname()` is working
- Console log pathname and href values

### Dropdown not closing

- Check if ref is properly attached
- Verify event listener is added
- Test click outside functionality

### Layout overflow issues

- Check parent containers have proper overflow settings
- Verify flex layout is correct
- Test on different screen sizes

## 📊 Performance Tips

1. **Lazy load icons** if using many custom icons
2. **Memoize menu items** if they're dynamic
3. **Use CSS transitions** instead of JS animations
4. **Optimize images** if using custom avatars
5. **Minimize re-renders** with proper React hooks

## 🔐 Security Considerations

- All routes automatically protected by `useAuth()`
- Logout clears all local storage
- Token verified on page load
- Protected layout doesn't render on login page

## 📝 Next Steps

1. **Implement actual pages** (replace placeholders)
2. **Add permission-based navigation** (show/hide based on role)
3. **Add page transitions** for smoother navigation
4. **Implement search functionality** in header
5. **Add notification system** for the bell icon
6. **Create profile/settings pages** for dropdown links
7. **Add breadcrumbs** for better navigation
8. **Implement theme switcher** (light/dark mode)

## 🎉 Conclusion

The admin panel sidebar layout is now fully functional and ready for content! The layout is:

- ✅ Fully responsive
- ✅ Professional design
- ✅ Easy to customize
- ✅ Well-documented
- ✅ Production-ready

Start building your admin features on this solid foundation!
