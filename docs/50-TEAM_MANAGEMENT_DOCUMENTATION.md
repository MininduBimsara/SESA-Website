# Team Management System Documentation

## Overview
Complete team management system for the SESA admin panel with drag-and-drop functionality, year-based organization, and automatic current/past team classification.

## Features

### ✨ Key Features
- **Drag-and-Drop Member Ordering**: Reorder team members by dragging
- **Year-Based Organization**: Automatically categorizes teams by year
- **Current Team Highlighting**: Current year's team shown prominently
- **Past Teams Archive**: Previous years shown in chronological order
- **Full CRUD Operations**: Create, Read, Update, Delete teams and members
- **Real-time Updates**: Changes reflect immediately in the UI
- **Image Support**: Profile images for team members
- **Responsive Design**: Works on all screen sizes

## Files Created

### API Routes

#### `/src/app/api/team/route.ts`
- **GET**: Fetch all teams with members (sorted by year, newest first)
- **POST**: Create a new team

#### `/src/app/api/team/[id]/route.ts`
- **GET**: Fetch single team with members
- **PUT**: Update team details
- **DELETE**: Delete team and all its members

#### `/src/app/api/team/[id]/members/route.ts`
- **POST**: Add new member to team
- **PUT**: Reorder team members (used for drag-and-drop)

#### `/src/app/api/team/members/[id]/route.ts`
- **PUT**: Update member details
- **DELETE**: Delete member

### Components

#### `/src/app/admin/team/page.tsx`
Main team management page with:
- Team listing with current/past categorization
- Drag-and-drop member reordering using @dnd-kit
- Expand/collapse team view
- Team and member CRUD operations
- Empty states

#### `/src/app/admin/team/TeamFormModal.tsx`
Modal for creating/editing teams:
- Team name
- Year
- Description
- Optional team image

#### `/src/app/admin/team/MemberFormModal.tsx`
Modal for creating/editing members:
- Member name
- Position
- Optional profile image with preview

### Types

#### `/src/types/team.ts`
TypeScript type definitions:
```typescript
interface Member {
  id: string;
  name: string;
  position: string;
  image?: string | null;
  teamId: string;
}

interface Team {
  id: string;
  year: number;
  name: string;
  position: string;
  image?: string | null;
  members: Member[];
  createdAt: string;
}
```

## Database Schema

```prisma
model Team {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  year      Int
  name      String
  position  String
  image     String?
  members   Member[]
  createdAt DateTime @default(now())
}

model Member {
  id       String  @id @default(auto()) @map("_id") @db.ObjectId
  name     String
  position String
  image    String?
  teamId   String  @db.ObjectId
  team     Team    @relation(fields: [teamId], references: [id])
}
```

## How It Works

### Current Team Logic
- Teams with `year` matching current year (2025) are shown as "Current Team"
- Displayed prominently at the top
- Automatically expanded by default

### Past Teams Logic
- Teams with `year < current year` shown in "Past Teams" section
- Sorted by year (newest to oldest)
- Collapsed by default
- Each shows year badge

### Drag-and-Drop Functionality
```typescript
// Members can be reordered within their team
// Order is saved to database automatically
// Uses @dnd-kit library for smooth drag interactions
```

## Usage Guide

### Creating a Team

1. Click "Add New Team" button
2. Fill in:
   - **Team Name**: e.g., "SESA Committee"
   - **Year**: e.g., 2025 (current year for current team)
   - **Description**: Optional, e.g., "Annual Committee"
   - **Team Image**: Optional URL
3. Click "Create Team"

### Adding Members

1. Expand a team
2. Click "Add Member" button
3. Fill in:
   - **Name**: Member's full name
   - **Position**: e.g., "President", "Vice President"
   - **Profile Image**: Optional URL (shows preview)
4. Click "Add Member"

### Reordering Members

1. Expand a team
2. Click and hold the grip icon (⋮⋮) on any member
3. Drag to new position
4. Release to save (auto-saves to database)

### Editing Teams/Members

1. Click the edit icon (✏️) on any team or member
2. Modify fields in the modal
3. Click "Update"

### Deleting

