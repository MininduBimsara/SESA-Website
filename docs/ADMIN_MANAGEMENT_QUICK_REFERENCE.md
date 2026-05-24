# Admin Management - Quick Reference

## 🚀 Quick Start

### Access Admin Management
```
Navigate to: /admin/admins
Or click: "Admin Management" in sidebar (Shield icon)
```

---

## ⚡ Quick Actions

### Create Admin
1. Click **"+ Add Admin"**
2. Fill form (Name, Email, Password, Role)
3. Click **"Create Admin"**

### Edit Admin
1. Click **Edit (✏️)** on admin card
2. Update fields
3. **Leave password blank** to keep current
4. Click **"Update Admin"**

### Delete Admin
1. Click **Delete (🗑️)** on admin card
2. Confirm deletion
3. Done!

### Search Admins
Type in search bar - searches name, email, and role

---

## 👥 Roles

| Role | Access Level | Badge Color |
|------|--------------|-------------|
| **Super Admin** | Full system access | 🟣 Purple + 👑 |
| **Admin** | Standard admin access | ⚪ Gray + ⚙️ |
| **Editor** | Content management | 🔵 Blue + ✏️ |

---

## 📋 Form Fields

| Field | Required | Notes |
|-------|----------|-------|
| Full Name | ✅ Yes | Display name |
| Email | ✅ Yes | Must be unique |
| Password | ✅ New / ❌ Edit | Leave blank when editing to keep current |
| Role | ✅ Yes | Admin, Editor, or Super Admin |

---

## 🔒 Security

- ✅ Passwords auto-hashed with bcrypt
- ✅ Passwords never exposed in responses
- ✅ Email uniqueness enforced
- ✅ All fields validated

---

## 🛠️ API Endpoints

```typescript
GET    /api/admin           // Fetch all admins
POST   /api/admin           // Create admin
PATCH  /api/admin           // Update admin
DELETE /api/admin?id={id}   // Delete admin
```

---

## 💡 Pro Tips

1. **Updating Password**: Leave password field blank when editing to keep the current password
2. **Search**: Use search bar to quickly find admins by any field
3. **Role Colors**: Purple = Super Admin, Blue = Editor, Gray = Admin
4. **Statistics**: Bottom cards show admin counts by role
5. **Confirmation**: Deletion requires confirmation - can't undo!

---

## 🐛 Common Issues

**"Email already exists"**  
→ Use different email or edit existing admin

**Password not updating**  
→ Intentional! Leave blank to keep current password

**Can't delete admin**  
→ Check if it's the last admin (may need at least one)

---

## 📊 Statistics Dashboard

View at bottom of page:
- **Total Admins** - Count of all admins
- **Super Admins** - Count of super admins (purple)
- **Editors** - Count of editors (blue)

---

## 🎨 UI Components

### Admin Card Shows:
- Name (bold, large)
- Role badge (colored with icon)
- Email (with icon)
- Join date (with icon)
- Edit button
- Delete button

### Empty States:
- **No admins**: "Create your first admin to get started"
- **No search results**: "Try adjusting your search terms"

---

## ✅ Testing Checklist

Basic functionality:
- [ ] Create admin
- [ ] Edit admin (with password)
- [ ] Edit admin (without password)
- [ ] Delete admin
- [ ] Search by name
- [ ] Search by email
- [ ] View statistics

---

## 📁 File Locations

```
/src/app/admin/admins/page.tsx     # UI Component
/src/app/api/admin/route.ts        # API Routes
/prisma/schema.prisma              # Database Schema
```

---

## 🔐 Database Schema

```prisma
model Admin {
  id        String   @id @default(auto())
  name      String
  email     String   @unique
  password  String   // Hashed
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 📝 Example Usage

### Create Super Admin
```json
{
  "name": "Alice Johnson",
  "email": "alice@sesa.com",
  "password": "SecurePass123!",
  "role": "superadmin"
}
```

### Update Admin (Keep Password)
```json
{
  "id": "507f...",
  "name": "Alice Smith",
  "email": "alice.smith@sesa.com",
  "role": "admin"
  // No password field = keeps current
}
```

---

## 🎯 Next Steps

After setup:
1. Create first admin (if none exist)
2. Test login with new credentials
3. Create additional admins as needed
4. Assign appropriate roles
5. Remove any test/temporary accounts

---

**Need Help?**  
See full documentation: `ADMIN_MANAGEMENT_DOCUMENTATION.md`
