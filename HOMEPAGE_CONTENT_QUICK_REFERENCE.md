# Homepage Content Quick Reference

Fast guide for managing testimonials, statistics, and partners.

## Quick Links

- **Testimonials Admin:** `/admin/testimonials`
- **Statistics Admin:** `/admin/statistics`
- **Partners Admin:** `/admin/partners`

---

## Testimonials

### Add New Testimonial
1. Go to `/admin/testimonials`
2. Click "Add Testimonial"
3. Fill: Name, Role, Quote, Image
4. ✅ Check "Featured" to show on homepage
5. Set Order (0, 1, 2...)
6. Click "Create"

**Homepage Display:** Shows 3 featured testimonials

---

## Statistics

### Add New Statistic
1. Go to `/admin/statistics`
2. Click "Add Statistic"
3. Fill: Label, Value, Icon, Color
4. ✅ Check "Active" to show on homepage
5. Set Order (0-3 for 4 stats)
6. Click "Create"

**Available Icons:**
- Users, Calendar, Trophy, Code
- Award, Target, Zap, Star, Heart, TrendingUp

**Colors:** Rose, Blue, Purple, Green

**Homepage Display:** Shows all active statistics in 4-column grid

---

## Partners

### Add New Partner
1. Go to `/admin/partners`
2. Click "Add Partner"
3. Fill: Name, Logo (PNG), Website (optional)
4. ✅ Check "Active" to show on homepage
5. Set Order
6. Click "Create"

**Logo Tips:**
- PNG with transparent background
- Square aspect ratio
- At least 160x160px

**Homepage Display:** Shows all active partners in 6-column grid

---

## API Endpoints

### Testimonials
```
GET    /api/testimonials
POST   /api/testimonials
GET    /api/testimonials/[id]
PUT    /api/testimonials/[id]
DELETE /api/testimonials/[id]
```

### Statistics
```
GET    /api/statistics
POST   /api/statistics
GET    /api/statistics/[id]
PUT    /api/statistics/[id]
DELETE /api/statistics/[id]
```

### Partners
```
GET    /api/partners
POST   /api/partners
GET    /api/partners/[id]
PUT    /api/partners/[id]
DELETE /api/partners/[id]
```

---

## Database Models

```prisma
model Testimonial {
  id       String  @id
  name     String
  role     String
  image    String?
  quote    String
  featured Boolean @default(false)
  order    Int     @default(0)
}

model Statistic {
  id     String  @id
  label  String
  value  String
  icon   String
  color  String  @default("rose")
  order  Int     @default(0)
  active Boolean @default(true)
}

model Partner {
  id      String  @id
  name    String
  logo    String
  website String?
  order   Int     @default(0)
  active  Boolean @default(true)
}
```

---

## File Uploads

**Testimonials:** `/public/uploads/testimonials/`
**Partners:** `/public/uploads/partners/`

---

## Common Issues

### Testimonial Not Showing
- ✅ Check "Featured" is enabled
- Order is set correctly
- Max 3 testimonials display

### Statistic Not Showing
- ✅ Check "Active" is enabled
- Icon name is valid
- Order is set

### Partner Logo Not Showing
- ✅ Check "Active" is enabled
- Logo file uploaded successfully
- File exists in `/public/uploads/partners/`

---

## Default Statistics

Recommended initial stats:

| Label | Value | Icon | Color | Order |
|-------|-------|------|-------|-------|
| Active Members | 200+ | Users | Rose | 0 |
| Events Per Year | 50+ | Calendar | Blue | 1 |
| Awards Won | 25+ | Trophy | Purple | 2 |
| Projects Completed | 100+ | Code | Green | 3 |

---

## Order Management

**Lower numbers = Higher priority**

- Order 0 appears first
- Order 1 appears second
- Order 2 appears third
- etc.

Use increments of 10 (0, 10, 20...) to easily insert items between existing ones later.

---

## Full Documentation

See `HOMEPAGE_CONTENT_MANAGEMENT.md` for complete details.