- **Delete Team**: Removes team and ALL its members (confirmation required)
- **Delete Member**: Removes individual member (confirmation required)

## UI Components

### Team Card Features
- **Expand/Collapse**: Click anywhere on team header
- **Member Count**: Shows total members
- **Year Badge**: Displays team year
- **Action Buttons**: Add Member, Edit, Delete
- **Empty State**: Shows when no members exist

### Member Card Features
- **Drag Handle**: Grip icon for reordering
- **Profile Image**: Circular avatar (if provided)
- **Name & Position**: Prominently displayed
- **Edit/Delete**: Quick action buttons

## Packages Used

### @dnd-kit
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Purpose**: Modern drag-and-drop library for React
- `@dnd-kit/core`: Core DnD functionality
- `@dnd-kit/sortable`: Sortable list utilities
- `@dnd-kit/utilities`: Helper functions

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/team` | Get all teams |
| POST | `/api/team` | Create team |
| GET | `/api/team/[id]` | Get team by ID |
| PUT | `/api/team/[id]` | Update team |
| DELETE | `/api/team/[id]` | Delete team |
| POST | `/api/team/[id]/members` | Add member to team |
| PUT | `/api/team/[id]/members` | Reorder members |
| PUT | `/api/team/members/[id]` | Update member |
| DELETE | `/api/team/members/[id]` | Delete member |

## Example Workflow

### Setting Up 2025 Team

1. **Create Team**
   - Name: "SESA Committee"
   - Year: 2025
   - This becomes the "Current Team"

2. **Add Members** (in order of hierarchy)
   - President
   - Vice President
   - Secretary
   - Treasurer
   - Committee Members

3. **Reorder if Needed**
   - Drag members to adjust order
   - Order saved automatically

### Archiving Previous Year

When 2026 arrives:
- 2025 team automatically becomes "Past Team"
- Create new 2026 team for current year
- Past teams remain accessible in archive

## Responsive Design

- **Desktop**: Full layout with all features
- **Tablet**: Adapted grid, scrollable modals
- **Mobile**: Stacked layout, touch-optimized drag

## Error Handling

- **Network Errors**: Graceful fallback with error messages
- **Validation**: Client-side form validation
- **Confirmations**: Delete confirmations prevent accidents
- **Loading States**: Loading indicators during operations

## Future Enhancements

Potential improvements:
- [ ] Bulk member import (CSV)
- [ ] Image upload (instead of URLs)
- [ ] Member role templates
- [ ] Export team data
- [ ] Search/filter members
- [ ] Member statistics
- [ ] Social media links per member
- [ ] Drag-and-drop between teams

## Testing

To test the system:

1. **Create Current Team**
   ```
   Year: 2025 (or current year)
   Name: "Test Committee"
   ```

2. **Add Test Members**
   ```
   - Alice Johnson (President)
   - Bob Smith (Vice President)
   - Carol White (Secretary)
   ```

3. **Test Drag-and-Drop**
   - Reorder members
   - Verify order persists after refresh

4. **Create Past Team**
   ```
   Year: 2024
   Name: "Previous Committee"
   ```

5. **Verify Categorization**
   - 2025 team shows as "Current Team"
   - 2024 team shows in "Past Teams"

## Troubleshooting

### Members not reordering
- Check browser console for errors
- Ensure drag-and-drop library is installed
- Verify API endpoint is working

### Images not loading
- Check image URLs are valid
- Ensure CORS allows image loading
- Use direct image URLs (not HTML pages)

### Team not showing as current
- Verify year matches current year
- Check date/time on server
- Refresh page to see updates

## Performance Notes

- **Optimistic Updates**: UI updates before server confirmation
- **Lazy Loading**: Images loaded on demand
- **Efficient Queries**: Members fetched with teams (join query)
- **Client-side Filtering**: Fast expand/collapse without server calls

## Accessibility

- **Keyboard Navigation**: All actions accessible via keyboard
- **Screen Readers**: Proper ARIA labels
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG compliant colors

## Security

- No file uploads (uses URLs) - reduces attack surface
- Input validation on client and server
- Confirmation dialogs for destructive actions
- MongoDB ObjectIds prevent enumeration attacks
