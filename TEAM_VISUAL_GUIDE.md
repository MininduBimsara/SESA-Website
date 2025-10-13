# Team Management System - Visual Guide

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN PANEL UI                          │
│                  /admin/team/page.tsx                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  📅 CURRENT TEAM (Year: 2025)                        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  SESA Committee                                 │  │  │
│  │  │  [Edit] [Delete] [Add Member]                   │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  Members: (Drag to reorder)                           │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │ ⋮⋮ 👤 Alice Johnson - President    [✏️] [🗑️] │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │ ⋮⋮ 👤 Bob Smith - Vice President   [✏️] [🗑️] │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │ ⋮⋮ 👤 Carol White - Secretary      [✏️] [🗑️] │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  📚 PAST TEAMS                                       │  │
│  │                                                        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  2024 - SESA Committee [Expand ▼]              │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  2023 - SESA Committee [Expand ▼]              │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  [➕ Add New Team]                                          │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

```
┌──────────────┐
│   UI Action  │
│ (Add/Edit)   │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│   Modal Form     │
│  TeamFormModal   │
│  or              │
│ MemberFormModal  │
└──────┬───────────┘
       │ (Submit)
       ▼
┌─────────────────────────────┐
│   API Route Handler         │
│                             │
│   POST   /api/team          │
│   PUT    /api/team/[id]     │
│   POST   /api/team/[id]/... │
│   DELETE /api/team/[id]     │
└──────┬──────────────────────┘
       │
       ▼
┌──────────────────┐
│   Prisma ORM     │
│   (Database)     │
│                  │
│  team.create()   │
│  team.update()   │
│  team.delete()   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   MongoDB        │
│   Collections:   │
│   - Team         │
│   - Member       │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Response        │
│  Success/Error   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  UI Update       │
│  Re-fetch Data   │
│  Show Feedback   │
└──────────────────┘
```

## 🎯 Drag-and-Drop Flow

```
USER ACTION:
   │
   │ 1. Click & Hold Grip Icon (⋮⋮)
   │
   ▼
┌─────────────────────────────────────┐
│  DndContext (from @dnd-kit)         │
│                                     │
│  onDragStart:                       │
│    - Identify dragged member        │
│    - Apply drag styles              │
│    - Show visual feedback           │
└─────────┬───────────────────────────┘
          │
          │ 2. Drag to New Position
          │
          ▼
┌─────────────────────────────────────┐
│  SortableContext                    │
│                                     │
│  - Track position changes           │
│  - Update member order              │
│  - Calculate new positions          │
└─────────┬───────────────────────────┘
          │
          │ 3. Release Mouse
          │
          ▼
┌─────────────────────────────────────┐
│  onDragEnd Handler                  │
│                                     │
│  1. Get old & new indices           │
│  2. arrayMove(members, old, new)    │
│  3. Update UI (optimistic)          │
└─────────┬───────────────────────────┘
          │
          │ 4. Save to Database
          │
          ▼
┌─────────────────────────────────────┐
│  API: PUT /api/team/[id]/members    │
│                                     │
│  Body: { members: [reordered] }     │
│                                     │
│  - Update position fields           │
│  - Persist to database              │
└─────────┬───────────────────────────┘
          │
          │ 5. Success/Error
          │
          ▼
┌─────────────────────────────────────┐
│  UI Feedback                        │
│                                     │
│  Success: Keep new order            │
│  Error: Revert to old order         │
└─────────────────────────────────────┘
```

## 🗄️ Database Structure

```
MongoDB Database: sesa_website

Collection: Team
┌─────────────────────────────────────┐
│ _id: ObjectId("...")                │
│ year: 2025                          │
│ name: "SESA Committee"              │
│ position: "Annual Committee"        │
│ image: "https://..."                │
│ createdAt: ISODate("...")           │
└─────────────────────────────────────┘
         │
         │ (One-to-Many)
         │
         ▼
Collection: Member
┌─────────────────────────────────────┐
│ _id: ObjectId("...")                │
│ name: "Alice Johnson"               │
│ position: "President"               │
│ image: "https://..."                │
│ teamId: ObjectId("...") ◄───────────┤ (Foreign Key)
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ _id: ObjectId("...")                │
│ name: "Bob Smith"                   │
│ position: "Vice President"          │
│ image: "https://..."                │
│ teamId: ObjectId("...") ◄───────────┤ (Same Team)
└─────────────────────────────────────┘
```

## 📱 Component Hierarchy

```
AdminTeam (Main Page)
├── State Management
│   ├── teams: Team[]
│   ├── expandedTeams: Set<string>
│   ├── showTeamForm: boolean
│   ├── showMemberForm: boolean
│   └── selected items
│
├── TeamCard (Current Team)
│   ├── Header (clickable to expand)
│   ├── Actions (Add Member, Edit, Delete)
│   └── Members Section (if expanded)
│       └── DndContext
│           └── SortableContext
│               └── SortableMember (repeated)
│                   ├── Grip Icon
│                   ├── Avatar Image
│                   ├── Name & Position
│                   └── Actions (Edit, Delete)
│
├── TeamCard (Past Team 2024) [collapsed]
│   └── ...
│
├── TeamCard (Past Team 2023) [collapsed]
│   └── ...
│
├── TeamFormModal (conditional)
│   ├── Form Fields
│   ├── Validation
│   └── Submit Handler
│
└── MemberFormModal (conditional)
    ├── Form Fields
    ├── Image Preview
    ├── Validation
    └── Submit Handler
```

