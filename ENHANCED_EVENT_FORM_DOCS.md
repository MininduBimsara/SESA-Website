# Enhanced Event Form - Documentation

## Overview

The Event Form has been significantly enhanced with professional date/time pickers, image upload functionality, comprehensive validation, and automatic status calculation based on event dates.

## New Features ✨

### 1. Date & Time Pickers

- **Date Range Picker**: Select single date or date range for multi-day events
- **Time Pickers**: Separate start and end time selection with 15-minute intervals
- **User-Friendly**: Calendar UI with visual date selection
- **Validation**: Prevents past dates, validates date ranges

### 2. Image Upload

- **File Upload**: Direct image file upload with preview
- **File Validation**:
  - Only image files accepted (jpg, png, gif, webp)
  - Maximum file size: 5MB
  - Image preview before submission
- **Base64 Encoding**: Images converted to base64 for easy storage
- **Remove Option**: Delete uploaded image and re-upload

### 3. Automatic Status Calculation

- **Intelligent Status**: Status automatically calculated based on event dates
- **Real-time Update**: Status updates as you change dates
- **Logic**:
  - `Upcoming`: Event date is in the future
  - `Ongoing`: Event is happening today (between start and end date)
  - `Past`: Event has already finished
- **Visual Feedback**: Display shows calculated status with explanation

### 4. Enhanced Validation

- **Required Fields**:
  - Title
  - Description
  - Start Date
  - Location
  - Start Time
- **Format Validation**:
  - URL validation for registration link
  - Date range validation (end date must be after start date)
  - Image file type and size validation
- **Real-time Error Clearing**: Errors clear as user fixes issues
- **Visual Indicators**: Red borders and error messages for invalid fields

## Form Fields

### Basic Information

| Field                 | Type     | Required | Validation | Notes                                      |
| --------------------- | -------- | -------- | ---------- | ------------------------------------------ |
| **Title**             | Text     | ✅ Yes   | Non-empty  | Event name                                 |
| **Short Description** | Textarea | ✅ Yes   | Non-empty  | Brief description (shown on cards)         |
| **Long Description**  | Textarea | ❌ No    | -          | Detailed description (shown on event page) |

### Date & Time

| Field          | Type              | Required | Validation                | Notes                     |
| -------------- | ----------------- | -------- | ------------------------- | ------------------------- |
| **Event Date** | Date Range Picker | ✅ Yes   | Must be present or future | Single date or range      |
| **Start Time** | Time Picker       | ✅ Yes   | Must be selected          | Event start time          |
| **End Time**   | Time Picker       | ❌ No    | -                         | Event end time (optional) |

### Location & Image

| Field        | Type        | Required | Validation          | Notes               |
| ------------ | ----------- | -------- | ------------------- | ------------------- |
| **Location** | Text        | ✅ Yes   | Non-empty           | Event venue         |
| **Image**    | File Upload | ❌ No    | Image type, max 5MB | Event banner/poster |

### Event Details

| Field                 | Type            | Required         | Validation       | Notes                                         |
| --------------------- | --------------- | ---------------- | ---------------- | --------------------------------------------- |
| **Status**            | Auto-calculated | N/A              | Based on date    | upcoming/ongoing/past                         |
| **Category**          | Dropdown        | ✅ Yes (default) | -                | hackathon, workshop, competition, social, csr |
| **Participants**      | Number          | ❌ No            | Positive integer | Expected attendance                           |
| **Registration Link** | URL             | ❌ No            | Valid URL format | Link to registration form                     |
| **Featured**          | Checkbox        | ❌ No            | -                | Highlight on homepage                         |

## Usage Guide

### Creating a New Event

1. **Open Form**: Click "Add Event" button on events page
2. **Enter Title**: Type the event name (e.g., "RealHack 5.0")
3. **Add Descriptions**:
   - Short: 1-2 sentences for cards
   - Long: Detailed information (optional)
4. **Select Date**:
   - Click date picker
   - Choose single date or click-drag for range
   - Calendar shows selected dates in blue
5. **Select Time**:
   - Click start time picker
   - Scroll or type time (e.g., "9:00 AM")
   - Optionally select end time
6. **Set Location**: Enter venue name
7. **Upload Image**:
   - Click "Choose Image" button
   - Select image file (jpg, png, etc.)
   - Preview appears below
   - Click X to remove and re-upload
8. **Select Category**: Choose from dropdown
9. **Optional Fields**:
   - Add expected participants count
   - Add registration link (must be valid URL)
   - Check "Featured" if highlight needed
10. **Review Status**: Auto-calculated status shown
11. **Submit**: Click "Create Event"

### Editing an Existing Event

1. **Open Form**: Click edit icon on event row
2. **Form Pre-fills**: All fields populate with existing data
3. **Modify Fields**: Change any field as needed
4. **Date/Time Editing**:
   - Existing dates parse and display in pickers
   - Select new dates if needed
