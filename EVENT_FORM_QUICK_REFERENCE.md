# Event Form - Quick Reference

## ✨ New Features Summary

### 📅 Date & Time Pickers

- **Visual Calendar**: Click to select dates instead of typing
- **Range Selection**: Click first date, then second date for multi-day events
- **Time Dropdowns**: Select start/end times in 15-minute intervals
- **Smart Validation**: Can't select past dates

### 🖼️ Image Upload

- **Click Upload**: Choose image file from computer
- **Live Preview**: See image before saving
- **Size Limit**: Maximum 5MB per image
- **Easy Remove**: Click X to delete and re-upload

### 🤖 Auto Status

- **Upcoming**: Future events (before start date)
- **Ongoing**: Current events (between start and end date)
- **Past**: Completed events (after end date)
- Status updates automatically as you change dates

### ✅ Enhanced Validation

- **Required Fields**: Title, Description, Date, Time, Location
- **URL Check**: Registration link must be valid URL
- **Date Logic**: End date can't be before start date
- **Image Check**: Only accepts image files under 5MB

## 📝 Quick Start

### Creating New Event

1. Click "Add Event" button
2. Fill in Title and Description (required)
3. Select Date from calendar picker
4. Select Start Time from dropdown
5. Enter Location (required)
6. Upload Image (optional)
7. Select Category
8. Add Registration Link (optional)
9. Check Featured if needed
10. Click "Create Event"

### Editing Event

1. Click edit icon on event row
2. Form fills with existing data
3. Modify any fields
4. Upload new image to replace
5. Click "Update Event"

## 🎯 Validation Rules

| Field             | Required | Validation                |
| ----------------- | -------- | ------------------------- |
| Title             | ✅       | Not empty                 |
| Description       | ✅       | Not empty                 |
| Date              | ✅       | Must be selected          |
| Time              | ✅       | Must be selected          |
| Location          | ✅       | Not empty                 |
| Image             | ❌       | Must be image type, < 5MB |
| Registration Link | ❌       | Must be valid URL format  |
| End Date          | ❌       | Must be after start date  |

## 💡 Tips

- **Single Day Events**: Just select one date, leave end date empty
- **Multi-Day Events**: Click start date, then click end date
- **Time Selection**: Start time is required, end time is optional
- **Image Quality**: Use 1200x675px for best results
- **Status Updates**: Don't worry about status - it's automatic!

## 🔧 Troubleshooting

**Can't submit form?**
→ Check for red borders indicating missing required fields

**Image won't upload?**
→ Ensure file is an image (jpg, png, gif, webp) and under 5MB

**Wrong status showing?**
→ Check the date you selected is correct

**Registration link error?**
→ URL must include http:// or https://

## 📱 Keyboard Shortcuts

- **Tab**: Move to next field
- **Shift + Tab**: Move to previous field
- **Enter**: Submit form (when not in textarea)
- **Esc**: Close form
- **Arrow Keys**: Navigate in date picker
- **Space**: Toggle featured checkbox

## 🎨 Status Colors (on main page)

- 🟢 **Upcoming**: Green badge
- 🔵 **Ongoing**: Blue badge
- ⚪ **Past**: Gray badge

---

**Need More Help?** See ENHANCED_EVENT_FORM_DOCS.md for detailed documentation.
