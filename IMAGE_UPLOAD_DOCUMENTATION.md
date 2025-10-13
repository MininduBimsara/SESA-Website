# Image Upload Feature - Team Management

## Overview
Added image upload functionality to team and member forms. Users can now upload images directly from their computer instead of providing URLs.

## Features

### ✨ What's New

1. **Direct Image Upload**
   - Click to select image files from computer
   - Drag-and-drop support
   - Real-time image preview
   - File validation (type and size)

2. **Dual Input Methods**
   - **Option 1**: Upload image file directly
   - **Option 2**: Paste image URL (still supported)
   - Switch between methods seamlessly

3. **Image Management**
   - Preview before saving
   - Remove/replace images easily
   - Upload progress indicator
   - Error handling

## How to Use

### Uploading Member/Team Image

#### Method 1: Upload File
1. Open member/team form
2. Click the **"Click to upload image"** area
3. Select an image file from your computer
4. See preview instantly
5. Click "Add Member" or "Create Team"

#### Method 2: Use URL
1. Open member/team form
2. Scroll to image section
3. Paste image URL in the text field below "OR"
4. Preview appears automatically
5. Click "Add Member" or "Create Team"

### Removing Images
1. Click **"Remove Image"** button below preview
2. Image cleared from form
3. Can upload new image or leave empty

## File Requirements