5. **Image Handling**:
   - Existing image shows in preview
   - Upload new image to replace
6. **Status Updates**: Automatically recalculates on date change
7. **Submit**: Click "Update Event"

## Technical Details

### Date Format Handling

**Input (Form State)**:

```typescript
startDate: Date | null; // Single date object
endDate: Date | null; // Optional end date
startTime: Date | null; // Time as date object
endTime: Date | null; // Optional end time
```

**Output (Submitted to API)**:

```typescript
date: string; // "October 12, 2025" or "October 12, 2025 - October 14, 2025"
time: string; // "9:00 AM - 5:00 PM" or "9:00 AM"
status: string; // "upcoming" | "ongoing" | "past" (auto-calculated)
```

**Parsing Logic** (for editing):

```typescript
// Date parsing
const dates = event.date.split(" - ");
startDate = new Date(dates[0]);
endDate = dates[1] ? new Date(dates[1]) : null;

// Time parsing
const times = event.time.split(" - ");
// Convert to Date object for time picker
```

### Status Calculation Algorithm

```typescript
function calculateStatus(startDate: Date, endDate: Date | null): Status {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize to midnight

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = endDate ? new Date(endDate) : new Date(startDate);
  end.setHours(23, 59, 59, 999); // End of day

  if (now < start) return "upcoming";
  if (now > end) return "past";
  return "ongoing";
}
```

**Examples**:

- Event on Oct 15, Today is Oct 10 → `upcoming`
- Event on Oct 10, Today is Oct 10 → `ongoing`
- Event Oct 10-12, Today is Oct 11 → `ongoing`
- Event on Oct 5, Today is Oct 10 → `past`

### Image Upload Process

1. **File Selection**: User selects image file
2. **Validation**:

   ```typescript
   // Check file type
   if (!file.type.startsWith("image/")) {
     error;
   }

   // Check file size
   if (file.size > 5 * 1024 * 1024) {
     error;
   } // 5MB
   ```

3. **Base64 Conversion**:
   ```typescript
   const reader = new FileReader();
   reader.onloadend = () => {
     const base64 = reader.result; // data:image/jpeg;base64,...
     setImagePreview(base64);
     formData.image = base64;
   };
   reader.readAsDataURL(file);
   ```
4. **Preview Display**: Shows converted image
5. **Submission**: Base64 string sent to API
6. **Storage**: Stored in database as text field

### Form Validation Rules

```typescript
// Validation function
const validate = (): boolean => {
  const errors = {};

  // Required field checks
  if (!title.trim()) errors.title = "Title is required";
  if (!description.trim()) errors.description = "Description is required";
  if (!startDate) errors.date = "Start date is required";
  if (!location.trim()) errors.location = "Location is required";
  if (!startTime) errors.time = "Start time is required";

  // Format validations
  if (endDate && endDate < startDate) {
    errors.endDate = "End date must be after start date";
  }

  if (registrationLink && !isValidUrl(registrationLink)) {
    errors.registrationLink = "Please enter a valid URL";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

// URL validation
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

## Component Structure

```
EventForm
├── State Management
│   ├── formData: Form field values + date/time objects
│   ├── errors: Validation error messages
│   ├── imagePreview: Base64 preview string
│   ├── uploadingImage: Loading state
│   └── loading: Form submission state
│
├── Handlers
│   ├── handleSubmit: Format dates, calculate status, submit
│   ├── handleChange: Standard input changes
│   ├── handleDateChange: Date range picker updates
│   ├── handleTimeChange: Time picker updates
│   └── handleImageUpload: File validation & conversion
│
├── Utilities
│   ├── calculateStatus: Auto status from dates
│   ├── formatDate: Date object → "Month Day, Year" string
│   ├── formatTime: Time object → "H:MM AM/PM" string
│   ├── validate: Form validation logic
│   └── isValidUrl: URL format checker
│
└── UI Sections
    ├── Header (Title + Close button)
    ├── Title Input
    ├── Short Description Textarea
    ├── Long Description Textarea
    ├── Date Picker (range select)
    ├── Time Pickers (start + end)
    ├── Location Input
    ├── Image Uploader (file + preview)
    ├── Status Display (auto-calculated)
    ├── Category Dropdown
    ├── Participants Number Input
    ├── Registration Link URL Input
    ├── Featured Checkbox
    └── Action Buttons (Cancel + Submit)
```

## Dependencies

### New Packages

```json
{
  "react-datepicker": "^latest",
  "@types/react-datepicker": "^latest"
}
```

### Imports

```typescript
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default styles
```

## Styling

### DatePicker Customization

The component uses Tailwind classes for consistent styling:

- Input width: `w-full`
- Padding: `px-4 py-2`
- Border radius: `rounded-lg`
- Focus ring: `focus:ring-2 focus:ring-blue-500`
- Error state: `border-red-500`

### Custom CSS (Optional)

Create `src/styles/datepicker.css` to override default styles:

```css
.react-datepicker {
  font-family: inherit;
  border-radius: 0.5rem;
}

