# Team Management - Quick Reference

## 🚀 Quick Start

### 1. Access Team Management
Navigate to: **Admin Panel → Team Management**
URL: `/admin/team`

### 2. Create Your First Team

**For Current Year (2025):**
```
Team Name: SESA Committee
Year: 2025
Description: Annual Committee
Image: (optional)
```
This will appear as "Current Team" ✨

**For Past Years:**
```
Team Name: SESA Committee
Year: 2024
Description: Previous Committee
```
This will appear in "Past Teams" 📅

### 3. Add Members

Click **"Add Member"** on any team:
```
Name: John Doe
Position: President
Image: https://example.com/photo.jpg (optional)
```

### 4. Reorder Members

1. Expand team
2. **Drag** members by the grip icon ⋮⋮
3. **Drop** in new position
4. Auto-saves! ✓

## 📋 Common Tasks

### Create Current Team
```
Click "Add New Team"
→ Enter team name
→ Set year to 2025 (current year)
→ Click "Create Team"
```

### Add Multiple Members Quickly
```
Click "Add Member"
→ Fill form
→ Click "Add Member"
→ Repeat (modal closes, click "Add Member" again)
```

### Change Member Order
```
Expand team
→ Drag member by grip icon
→ Drop in new position
→ Done! (saves automatically)
```

### Edit Team Details
```
Click edit icon (✏️) on team
→ Update fields
→ Click "Update Team"
```

### Delete Team
```
Click delete icon (🗑️) on team
→ Confirm deletion
→ Team and ALL members removed
```

## 🎯 Best Practices

### Team Organization
- **Current year** = Current team (shown first)
- **Past years** = Past teams (archived below)
- **Members** = Ordered by hierarchy (President → Members)

### Naming Conventions
```
Teams:
- SESA Committee
- SESA Executive Board
- SESA 2024/2025

Positions:
- President
- Vice President
- Secretary
- Treasurer
- Committee Member
```

### Image URLs
✅ Good:
- `https://example.com/image.jpg`
- `https://i.imgur.com/abc123.jpg`
- `https://cdn.example.com/photos/person.png`

❌ Bad:
- Relative paths: `/images/photo.jpg`
- Local files: `C:\photos\image.jpg`
- HTML pages: `https://site.com/profile`

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Expand/Collapse Team | Click team header |
| Drag Member | Hold + Drag grip icon |
| Open Add Team | Click "Add New Team" |
| Close Modal | ESC or click X |

## 🎨 UI Guide

### Team Card States
- **Collapsed**: Shows team name, year, member count
- **Expanded**: Shows all members with drag handles
- **Empty**: Shows "Add First Member" button

### Visual Indicators
- 🔵 **Purple** = Current team actions
- 🟢 **Green** = Success actions
- 🔴 **Red** = Delete/destructive actions
- ⚪ **Gray** = Neutral/past items

### Icons
- ⋮⋮ **Grip** = Drag to reorder
- ✏️ **Edit** = Modify details
- 🗑️ **Trash** = Delete item
- ➕ **Plus** = Add new item
- ⌄ **Chevron** = Expand/collapse

## 🔄 Workflow Example

### Setting Up 2025 Team

**Step 1: Create Team**
```
Navigate to /admin/team
→ Click "Add New Team"
→ Name: "SESA Committee"
→ Year: 2025
→ Click "Create Team"
```

**Step 2: Add Leadership**
```
Click "Add Member"
→ Name: "Alice Johnson"
→ Position: "President"
→ Add image (optional)
→ Click "Add Member"

Repeat for:
- Vice President
- Secretary
- Treasurer
```

**Step 3: Add Committee Members**
```
Continue adding members...
- Events Coordinator
- Marketing Lead
- Technical Lead
- etc.
```

**Step 4: Organize Order**
```
Expand team
→ Drag members to correct order
→ President at top
→ Other leaders
→ Committee members
```

**Done!** ✅

## 🐛 Quick Troubleshooting

### Problem: Can't see team
**Solution:** Check year - past teams are in "Past Teams" section below

### Problem: Drag not working
**Solution:** Make sure you're grabbing the grip icon (⋮⋮), not other parts

### Problem: Image not showing
**Solution:** 
- Verify URL is direct image link
- Check URL is accessible
- Try different image URL

### Problem: Changes not saving
**Solution:**
- Check internet connection
- Look for error messages
- Refresh page and try again

### Problem: Deleted wrong item
**Solution:** 
- Check database backup
- No undo - be careful with deletions!

## 📱 Mobile Usage

### On Mobile Devices:
- Tap to expand/collapse teams
- **Long press** grip icon to drag
- Scroll modals if content is long
- All features work on touch screens

## 💡 Pro Tips

1. **Order Matters**: Drag to organize by hierarchy
2. **Year = Category**: Use year to auto-categorize current/past
3. **Expand Current**: Current team opens automatically
4. **Quick Actions**: Edit/delete without opening details
5. **Bulk Add**: Add multiple members quickly
6. **Visual Preview**: See images before saving

## 🔢 Data Limits

- **Teams**: Unlimited
- **Members per Team**: Unlimited
- **Image Size**: Depends on hosting
- **Name Length**: Reasonable limits
- **Years**: 2000-2100

## 🆘 Need Help?

### Check:
1. TEAM_MANAGEMENT_DOCUMENTATION.md (full guide)
2. Browser console for errors
3. Network tab for API issues

### Common Issues:
- TypeScript errors = Restart dev server
- API errors = Check database connection
- UI issues = Clear browser cache

## 📊 Example Data Structure

```json
{
  "team": {
    "year": 2025,
    "name": "SESA Committee",
    "position": "Annual Committee",
    "members": [
      {
        "name": "Alice Johnson",
        "position": "President",
        "image": "https://example.com/alice.jpg"
      },
      {
        "name": "Bob Smith",
        "position": "Vice President",
        "image": "https://example.com/bob.jpg"
      }
    ]
  }
}
```

## 🎬 Getting Started Checklist

- [ ] Navigate to /admin/team
- [ ] Create current year team
- [ ] Add at least 3 members
- [ ] Test drag-and-drop reordering
- [ ] Edit a member's details
- [ ] Expand/collapse teams
- [ ] Create a past year team
- [ ] Verify current/past categorization

**You're all set!** 🎉
