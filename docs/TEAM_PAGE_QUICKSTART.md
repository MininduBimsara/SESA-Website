# Team Page Integration - Quick Reference

## 📋 Summary
The team page at `/team` now fetches data from the database while maintaining the exact same UI design.

## 🎯 Key Features
- ✅ Server-side rendering for better SEO
- ✅ Automatic current/previous team determination
- ✅ Social media links (Email, LinkedIn, GitHub)
- ✅ Profile image upload support
- ✅ Drag-and-drop member ordering in admin
- ✅ All original animations preserved

## 🚀 Quick Start

### View the Team Page
```
URL: http://localhost:3000/team
```

### Manage Teams (Admin)
```
URL: http://localhost:3000/admin/team
```

### Add Your First Team
1. Go to admin panel → Team Management
2. Click "Add New Team"
3. Enter year (e.g., 2025) and name
4. Click "Add Member" to add team members
5. Fill in member details (name, position, image, socials)
6. Visit `/team` to see your changes

## 📁 File Structure

```
src/app/(webpage)/team/
├── page.tsx              # Server component (data fetching)
└── TeamPageClient.tsx    # Client component (animations)

src/app/admin/team/
├── page.tsx              # Admin interface
├── TeamFormModal.tsx     # Create/edit team
└── MemberFormModal.tsx   # Create/edit member

src/app/api/team/
├── route.ts              # GET/POST teams
├── [id]/route.ts         # GET/PUT/DELETE team
├── [id]/members/route.ts # POST/PUT members
└── members/[id]/route.ts # PUT/DELETE member
```

## 🗄️ Database Schema

### Team
- `year` (Int) - Team year (e.g., 2025)
- `name` (String) - Team name
- `members` (Member[]) - Team members

### Member
- `name` (String) - Member name *
- `position` (String) - Role/position *
- `image` (String) - Profile image URL
- `email` (String) - Contact email
- `linkedin` (String) - LinkedIn profile URL
- `github` (String) - GitHub profile URL
- `order` (Int) - Display order

\* Required fields

## 🔧 Common Tasks

### Update Member Social Links
1. Go to admin → Team Management
2. Expand the team
3. Click pencil icon on member
4. Add email, LinkedIn, or GitHub URLs
5. Save

### Reorder Team Members
1. Admin → Team Management
2. Expand team
3. Drag members to reorder
4. Order saves automatically

### Add New Team Year
1. Click "Add New Team"
2. Enter next year (e.g., 2026)
3. New team becomes "current" automatically
4. Previous current team moves to "previous"

### Upload Member Photo
Two options:
- **Upload**: Click "Click to upload image" button
- **URL**: Paste image URL in text field

## 🎨 UI Components

### Current Team Display
- Rose gradient hero section
- Rose colored accent (borders, text, icons)
- Larger profile images
- Enhanced hover effects

### Previous Team Display
- Gray theme
- Subtle hover effects
- Smaller text styling
- "Honoring Our Previous Executive Board" section

### Social Icons
Icons appear automatically when member has:
- 📧 Email → Opens email client
- 🔗 LinkedIn → Opens LinkedIn profile
- 💻 GitHub → Opens GitHub profile

## 📊 Data Flow

```
Database (MongoDB)
    ↓
Prisma ORM
    ↓
Server Component (page.tsx)
    ↓ getTeamData()
Client Component (TeamPageClient.tsx)
    ↓
Rendered UI with Animations
```

## 🔍 Debugging

### Check if teams exist:
```bash
# View database via Prisma Studio
npx prisma studio
```

### Check server logs:
```bash
# Terminal running: npm run dev
# Look for "Error fetching team data"
```

### Verify image paths:
- Uploaded: `/uploads/team/filename.png`
- Should exist in `/public/uploads/team/`

## ⚡ Performance Tips

- Images auto-optimized by Next.js
- Server-side rendering = better SEO
- Client-side animations = smooth UX
- Single database query per page load

## 🔄 Migration from Static Data

Old (static):
```typescript
const currentBoard = [
  { name: "John", position: "President" },
  // ...
]
```

New (database):
```typescript
// Automatically fetched from database
const teamData = await getTeamData()
```

To migrate existing data → Use admin panel to recreate teams.

## ✅ Testing Checklist

- [ ] Team page loads at `/team`
- [ ] Current team shows with correct year
- [ ] Previous team appears (if data exists)
- [ ] Member images display
- [ ] Social icons work
- [ ] Hover animations work
- [ ] Mobile responsive
- [ ] Admin can add/edit teams
- [ ] Drag-drop reordering works

## 🆘 Troubleshooting

**No teams visible**
→ Create a team in admin panel first

**Images not loading**
→ Check image URL or upload file directly

**Wrong year showing**
→ Team with highest year is "current"

**Social icons not appearing**
→ Add email/LinkedIn/GitHub URLs in admin

## 📞 Support

See detailed documentation: `TEAM_PAGE_INTEGRATION.md`
