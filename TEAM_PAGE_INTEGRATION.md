# Team Page Database Integration

## Overview
The team page has been successfully integrated with the database while preserving the exact same UI design. The page now fetches team data dynamically from MongoDB via Prisma.

## Architecture

### Server Component (`page.tsx`)
- **Purpose**: Data fetching and server-side rendering
- **Location**: `/src/app/(webpage)/team/page.tsx`
- **Functionality**: 
  - Fetches teams from database
  - Automatically determines current vs previous teams based on year
  - Passes data to client component

### Client Component (`TeamPageClient.tsx`)
- **Purpose**: Handles animations and interactivity
- **Location**: `/src/app/(webpage)/team/TeamPageClient.tsx`
- **Features**:
  - Framer Motion animations (unchanged from original)
  - Responsive grid layout
  - Social media links (email, LinkedIn, GitHub)
  - Profile images with hover effects

## Database Schema

### Team Model
```prisma
model Team {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  year      Int      // e.g., 2025
  name      String   // Team name
  position  String   // (legacy field, kept for compatibility)
  image     String?  // (legacy field)
  members   Member[]
  createdAt DateTime @default(now())
}
```

### Member Model
```prisma
model Member {
  id       String  @id @default(auto()) @map("_id") @db.ObjectId
  name     String
  position String  // e.g., "President", "Vice President"
  image    String?
  linkedin String?
  github   String?
  email    String?
  order    Int     @default(0)  // For sorting members
  teamId   String  @db.ObjectId
  team     Team    @relation(fields: [teamId], references: [id], onDelete: Cascade)
}
```

## Data Flow

1. **Server Component** (`page.tsx`):
   ```typescript
   async function getTeamData() {
     const teams = await prisma.team.findMany({
       include: { members: { orderBy: { order: 'asc' } } },
       orderBy: { year: 'desc' }
     });
     // Returns: currentYear, currentBoard, previousBoard, previousYear
   }
   ```

2. **Client Component** (`TeamPageClient.tsx`):
   - Receives `teamData` prop
   - Renders current board with rose/purple theme
   - Renders previous board with gray theme
   - Maintains all original animations

## Team Organization Logic

- **Current Team**: Team with the highest year value (most recent)
- **Previous Team**: Second-highest year value (if exists)
- **Year Display**: Dynamically shows "2025/26" format in hero section

## Social Media Integration

Members can now have:
- **Email**: Displays envelope icon, opens mailto link
- **LinkedIn**: Displays LinkedIn icon, opens in new tab
- **GitHub**: Displays GitHub icon, opens in new tab

Social icons only appear if the member has at least one social link.

## Admin Integration

### Adding Teams
1. Go to `/admin/team`
2. Click "Add New Team"
3. Enter year (e.g., 2025) and team name
4. Add members with their details

### Adding Members
Members can be added with:
- Name (required)
- Position (required)
- Profile Image (optional - upload or URL)
- Email (optional)
- LinkedIn URL (optional)
- GitHub URL (optional)

### Member Ordering
- Members are ordered by the `order` field
- Drag-and-drop in admin interface updates the order
- First member in the list appears first on the public page

## UI Preserved Features

✅ **All original UI elements maintained**:
- Hero section with gradient background
- Responsive grid layout (1/2/3/4 columns)
- Profile image with rounded borders and hover effects
- Hover animations with blur effect
- Social media icons with rose/gray color scheme
- University logos section
- Contact information footer
- Framer Motion animations

## API Endpoints Used

- `GET /api/team` - Fetch all teams with members
- `POST /api/team` - Create new team
- `POST /api/team/[id]/members` - Add member to team
- `PUT /api/team/members/[id]` - Update member details
- `DELETE /api/team/members/[id]` - Delete member
- `PUT /api/team/[id]/members` - Reorder members (drag-drop)

## Updated Files

### New Files
- `/src/app/(webpage)/team/TeamPageClient.tsx` - Client component with animations

### Modified Files
- `/src/app/(webpage)/team/page.tsx` - Converted to server component
- `/prisma/schema.prisma` - Added social media fields to Member model
- `/src/types/team.ts` - Updated interfaces
- `/src/app/api/team/[id]/members/route.ts` - Added social media fields
- `/src/app/api/team/members/[id]/route.ts` - Added social media fields
- `/src/app/admin/team/MemberFormModal.tsx` - Added social media inputs

## Testing Checklist

- [ ] Navigate to `/team` - page loads without errors
- [ ] Current team displays with correct year in hero
- [ ] Previous team section appears if data exists
- [ ] Member images display correctly
- [ ] Social icons appear when member has social links
- [ ] Social links open correctly (email, LinkedIn, GitHub)
- [ ] Animations work (fade in, hover effects)
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Add team in admin and verify it appears on public page
- [ ] Reorder members in admin and verify order on public page

## Migration Notes

### From Static to Database
The original static arrays:
```typescript
const currentBoard: TeamMember[] = [...]
const previousBoard: TeamMember[] = [...]
```

Have been replaced with database queries. To migrate existing data:

1. Create teams via admin interface
2. Add members with their positions
3. Upload member photos or use URLs
4. Add social media links if available

### Social Media Fields
Added to schema but optional. Existing teams work without these fields.

## Troubleshooting

### No teams showing
- Check database connection
- Verify teams exist in database: Run admin panel and create a team
- Check server console for errors

### Images not loading
- Verify image URLs are correct
- For uploaded images, check `/public/uploads/team/` directory
- Ensure Next.js Image component can access the path

### Wrong team showing as "current"
- Verify `year` field in database
- Current team = highest year value
- Update year if needed via admin interface

## Performance

- Server-side rendering for SEO
- Images optimized with Next.js Image component
- Animations handled client-side with Framer Motion
- Database queries include member relations (no N+1 queries)

## Future Enhancements

Potential additions:
- [ ] Multiple past teams display (currently shows only one)
- [ ] Member bio/description field
- [ ] Team achievements section
- [ ] Twitter/Instagram social links
- [ ] Export team data feature
