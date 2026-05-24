# 📅 Events Management System - Complete Documentation

## Overview

A full-featured admin system for managing campus events with CRUD operations, filtering, and a beautiful UI.

## ✨ Features Implemented

### 1. **Complete CRUD Operations**

- ✅ Create new events
- ✅ Read/View all events
- ✅ Update existing events
- ✅ Delete events with confirmation

### 2. **Event Management UI**

- Dashboard with statistics cards
- Searchable and filterable table view
- Status badges (Upcoming, Ongoing, Past)
- Category badges (Hackathon, Workshop, etc.)
- Featured event indicators
- Responsive design

### 3. **Event Form**

- Comprehensive form with validation
- All event fields supported
- Edit existing events
- Featured event checkbox
- Error handling and feedback

### 4. **API Endpoints**

- GET `/api/events` - List all events
- POST `/api/events` - Create event
- GET `/api/events/[id]` - Get single event
- PUT `/api/events/[id]` - Update event
- DELETE `/api/events/[id]` - Delete event

## 📂 File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── events/
│   │       └── page.tsx                    # Main events management page
│   ├── api/
│   │   └── events/
│   │       ├── route.ts                    # GET all, POST create
│   │       └── [id]/
│   │           └── route.ts                # GET, PUT, DELETE by ID
│   └── (webpage)/
│       └── events/
│           └── page.tsx                    # Public events page
├── components/
│   └── admin/
│       └── EventForm.tsx                   # Event creation/edit form
├── types/
│   └── event.ts                            # Shared type definitions
└── prisma/
    └── schema.prisma                       # Updated Event model
