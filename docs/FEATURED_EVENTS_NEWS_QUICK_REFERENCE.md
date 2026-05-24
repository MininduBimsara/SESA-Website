# Featured Events & Latest Updates - Quick Reference

Fast guide for managing homepage Featured Events and Latest Updates sections.

## Quick Links

- **Events Admin:** `/admin/events`
- **News Admin:** `/admin/news`
- **Homepage:** `/`

---

## Featured Events

### Display Requirements
- ✅ Event must have **"Featured" checkbox** checked
- Shows **4 events** maximum
- Ordered by **date** (newest first)

### How to Feature an Event
1. Go to `/admin/events`
2. Click event or "Add Event"
3. ✅ Check **"Featured"** checkbox
4. Fill required fields (title, description, date)
5. Set status: ongoing/upcoming/past
6. Upload image (optional)
7. Click "Save"

### Event Status Colors
- 🟢 **Ongoing** - Green badge
- 🔵 **Upcoming** - Blue badge
- ⚫ **Past** - Gray badge

---

## Latest Updates (News)

### Display Requirements
- ✅ News must be **"Published"**
- ✅ News must be **"Featured"**
- Shows **4 news items** maximum
- Ordered by **creation date** (newest first)

### How to Feature News
1. Go to `/admin/news`
2. Click article or "Add News"
3. ✅ Check **"Published"** checkbox
4. ✅ Check **"Featured"** checkbox
5. Fill required fields (title, content, slug)
6. Add excerpt (recommended)
7. Set category for icon/color
8. Click "Save"

### Category Icons & Colors

| Category Keyword | Icon | Color |
|-----------------|------|-------|
| Achievement, Award | 🏆 Award | Rose (Pink) |
| Workshop, Tech | 💻 Code | Blue |
| Opportunity, Career | 📈 Trending | Purple |
| Default/News | 📰 Newspaper | Green |

**Note:** Category matching is case-insensitive and checks if keyword is included in category name.

---

## Common Tasks

### Feature an Existing Event
1. `/admin/events` → Click event
2. ✅ Check "Featured"
3. Click "Update"

### Feature Existing News
1. `/admin/news` → Click article
2. ✅ Check "Published" and "Featured"
3. Click "Update"

### Unfeature Event/News
1. Go to admin page
2. Click item
3. ❌ Uncheck "Featured"
4. Click "Update"

### Change Event Status
1. `/admin/events` → Click event
2. Change status dropdown:
   - Ongoing (happening now)
   - Upcoming (future event)
   - Past (completed)
3. Click "Update"

---

## Best Practices

### Events
- Feature 4-6 important events
- Use clear, descriptive titles
- Add event images when possible
- Set correct status
- Update status after event ends

### News
- Feature 4-6 important articles
- Write concise excerpts (1-2 sentences)
- Use appropriate categories
- Update regularly (weekly recommended)
- Remove old featured news

---

## Relative Time Display

News shows relative time automatically:
- Today
- Yesterday
- 3 days ago
- 2 weeks ago
- 1 month ago
- 2 years ago

---

## Empty States

**No Events:** "No featured events available at this time."
**No News:** "No news updates available at this time."

Both show automatically when no items match criteria.

---

## Quick Troubleshooting

### Event Not Showing
- ✅ Is "Featured" checked?
- Is event saved?
- Refresh homepage

### News Not Showing
- ✅ Is "Published" checked?
- ✅ Is "Featured" checked?
- Is news saved?
- Refresh homepage

### Wrong Icon on News
- Check category spelling
- Use keyword: achievement, workshop, opportunity
- Save changes

---

## Database Fields Reference

### Event
```
featured: true/false  ← Homepage display
status: 'ongoing' | 'upcoming' | 'past'
```

### News
```
published: true/false  ← Visibility
featured: true/false   ← Homepage display
category: string       ← Icon/color selection
```

---

## Full Documentation

See `FEATURED_EVENTS_NEWS_INTEGRATION.md` for complete details.
