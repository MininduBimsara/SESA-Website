# Homepage Dynamic Content Management

Complete guide for managing testimonials, statistics, and partners on the SESA website.

## Overview

Three new dynamic content management features have been added to the website:
1. **Testimonials** - Member quotes and feedback
2. **Statistics** - Impact numbers (members, events, awards, projects)
3. **Partners** - Collaborator/sponsor logos

All three features include:
- ✅ Database integration (MongoDB via Prisma)
- ✅ Full CRUD API routes
- ✅ Admin management interfaces
- ✅ Homepage display with server-side rendering
- ✅ Image upload support (testimonials & partners)
- ✅ Order/priority management
- ✅ Active/inactive toggle

---

## Database Models

### Testimonial Model
```prisma
model Testimonial {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  role      String
  image     String?
  quote     String
  featured  Boolean  @default(false)  // Show on homepage
  order     Int      @default(0)       // Display order
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Statistic Model
```prisma
model Statistic {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  label     String
  value     String
  icon      String   // Lucide icon name (e.g., "Users")
  color     String   @default("rose")  // rose, blue, purple, green
  order     Int      @default(0)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Partner Model
```prisma
model Partner {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  logo      String
  website   String?  // Optional URL
  order     Int      @default(0)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## API Routes

### Testimonials API

**`GET /api/testimonials`**
- Returns all testimonials ordered by `order` (asc) and `createdAt` (desc)

**`POST /api/testimonials`**
- Creates new testimonial with FormData
- Fields: `name`, `role`, `quote`, `featured`, `order`, `image` (file)
- Uploads image to `/public/uploads/testimonials/`

**`GET /api/testimonials/[id]`**
- Returns single testimonial by ID

**`PUT /api/testimonials/[id]`**
- Updates testimonial
- Can update image (deletes old image if new one uploaded)

**`DELETE /api/testimonials/[id]`**
- Deletes testimonial and its image file

### Statistics API

**`GET /api/statistics`**
- Returns all active statistics ordered by `order` and `createdAt`

**`POST /api/statistics`**
- Creates new statistic with JSON body
- Fields: `label`, `value`, `icon`, `color`, `order`, `active`

**`GET /api/statistics/[id]`**
- Returns single statistic

**`PUT /api/statistics/[id]`**
- Updates statistic

**`DELETE /api/statistics/[id]`**
- Deletes statistic

### Partners API

**`GET /api/partners`**
- Returns all active partners ordered by `order` and `createdAt`

**`POST /api/partners`**
- Creates new partner with FormData
- Fields: `name`, `logo` (file), `website`, `order`, `active`
- Uploads logo to `/public/uploads/partners/`

**`GET /api/partners/[id]`**
- Returns single partner

**`PUT /api/partners/[id]`**
- Updates partner
- Can update logo (deletes old logo if new one uploaded)

**`DELETE /api/partners/[id]`**
- Deletes partner and its logo file

---

## Admin Pages

### Testimonials Management (`/admin/testimonials`)

**Features:**
- Grid display of all testimonials with name, role, quote preview
- Add/Edit form with:
  - Name input
  - Role input
  - Quote textarea
  - Image file upload
  - Featured checkbox (show on homepage)
  - Order number input
- Edit button (opens form with pre-filled data)
- Delete button (with confirmation)
- Featured indicator (star icon)
- Empty state message

**Image Requirements:**
- Format: Any image format (PNG, JPG, WEBP recommended)
- Recommended: Square aspect ratio (profile photos)
- Uploaded to: `/public/uploads/testimonials/`

### Statistics Management (`/admin/statistics`)

**Features:**
- Grid display of all statistics with icon, value, label
- Add/Edit form with:
  - Label input (e.g., "Active Members")
  - Value input (e.g., "200+")
  - Icon selector (dropdown with common icons)
  - Color selector (rose, blue, purple, green)
  - Order number input
  - Active checkbox
- Edit button
- Delete button (with confirmation)
- Active/inactive indicator (eye icon)
- Empty state message

**Available Icons:**
- Users, Calendar, Trophy, Code, Award, Target, Zap, Star, Heart, TrendingUp

**Available Colors:**
- Rose (red/pink gradient background)
- Blue (blue gradient background)
- Purple (purple gradient background)
- Green (green gradient background)

### Partners Management (`/admin/partners`)

**Features:**
- Grid display of all partners with logo and name
- Add/Edit form with:
  - Name input
  - Logo file upload
  - Website URL input (optional)
  - Order number input
  - Active checkbox
- Edit button
- Delete button (with confirmation)
- Active/inactive indicator (eye icon)
- Website link (opens in new tab)
- Empty state message

**Logo Requirements:**
- Format: PNG with transparent background preferred
- Recommended: Square aspect ratio
- Size: Displays at 80x80px (will be resized)
- Uploaded to: `/public/uploads/partners/`

---

## Homepage Integration

### Testimonials Section

**File:** `/src/app/(webpage)/TestimonialsSection.tsx`

**Display:**
- Shows 3 featured testimonials in a grid
- Each card includes:
  - Circular profile image
  - Name and role
  - Quote icon
  - Full quote text
- Gray background section

**Data Fetching:**
```tsx
const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    take: 3,
})
```

### Statistics Section

**File:** `/src/app/(webpage)/StatsSection.tsx`

**Display:**
- Shows all active statistics in a 4-column grid (2 on mobile)
- Each card includes:
  - Colored circular icon background
  - Large value text
  - Label text
- Rose gradient background section

**Icon Handling:**
- Dynamically loads Lucide icons by name
- Falls back to Users icon if not found

### Partners Section

**File:** `/src/app/(webpage)/PartnersSection.tsx`

**Display:**
- Shows all active partners in a 6-column grid (2/3 on mobile/tablet)
- Each card includes:
  - Partner logo (grayscale, colored on hover)
  - Clickable if website URL provided
- White background section

**Logo Display:**
- 80x80px size
- Grayscale filter with smooth hover transition
- Object-contain to preserve aspect ratio

---

## Admin Sidebar Integration

**File:** `/src/components/admin/AdminSidebar.tsx`

**New Menu Items:**
```tsx
{
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: Quote,
},
{
    title: "Statistics",
    href: "/admin/statistics",
    icon: BarChart3,
},
{
    title: "Partners",
    href: "/admin/partners",
    icon: Handshake,
}
```

Icons imported from `lucide-react`: `Quote`, `BarChart3`, `Handshake`

---

## Usage Instructions

### Managing Testimonials

1. Navigate to **Admin > Testimonials**
2. Click **"Add Testimonial"** button
3. Fill in the form:
   - Name: Student/member name
   - Role: Their position (e.g., "President 2025/26")
   - Quote: Their testimonial message
   - Image: Upload profile photo
   - Featured: Check to display on homepage
   - Order: Lower numbers appear first (0, 1, 2...)
4. Click **"Create"**
5. To edit: Click edit icon on any testimonial card
6. To delete: Click trash icon (confirms before deleting)

**Note:** Only featured testimonials appear on homepage (max 3 displayed)

### Managing Statistics

1. Navigate to **Admin > Statistics**
2. Click **"Add Statistic"** button
3. Fill in the form:
   - Label: Description (e.g., "Active Members")
   - Value: Number/text (e.g., "200+")
   - Icon: Select from dropdown (Users, Trophy, Calendar, etc.)
   - Color: Choose background color theme
   - Order: Display order (0, 1, 2, 3 for 4 stats)
   - Active: Check to display on homepage
4. Click **"Create"**
5. To edit: Click edit icon on any stat card
6. To delete: Click trash icon

**Best Practices:**
- Keep values short (3-5 characters works best)
- Use "+" suffix for large numbers (200+, 50+)
- Limit to 4-6 statistics for clean design
- Use different colors for visual variety

### Managing Partners

1. Navigate to **Admin > Partners**
2. Click **"Add Partner"** button
3. Fill in the form:
   - Name: Organization name
   - Logo: Upload logo file (square PNG preferred)
   - Website: Optional partner website URL
   - Order: Display order
   - Active: Check to display on homepage
4. Click **"Create"**
5. To edit: Click edit icon on any partner card
6. To delete: Click trash icon

**Logo Tips:**
- Use PNG with transparent background
- Square aspect ratio works best
- Keep file size under 500KB
- Logo displays at 80x80px
- Grayscale filter applied (removes on hover)

---

## File Structure

```
src/
├── app/
│   ├── (webpage)/
│   │   ├── TestimonialsSection.tsx   # Homepage testimonials display
│   │   ├── StatsSection.tsx          # Homepage statistics display
│   │   └── PartnersSection.tsx       # Homepage partners display
│   ├── admin/
│   │   ├── testimonials/
│   │   │   └── page.tsx              # Testimonials management
│   │   ├── statistics/
│   │   │   └── page.tsx              # Statistics management
│   │   └── partners/
│   │       └── page.tsx              # Partners management
│   └── api/
│       ├── testimonials/
│       │   ├── route.ts              # GET all, POST new
│       │   └── [id]/
│       │       └── route.ts          # GET, PUT, DELETE by ID
│       ├── statistics/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       └── partners/
│           ├── route.ts
│           └── [id]/
│               └── route.ts
├── components/
│   └── admin/
│       └── AdminSidebar.tsx          # Updated with new menu items
└── prisma/
    └── schema.prisma                 # Database models