```

## 🎯 Event Data Model

### Prisma Schema

```prisma
model Event {
  id              String   @id @default(auto()) @map("_id") @db.ObjectId
  title           String
  description     String
  longDescription String?
  date            String   // e.g., "March 15-16, 2025"
  time            String?  // e.g., "9:00 AM - 6:00 PM"
  location        String?
  image           String?
  status          String   @default("upcoming") // upcoming, ongoing, past
  category        String   @default("workshop") // hackathon, workshop, social, csr, competition
  participants    Int?
  registrationLink String?
  featured        Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### TypeScript Interface

```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  time?: string;
  location?: string;
  image?: string;
  status: "upcoming" | "ongoing" | "past";
  category: "hackathon" | "workshop" | "social" | "csr" | "competition";
  participants?: number;
  registrationLink?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 🚀 Getting Started

### 1. Update Database Schema

The Prisma schema has been updated. Run:

```bash
npx prisma generate
npx prisma db push
```

### 2. Access Events Management

```
http://localhost:3000/admin/events
```

### 3. Create Your First Event

1. Click "Add New Event" button
2. Fill in the form fields
3. Click "Create Event"

## 📋 Features Breakdown

### Statistics Dashboard

Shows 4 key metrics:

- **Total Events** - All events count
- **Upcoming** - Events marked as upcoming
- **Ongoing** - Currently running events
- **Featured** - Events marked as featured

### Search & Filter

**Search Bar:**

- Search by title or description
- Real-time filtering

**Status Filter:**

- All Status
- Upcoming
- Ongoing
- Past

**Category Filter:**

- All Categories
- Hackathons
- Workshops
- Competitions
- Social Events
- CSR Activities

### Events Table

**Columns:**

- Event (title, location, featured indicator)
- Date & Time
- Category (color-coded badge)
- Status (color-coded badge)
- Participants count
- Actions (Edit, Delete)

**Features:**

- Responsive table
- Hover effects
- Star icon for featured events
- Color-coded badges
- Action buttons with icons

### Event Form Fields

**Required Fields (\*):**

- Title
- Short Description
- Date

**Optional Fields:**

- Long Description
- Time
- Location
- Image URL
- Status (dropdown)
- Category (dropdown)
- Participants (number)
- Registration Link
- Featured (checkbox)

**Form Features:**

- Client-side validation
- Error messages
- Loading states
- Cancel button
- Create/Update modes

### Delete Confirmation

- Modal dialog
- Warning message
- Cancel option
- Confirm delete button
- Prevents accidental deletion

## 🎨 UI Components

### Status Badges

```typescript
const statusColors = {
  upcoming: "bg-blue-100 text-blue-700",
  ongoing: "bg-green-100 text-green-700",
  past: "bg-gray-100 text-gray-700",
};
```

### Category Badges

```typescript
const categoryColors = {
  hackathon: "bg-purple-100 text-purple-700",
  workshop: "bg-blue-100 text-blue-700",
  social: "bg-pink-100 text-pink-700",
  csr: "bg-green-100 text-green-700",
  competition: "bg-orange-100 text-orange-700",
};
```

## 🔌 API Usage Examples

### Create Event

```bash
POST /api/events
Content-Type: application/json

{
  "title": "RealHack 5.0",
  "description": "Inter-university hackathon",
  "longDescription": "Full description here...",
  "date": "March 15-16, 2025",
  "time": "9:00 AM - 6:00 PM",
  "location": "Faculty of Science",
  "image": "/path/to/image.jpg",
  "status": "upcoming",
  "category": "hackathon",
  "participants": 150,
  "registrationLink": "https://register.com",
  "featured": true
}
```

### Update Event

```bash
PUT /api/events/[event-id]
Content-Type: application/json

{
  // Same fields as create
}
```

### Delete Event

```bash
DELETE /api/events/[event-id]
```

### Get All Events

```bash
GET /api/events
```

Response:

```json
[
  {
    "id": "...",
    "title": "RealHack 5.0",
    // ... all event fields
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
]
```

## 💡 Usage Tips

### Creating Events

1. **Use descriptive titles** - Makes events easy to find
2. **Add long descriptions** - Provides context for users
3. **Set correct status** - Keep events organized
4. **Upload images** - Makes events more appealing
5. **Mark featured** - Highlights important events

### Managing Events

1. **Use search** - Quickly find specific events
2. **Filter by status** - Separate upcoming from past events
3. **Filter by category** - View events by type
4. **Update regularly** - Keep information current
5. **Delete old events** - Keep list manageable

### Best Practices

1. **Date Format** - Use consistent format (e.g., "March 15-16, 2025")
2. **Time Format** - Use 12-hour format with AM/PM
3. **Images** - Use absolute or public folder paths
4. **Registration Links** - Include full URLs with https://
5. **Participants** - Update after event for accuracy

## 🎯 Event Workflow

### Typical Event Lifecycle

```
1. CREATE
   - Status: upcoming
   - Featured: true (if major event)
   - Add registration link

2. BEFORE EVENT
   - Update participant count
   - Update details if needed

3. DURING EVENT
   - Change status to "ongoing"

4. AFTER EVENT
   - Change status to "past"
   - Update final participant count
   - Remove registration link

5. ARCHIVE (Optional)
   - Keep for historical record
   - Or delete if no longer needed
```

## 🔍 Filtering Logic

Events are filtered client-side using:

```typescript
const filteredEvents = events.filter((event) => {
  const matchesSearch =
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesStatus = statusFilter === "all" || event.status === statusFilter;
  const matchesCategory =
    categoryFilter === "all" || event.category === categoryFilter;
  return matchesSearch && matchesStatus && matchesCategory;
});
```

## 🎨 Customization Guide

### Add New Category

1. **Update Prisma Schema:**

   ```prisma
   category: String  // Add "newtype" to comment
   ```

2. **Update Type Definition:**

   ```typescript
   category: "hackathon" | "workshop" | ... | "newtype"
   ```

3. **Add Color:**

   ```typescript
   const categoryColors = {
     // ...existing
     newtype: "bg-red-100 text-red-700",
   };
   ```

4. **Add to Filters:**
   ```tsx
   <option value="newtype">New Type</option>
   ```

### Add New Field

1. **Update Prisma Schema**
2. **Run `npx prisma generate`**
3. **Update TypeScript interface**
4. **Add to EventForm**
5. **Update API routes if needed**

### Customize Colors

Edit the color objects in `/admin/events/page.tsx`:

```typescript
const statusColors = {
  upcoming: "your-classes",
  ongoing: "your-classes",
  past: "your-classes",
};
```

## 🐛 Troubleshooting

### Events Not Showing

1. Check API is working: Visit `/api/events`
2. Check browser console for errors
3. Verify authentication is working
4. Check database connection

### Form Not Submitting

1. Check required fields are filled
2. Check console for validation errors
3. Verify API endpoint is accessible
4. Check network tab for request status

### Images Not Displaying

1. Verify image path is correct
2. Check image exists in public folder
3. Use absolute paths or URLs
4. Check image permissions

### Prisma Errors

If you see Prisma errors:

```bash
# Regenerate client
npx prisma generate

# Push schema changes
npx prisma db push

# Restart dev server
npm run dev
```

## 📊 Statistics & Analytics

The admin page shows:

- **Total Events Created**
- **Upcoming Events Count**
- **Ongoing Events Count**
- **Featured Events Count**

These update automatically as you add/edit/delete events.

## 🔐 Security Notes

- All routes are protected by `useAuth()` hook
- Only authenticated admins can access
- API endpoints should add auth verification (future enhancement)
- Always validate input on server-side

## 🎉 Success!

The Events Management System is now fully functional with:

✅ Complete CRUD operations
✅ Beautiful admin UI
✅ Search and filtering
✅ Statistics dashboard
✅ Form validation
✅ Delete confirmation
✅ Responsive design
✅ Type-safe code
✅ API endpoints
✅ Database schema

You can now manage all your campus events efficiently!

## 📝 Next Steps

Consider adding:

1. **Image Upload** - Direct image upload instead of URLs
2. **Rich Text Editor** - For long descriptions
3. **Bulk Operations** - Select and delete multiple events
4. **Event Categories Management** - Add/edit categories dynamically
5. **Event Analytics** - Track registrations and views
6. **Email Notifications** - Auto-notify about new events
7. **Calendar View** - Visual calendar display
8. **Export Events** - Export to CSV/PDF
9. **Event Templates** - Save and reuse event structures
10. **Approval Workflow** - For multi-admin scenarios