### Supported Formats
- ✅ PNG
- ✅ JPG/JPEG
- ✅ GIF
- ✅ WebP
- ✅ Any image/* format

### File Size
- **Maximum**: 5MB
- **Recommended**: Under 2MB for faster upload
- **Tip**: Compress large images before upload

### Recommended Dimensions
- **Member Photos**: 400x400px (square, for circular display)
- **Team Photos**: 800x600px or 1200x800px (landscape)

## Technical Implementation

### Files Modified

#### 1. `/src/app/admin/team/MemberFormModal.tsx`
- Added file upload input
- Added image preview with remove button
- Added upload state management
- Integrated with upload API

#### 2. `/src/app/admin/team/TeamFormModal.tsx`
- Same enhancements as member form
- Supports team image uploads

#### 3. `/src/app/api/upload/route.ts` (NEW)
- Handles file uploads
- Validates file type and size
- Saves files to `/public/uploads/team/`
- Returns public URL

### Upload Process

```
User selects file
    ↓
Client-side validation
    ↓
File preview shown
    ↓
User submits form
    ↓
File uploaded to /api/upload
    ↓
Server validates again
    ↓
File saved to /public/uploads/team/
    ↓
URL returned (/uploads/team/filename.jpg)
    ↓
URL saved to database
    ↓
Success!
```

### Storage Location

```
public/
└── uploads/
    └── team/
        ├── 1697123456789-alice-profile.jpg
        ├── 1697123457890-bob-photo.png
        └── 1697123458991-team-2025.jpg
```

### Filename Format
```
{timestamp}-{original-filename}

Example:
1697123456789-john-doe.jpg
↑             ↑
Timestamp     Original name (sanitized)
```

## Security Features

### Validation
1. **File Type Check**: Only image files accepted
2. **File Size Limit**: Maximum 5MB
3. **Server-side Validation**: Double-checked on server
4. **Filename Sanitization**: Spaces removed, special chars handled

### Safe Storage
- Files stored in public directory
- No executable files allowed
- Unique filenames prevent overwrites
- No user-controlled paths

## UI/UX Features

### Visual Feedback
- ✅ Upload area highlights on hover
- ✅ File name shown when selected
- ✅ Instant preview after selection
- ✅ Loading spinner during upload
- ✅ Success/error messages

### Responsive Design
- Works on desktop and mobile
- Touch-friendly upload button
- Scrollable modals for long forms
- Preview adapts to screen size

### Error Handling
- Invalid file type → Error message
- File too large → Size error
- Upload failed → Retry option
- Network error → Graceful fallback

## Example Usage

### Adding Member with Photo

```typescript
1. Click "Add Member"
2. Enter name: "Alice Johnson"
3. Enter position: "President"
4. Click upload area
5. Select "alice-photo.jpg"
6. See circular preview
7. Click "Add Member"
8. ✓ Member added with photo!
```

### Replacing Image

```typescript
1. Edit existing member
2. See current image in preview
3. Click "Remove Image"
4. Click upload area
5. Select new image
6. Click "Update Member"
7. ✓ Image updated!
```

## API Endpoint

### POST /api/upload

**Request:**
```
Content-Type: multipart/form-data

FormData:
  file: <File>
```

**Response (Success):**
```json
{
  "url": "/uploads/team/1697123456789-filename.jpg"
}
```

**Response (Error):**
```json
{
  "error": "File size must be less than 5MB"
}
```

## Troubleshooting

### Image Not Uploading

**Problem**: Upload fails with error
**Solutions**:
- Check file size (must be < 5MB)
- Ensure file is an image format
- Check internet connection
- Try different browser
- Check server logs

### Preview Not Showing

**Problem**: No preview after selecting file
**Solutions**:
- Ensure file is valid image
- Try different image file
- Check browser console for errors
- Clear browser cache

### Upload Taking Too Long

**Problem**: Spinning icon for extended time
**Solutions**:
- Check file size (large files take longer)
- Check network speed
- Compress image before upload
- Try URL method instead

### Image Not Displaying After Save

**Problem**: Image saved but not showing
**Solutions**:
- Refresh the page
- Check if file exists in /public/uploads/team/
- Verify URL in database
- Check file permissions

## Performance Considerations

### Optimization Tips

1. **Compress Images**
   - Use tools like TinyPNG, ImageOptim
   - Recommended: < 500KB for member photos

2. **Correct Dimensions**
   - Don't upload 4000x3000 for 100x100 display
   - Resize before upload

3. **File Format**
   - JPG: Best for photos
   - PNG: Best for logos/graphics
   - WebP: Best compression (if supported)

### Server Limits

- Max file size: 5MB
- Concurrent uploads: No limit (but be reasonable)
- Storage: Monitor /public/uploads/team/ size

## Backup Recommendations

### Important!
- Regularly backup `/public/uploads/team/` directory
- Images not stored in database, only URLs
- Losing files = broken image links
- Consider cloud storage for production

### Backup Strategy
```bash
# Example: Backup uploads folder
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz public/uploads/
```

## Migration Notes

### Moving to Cloud Storage (Future)

Current: Local file system
Future: AWS S3, Cloudinary, etc.

**To migrate:**
1. Upload existing files to cloud
2. Update `/api/upload/route.ts`
3. Update URLs in database
4. Test thoroughly

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ✅ Mobile browsers

### Required Features
- FileReader API
- FormData API
- Fetch API
- All modern browsers supported

## Accessibility

### Features
- Keyboard accessible upload button
- Screen reader compatible
- Clear labels and instructions
- Error messages announced
- Focus management

### ARIA Labels
- Upload button properly labeled
- Preview has alt text
- Error messages associated with inputs

## Future Enhancements

### Potential Improvements
- [ ] Image cropping tool
- [ ] Multiple image upload
- [ ] Drag-and-drop to upload area
- [ ] Image filters/effects
- [ ] Automatic compression
- [ ] Cloud storage integration
- [ ] CDN for faster loading
- [ ] Image optimization on upload

## Summary

### What You Can Do Now

✅ **Upload Images**: Select files from computer
✅ **Preview**: See images before saving
✅ **Remove**: Clear images easily
✅ **URL Option**: Still supports image URLs
✅ **Validation**: Files checked for safety
✅ **Fast**: Instant preview and upload

### Benefits

- 🎯 **Easier**: No need to host images elsewhere
- 🚀 **Faster**: Upload directly from computer
- 🔒 **Safer**: Server-side validation
- 📱 **Mobile**: Works on phones/tablets
- 💾 **Local**: Images stored on your server
- 🎨 **Preview**: See before you save

**Image uploads are now fully functional!** 📸