.react-datepicker__header {
  background-color: #3b82f6;
}

.react-datepicker__day--selected {
  background-color: #3b82f6;
}
```

## API Integration

### Request Format

```typescript
POST /api/events
PUT /api/events/[id]

{
  "title": "RealHack 5.0",
  "description": "24-hour hackathon",
  "longDescription": "Join us for an exciting...",
  "date": "October 15, 2025 - October 16, 2025",
  "time": "9:00 AM - 9:00 AM",
  "location": "Faculty of Science",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "status": "upcoming",
  "category": "hackathon",
  "participants": 150,
  "registrationLink": "https://forms.google.com/...",
  "featured": true
}
```

### Response Format

```typescript
{
  "id": "507f1f77bcf86cd799439011",
  "title": "RealHack 5.0",
  "description": "24-hour hackathon",
  "date": "October 15, 2025 - October 16, 2025",
  "time": "9:00 AM - 9:00 AM",
  "status": "upcoming",
  "category": "hackathon",
  "featured": true,
  "createdAt": "2025-10-12T10:30:00Z",
  "updatedAt": "2025-10-12T10:30:00Z",
  ...
}
```

## Best Practices

### For Administrators

1. **Image Selection**:

   - Use high-quality images (recommended: 1200x675px)
   - Keep file size under 2MB for faster loading
   - Use relevant event photos or graphics

2. **Date Selection**:

   - Always select start date first
   - For single-day events, leave end date empty
   - For multi-day events, select the range

3. **Time Selection**:

   - Include both start and end times when possible
   - Use consistent time format (12-hour AM/PM)

4. **Description Writing**:

   - Short: Focus on hook and key benefit
   - Long: Include agenda, speakers, requirements

5. **Status Monitoring**:
   - Check the auto-calculated status before submitting
   - Status updates automatically based on saved dates

### For Developers

1. **Error Handling**:

   ```typescript
   try {
     await handleImageUpload(file);
   } catch (error) {
     console.error("Upload failed:", error);
     alert("Failed to upload image");
   }
   ```

2. **Date Normalization**:

   ```typescript
   // Always normalize dates for comparison
   const now = new Date();
   now.setHours(0, 0, 0, 0);
   ```

3. **State Management**:

   ```typescript
   // Clear errors when user fixes issues
   if (errors[name]) {
     setErrors((prev) => ({ ...prev, [name]: "" }));
   }
   ```

4. **Type Safety**:
   ```typescript
   // Use proper TypeScript types
   type FormData = Omit<Event, "id" | "createdAt" | "updatedAt"> & {
     startDate?: Date | null;
     endDate?: Date | null;
     // ...
   };
   ```

## Troubleshooting

### Common Issues

**Issue**: DatePicker not showing

- **Solution**: Ensure CSS imported: `import "react-datepicker/dist/react-datepicker.css"`

**Issue**: Image upload fails

- **Solution**: Check file size (< 5MB) and type (image/\*)

**Issue**: Status not updating

- **Solution**: Verify date is selected; status calculates automatically

**Issue**: Form validation failing

- **Solution**: Check all required fields marked with \*

**Issue**: Date parsing error on edit

- **Solution**: Ensure date stored in format: "Month Day, Year"

### Debug Tips

```typescript
// Check form state
console.log("Form Data:", formData);

// Verify date parsing
console.log("Parsed Dates:", { startDate, endDate });

// Check status calculation
console.log("Calculated Status:", calculateStatus(startDate, endDate));

// Validate image
console.log("Image size:", file.size, "Type:", file.type);
```

## Future Enhancements

Potential improvements for future versions:

1. **Cloud Image Upload**:

   - Integrate with Cloudinary or AWS S3
   - Reduce database size
   - Faster image loading

2. **Recurring Events**:

   - Add recurrence pattern selector
   - Generate series of events

3. **Calendar Integration**:

   - Export to Google Calendar
   - iCal download

4. **Rich Text Editor**:

   - Replace textarea with WYSIWYG editor
   - Add formatting, links, images

5. **Drag-and-Drop Upload**:

   - Drag image directly to form
   - Multiple image support

6. **Time Zone Support**:

   - Detect user timezone
   - Convert times automatically

7. **Duplicate Event**:
   - Copy existing event as template
   - Quick event creation

## Summary

The enhanced Event Form provides a professional, user-friendly interface for managing campus events with:

✅ **Intuitive Date/Time Selection** - Visual pickers with validation
✅ **Smart Status Management** - Automatic calculation from dates  
✅ **Image Upload** - Direct file upload with preview
✅ **Comprehensive Validation** - Real-time error checking
✅ **Clean UX** - Modern design with clear feedback

The form ensures data consistency, reduces manual errors, and provides a seamless experience for event administrators.