## 🎨 State Flow

```
Initial Load:
┌─────────────┐
│   useEffect │
│   fetchTeams│
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│  GET /api/team          │
│  Returns all teams      │
│  with members           │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  setTeams(data)         │
│  Auto-expand current    │
└─────────────────────────┘

User Creates Team:
┌─────────────────────────┐
│  User clicks            │
│  "Add New Team"         │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  setShowTeamForm(true)  │
│  Modal opens            │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  User fills form        │
│  Clicks submit          │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  POST /api/team         │
│  Create in database     │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  fetchTeams()           │
│  Refresh data           │
│  Close modal            │
└─────────────────────────┘

User Drags Member:
┌─────────────────────────┐
│  Drag starts            │
│  onDragStart            │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Dragging...            │
│  Visual feedback        │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Drop                   │
│  onDragEnd              │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  arrayMove()            │
│  Update local state     │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  PUT /api/team/.../     │
│  members                │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Success: Keep order    │
│  Error: Revert          │
└─────────────────────────┘
```

## 🔄 API Request/Response Examples

### Create Team
```
REQUEST:
POST /api/team
Content-Type: application/json

{
  "year": 2025,
  "name": "SESA Committee",
  "position": "Annual Committee",
  "image": "https://example.com/team.jpg"
}

RESPONSE:
201 Created
{
  "id": "507f1f77bcf86cd799439011",
  "year": 2025,
  "name": "SESA Committee",
  "position": "Annual Committee",
  "image": "https://example.com/team.jpg",
  "createdAt": "2025-10-13T10:00:00Z"
}
```

### Add Member
```
REQUEST:
POST /api/team/507f1f77bcf86cd799439011/members
Content-Type: application/json

{
  "name": "Alice Johnson",
  "position": "President",
  "image": "https://example.com/alice.jpg"
}

RESPONSE:
201 Created
{
  "id": "507f191e810c19729de860ea",
  "name": "Alice Johnson",
  "position": "President",
  "image": "https://example.com/alice.jpg",
  "teamId": "507f1f77bcf86cd799439011"
}
```

### Reorder Members
```
REQUEST:
PUT /api/team/507f1f77bcf86cd799439011/members
Content-Type: application/json

{
  "members": [
    { "id": "507f191e810c19729de860ea", ... },
    { "id": "507f191e810c19729de860eb", ... },
    { "id": "507f191e810c19729de860ec", ... }
  ]
}

RESPONSE:
200 OK
{
  "message": "Members reordered successfully"
}
```

## 🎯 User Journey Map

```
New Admin First Time:
┌─────────────────────────┐
│ 1. Login to admin       │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 2. Navigate to Team     │
│    Management           │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 3. See empty state      │
│    "No Teams Yet"       │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 4. Click                │
│    "Create First Team"  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 5. Fill team form       │
│    Year: 2025           │
│    Name: SESA Committee │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 6. Team created!        │
│    Shows in Current     │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 7. Click "Add Member"   │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 8. Add first member     │
│    Name: Alice          │
│    Position: President  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 9. Member appears       │
│    Can drag to reorder  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 10. Add more members    │
│     Build full team     │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ ✓ Team Management       │
│   Fully Set Up!         │
└─────────────────────────┘
```

## 💡 Quick Tips Visual

```
┌────────────────────────────────────────────────────────┐
│  💡 QUICK TIPS                                         │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🎯 Current Team = This Year                          │
│     Set year to 2025 to make it current               │
│                                                        │
│  ⋮⋮ Drag from Grip Only                              │
│     Click the ⋮⋮ icon, not the card                  │
│                                                        │
│  💾 Auto-Save                                          │
│     Drag-and-drop saves automatically                 │
│                                                        │
│  🖼️ Images are URLs                                   │
│     Use direct links to images                        │
│                                                        │
│  ⚠️ Delete = Permanent                                │
│     Deletions cannot be undone                        │
│                                                        │
│  📱 Mobile Friendly                                    │
│     Long-press to drag on touch                       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme

```
┌─────────────────────────────────────────┐
│  COLOR PALETTE                          │
├─────────────────────────────────────────┤
│                                         │
│  🟣 Purple (Primary)                    │
│     - Current team highlights           │
│     - Primary buttons                   │
│     - Active states                     │
│                                         │
│  🔵 Blue (Info)                         │
│     - Status badges                     │
│     - Links                             │
│                                         │
│  🟢 Green (Success)                     │
│     - Success messages                  │
│     - Confirmations                     │
│                                         │
│  🔴 Red (Danger)                        │
│     - Delete actions                    │
│     - Error messages                    │
│                                         │
│  ⚪ Gray (Neutral)                      │
│     - Past teams                        │
│     - Borders                           │
│     - Text                              │
│                                         │
└─────────────────────────────────────────┘
```

This visual guide provides a comprehensive overview of the team management system's architecture, flow, and user experience! 🎨
