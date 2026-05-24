# Testing the Admin Login System

## Step-by-Step Testing Guide

### Prerequisites

1. MongoDB connection is configured in `.env`
2. Dependencies are installed
3. Prisma is generated

### Test 1: Create Admin User

Run in PowerShell:

```powershell
node scripts/create-admin.js
```

Expected output:

```
✅ Admin user created successfully!

Admin Details:
  Name: Super Admin
  Email: admin@sesacampus.com
  Role: superadmin
  ID: [some-id]
```

### Test 2: Start Development Server

```powershell
npm run dev
```

Server should start at `http://localhost:3000`

### Test 3: Access Admin Area

1. Open browser to `http://localhost:3000/admin`
2. Should redirect to `http://localhost:3000/admin/login`
3. You should see a professional login form

### Test 4: Login with Valid Credentials

1. Enter email: `admin@sesacampus.com`
2. Enter password: `Admin@123`
3. Click "Sign In"
4. Should redirect to `http://localhost:3000/admin/dashboard`
5. Dashboard should show:
   - Welcome message with admin name
   - Stats cards
   - Quick action buttons
   - Profile information
   - Logout button

### Test 5: Verify Authentication Persistence

1. While on dashboard, refresh the page
2. Should remain on dashboard (token is valid)
3. Open DevTools > Application > Local Storage
4. Should see `authToken` and `adminInfo` entries

### Test 6: Test Invalid Login

1. Logout from dashboard
2. Try to login with wrong password
3. Should see error: "Invalid email or password"
4. Try with non-existent email
5. Should see same error (security: don't reveal which field is wrong)

### Test 7: Test Protected Routes

1. Logout from dashboard
2. Try to access `http://localhost:3000/admin/dashboard` directly
3. Should redirect to login page

### Test 8: Test Logout

1. Login successfully
2. Click "Logout" button on dashboard
3. Should redirect to login page
4. Check Local Storage - `authToken` and `adminInfo` should be removed
5. Try to access dashboard again - should redirect to login

### Test 9: Test Token Verification API

Open PowerShell and test the API:

```powershell
# First, login and get token
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/admin/login" -Method POST -ContentType "application/json" -Body '{"email":"admin@sesacampus.com","password":"Admin@123"}'
$token = $response.token

# Then verify the token
Invoke-RestMethod -Uri "http://localhost:3000/api/admin/verify" -Method GET -Headers @{"Authorization"="Bearer $token"}
```

Expected response:

```json
{
  "success": true,
  "admin": {
    "id": "...",
    "email": "admin@sesacampus.com",
    "name": "Super Admin",
    "role": "superadmin"
  }
}
```

### Test 10: Test Registration API (Optional)

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/admin/register" -Method POST -ContentType "application/json" -Body '{"name":"Test Admin","email":"test@example.com","password":"Test@123","role":"admin"}'
```

Expected response:

```json
{
  "success": true,
  "admin": {
    "id": "...",
    "name": "Test Admin",
    "email": "test@example.com",
    "role": "admin"
  }
}
```

## ✅ Success Criteria

All tests should pass:

- [x] Admin user created successfully
- [x] Login page loads correctly
- [x] Valid credentials allow login
- [x] Dashboard displays after login
- [x] Token persists across refreshes
- [x] Invalid credentials show error
- [x] Protected routes redirect to login
- [x] Logout clears session
- [x] Token verification works
- [x] Registration endpoint works

## 🐛 Common Issues

### Issue: "PrismaClient is not configured"

**Solution:** Run `npx prisma generate`

### Issue: "Cannot find module 'bcryptjs'"

**Solution:** Run `npm install`

### Issue: "Database connection error"

**Solution:** Check `DATABASE_URL` in `.env`

### Issue: Login shows error but credentials are correct

**Solution:**

- Check browser console for errors
- Verify admin exists in database
- Check if password was hashed during creation

### Issue: Dashboard redirects to login immediately

**Solution:**

- Check browser console for API errors
- Verify JWT_SECRET is consistent
- Clear localStorage and try again

## 📊 Manual Database Verification

Using MongoDB Compass or mongo shell:

```javascript
// Check if admin exists
db.Admin.find({ email: "admin@sesacampus.com" });

// Verify password is hashed
// Should see password like: "$2a$10$..."
```

## 🎉 Next Steps

Once all tests pass:

1. Change the default admin password
2. Delete or secure the create-admin.js script
3. Set a strong JWT_SECRET in production
4. Implement additional admin management features
5. Add more protected routes as needed