public/
└── uploads/
    ├── testimonials/                 # Uploaded profile photos
    └── partners/                     # Uploaded partner logos
```

---

## Common Tasks

### Adding Initial Statistics

After deployment, add some default statistics:

1. **Active Members**
   - Label: "Active Members"
   - Value: "200+"
   - Icon: Users
   - Color: Rose
   - Order: 0

2. **Events Per Year**
   - Label: "Events Per Year"
   - Value: "50+"
   - Icon: Calendar
   - Color: Blue
   - Order: 1

3. **Awards Won**
   - Label: "Awards Won"
   - Value: "25+"
   - Icon: Trophy
   - Color: Purple
   - Order: 2

4. **Projects Completed**
   - Label: "Projects Completed"
   - Value: "100+"
   - Icon: Code
   - Color: Green
   - Order: 3

### Adding Initial Partners

Add your university and main collaborators:

1. University of Kelaniya
2. Faculty of Science
3. SETU (if applicable)
4. Any industry partners/sponsors

---

## Troubleshooting

### Images Not Displaying

**Problem:** Uploaded images show broken image icon

**Solutions:**
1. Check that `/public/uploads/testimonials/` and `/public/uploads/partners/` directories exist
2. Verify file permissions on upload directories
3. Ensure images are being saved correctly (check server logs)
4. Verify image paths in database start with `/uploads/`

### Icons Not Showing (Statistics)

**Problem:** Statistics show default Users icon instead of selected icon

**Solutions:**
1. Ensure icon name matches exact Lucide React icon name
2. Check browser console for errors
3. Available icons: Users, Calendar, Trophy, Code, Award, Target, Zap, Star, Heart, TrendingUp
4. Icon names are case-sensitive

### Testimonials Not Appearing on Homepage

**Problem:** Created testimonials don't show on homepage

**Solutions:**
1. Verify "Featured" checkbox is checked
2. Check that order number is set (0, 1, 2)
3. Homepage shows max 3 testimonials
4. Lower order numbers appear first

### Partner Logo Quality Issues

**Problem:** Partner logos look pixelated or stretched

**Solutions:**
1. Upload higher resolution images (at least 200x200px)
2. Use square aspect ratio
3. Use PNG format with transparent background
4. Logos display at 80x80px - upload at 2x size (160x160px) for retina displays

---

## Security Considerations

### Authentication Required

All admin routes require authentication:
- Managed by `/src/lib/useAuth.ts`
- Only logged-in admins can access management pages
- API routes should validate authentication

### File Upload Security

**Testimonials & Partners:**
- Only accepts image files
- Files saved with timestamp prefix to prevent collisions
- Old images deleted when updating

**Best Practices:**
- Validate file types on server
- Limit file sizes (implement if needed)
- Sanitize filenames
- Store uploads outside webroot if possible

### Input Validation

- All text inputs should be sanitized
- URLs validated for partners website field
- Order numbers validated as integers
- Featured/Active booleans validated

---

## Performance Optimization

### Homepage Loading

All sections use server-side rendering:
- Data fetched at build time/request time
- No client-side loading states needed
- SEO-friendly content

### Image Optimization

- Next.js Image component used for all images
- Automatic lazy loading
- Responsive image sizes
- WebP format when supported

### Database Queries

All queries optimized:
- Indexed fields: `order`, `createdAt`, `featured`, `active`
- Limited results (testimonials: take 3)
- Filtered by active/featured status

---

## Future Enhancements

Potential improvements:

1. **Testimonials:**
   - Video testimonials support
   - LinkedIn profile integration
   - Carousel/slider for more than 3

2. **Statistics:**
   - Animated counters on scroll
   - Historical data tracking
   - Graph/chart visualization

3. **Partners:**
   - Partner categories/tiers
   - Partnership start/end dates
   - Partner spotlight feature
   - Logo carousel animation

4. **General:**
   - Drag-and-drop reordering
   - Bulk actions (delete multiple, toggle active)
   - Import/export functionality
   - Image cropping tool
   - Preview mode before publishing

---

## Support

For issues or questions:
1. Check this documentation
2. Review Troubleshooting section
3. Check browser/server console logs
4. Verify database connection
5. Test API routes directly

**Related Documentation:**
- `TEAM_PAGE_INTEGRATION.md` - Similar patterns for team management
- `ADMIN_SYSTEM_SUMMARY.md` - Admin panel overview
- `QUICKSTART_ADMIN.md` - Admin getting started guide
