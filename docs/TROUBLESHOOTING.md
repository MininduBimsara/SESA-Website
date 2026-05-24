# 🔧 Troubleshooting Guide - Admin Login System

## Common Issues & Solutions

### 1. Installation Issues

#### Issue: `npm install` fails

**Symptoms:**

- Package installation errors
- Dependency conflicts

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

### 2. Database Connection Issues

#### Issue: "Can't reach database server"

**Symptoms:**

- Error when running Prisma commands
- Login fails with database error

**Solutions:**

1. Check `.env` file exists with correct `DATABASE_URL`
2. Verify MongoDB connection string format:
   ```
   DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority"
   ```
3. Test connection:
   ```bash
   npx prisma db pull
   ```
4. Ensure MongoDB cluster allows your IP address
5. Check username/password are URL-encoded if they contain special characters

#### Issue: "Prisma Client not generated"

**Symptoms:**

- `Cannot find module '@/generated/prisma'`
- Import errors

**Solutions:**

```bash
# Generate Prisma Client
npx prisma generate

# If still fails, specify output directory
npx prisma generate --schema=./prisma/schema.prisma
```

---

### 3. Authentication Issues

#### Issue: "Invalid email or password" (but credentials are correct)

**Symptoms:**

- Can't login with correct credentials
- Admin exists in database

**Solutions:**

1. **Check if password was hashed during creation:**

   ```javascript
   // In MongoDB, password should look like:
   // "$2a$10$XxXxXxXxXxXxXxXxXxXxX..."
   // NOT: "plainTextPassword"
   ```

2. **Recreate admin with script:**

   ```bash
   # Delete existing admin from database first
   node scripts/create-admin.js
   ```

3. **Verify email is exactly the same** (no extra spaces)

#### Issue: Token verification fails / Keeps redirecting to login

**Symptoms:**

- Dashboard redirects to login immediately
- Console shows 401 error

**Solutions:**

1. **Check JWT_SECRET consistency:**

   ```bash
   # Make sure .env file has JWT_SECRET
   # Same secret must be used for signing and verifying
   ```

2. **Clear localStorage and try again:**

   ```javascript
   // In browser console:
   localStorage.clear();
   // Then login again
   ```

3. **Check token in localStorage:**

   ```javascript
   // In browser console:
   console.log(localStorage.getItem("authToken"));
   // Should show a JWT token, not "undefined"
   ```

4. **Verify API route is accessible:**
   ```bash
   # In PowerShell, test the verify endpoint:
   # (Replace YOUR_TOKEN with actual token from login)
   Invoke-RestMethod -Uri "http://localhost:3000/api/admin/verify" -Headers @{"Authorization"="Bearer YOUR_TOKEN"}
   ```

#### Issue: "No token provided" error

**Symptoms:**

- Verify endpoint returns 401
- Token exists in localStorage

**Solutions:**

1. Check Authorization header format:

   ```javascript
   // Should be: "Bearer <token>"
   // NOT: "<token>" or "bearer <token>"
   ```

2. Check useAuth.ts implementation:
   ```typescript
   // Should include:
   Authorization: `Bearer ${token}`;
   ```

---

### 4. Page/Routing Issues

#### Issue: 404 on admin routes

**Symptoms:**

- `/admin/login` shows 404
- `/admin/dashboard` not found

**Solutions:**

1. **Check file structure:**

   ```
   src/app/admin/
   ├── login/
   │   └── page.tsx     ✓ Must exist
   └── dashboard/
       └── page.tsx     ✓ Must exist
   ```

2. **Restart dev server:**

   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

3. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

#### Issue: Infinite redirect loop

**Symptoms:**

- Browser shows "Too many redirects"
- Console shows multiple navigation attempts

**Solutions:**

1. **Check admin/page.tsx:**

   ```typescript
   // Should have useEffect with proper dependencies
   useEffect(() => {
     // redirect logic
   }, [router]); // ✓ Include router in deps
   ```

2. **Clear localStorage:**

   ```javascript
   localStorage.clear();
   ```

3. **Check for conflicting redirects in layout.tsx**

---

### 5. Build/Compilation Issues

#### Issue: TypeScript errors

**Symptoms:**

- Red underlines in VS Code
- Build fails with type errors

**Solutions:**

1. **Check imports:**

   ```typescript
   // Use correct import paths
   import { useAuth } from "@/lib/useAuth"; // ✓
   import { useAuth } from "../lib/useAuth"; // ✗
   ```

2. **Install missing types:**

   ```bash
   npm install @types/bcryptjs @types/jsonwebtoken --save-dev
   ```

3. **Restart TypeScript server:**
   - VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

#### Issue: "Cannot find module" errors

**Symptoms:**

- Import errors
- Module not found

**Solutions:**

1. **Check tsconfig.json paths:**

   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. **Verify file exists at import path**

3. **Restart dev server**

---

### 6. API Issues

#### Issue: API route returns 500 Internal Server Error

**Symptoms:**

- Login fails with 500 error
- Console shows server errors

**Solutions:**

1. **Check server terminal for error details**

2. **Common causes:**

   ```typescript
   // ✗ Missing await
   const admin = prisma.admin.findUnique({...});

   // ✓ Correct
   const admin = await prisma.admin.findUnique({...});
   ```

3. **Check Prisma Client is imported:**

   ```typescript
   import { prisma } from "@/lib/prisma";
   ```

4. **Verify environment variables are loaded:**
   ```typescript
   console.log(process.env.JWT_SECRET); // Should not be undefined
   ```

#### Issue: CORS errors in browser console

**Symptoms:**

- "CORS policy blocked"
- API calls fail from frontend

**Solutions:**

- Ensure you're using same origin (localhost:3000 → localhost:3000)
- If using different ports, configure CORS in next.config.ts

---

### 7. UI/Display Issues

#### Issue: Styles not applying

**Symptoms:**

- Login page looks unstyled
- Buttons have no styling

**Solutions:**

1. **Check Tailwind CSS is configured:**

   ```bash
   # Should exist:
   postcss.config.mjs
   tailwind.config.ts (or js)
   ```

2. **Check globals.css imports Tailwind:**

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Restart dev server**

#### Issue: Components not found

**Symptoms:**

- `Cannot find module '@/components/ui/button'`

**Solutions:**

1. **Check components exist:**

   ```
   src/components/ui/
   ├── button.tsx  ✓
   └── card.tsx    ✓
   ```

2. **If missing, install shadcn/ui:**
   ```bash
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add card
   ```

---

### 8. Script Issues

#### Issue: create-admin.js fails

**Symptoms:**

- Script errors
- Admin not created

**Solutions:**

1. **Run from project root:**

   ```bash
   # Not from scripts/ folder
   cd /path/to/SESA-Website
   node scripts/create-admin.js
   ```

2. **Check Prisma Client path:**

   ```javascript
   // Should match your Prisma output location
   require("../src/generated/prisma");
   ```

3. **Ensure dependencies are installed:**

   ```bash
   npm install bcryptjs @prisma/client
   ```

4. **Check database connection before running**

---

### 9. Production Issues

#### Issue: Environment variables not working in production

**Symptoms:**

- JWT_SECRET undefined
- Database connection fails

**Solutions:**

1. **Ensure environment variables are set in hosting platform:**

   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Others: Check platform documentation

2. **Don't use .env file in production** (use platform's env vars)

3. **Rebuild after changing env vars**

#### Issue: localStorage not available

**Symptoms:**

- "localStorage is not defined"
- Server-side errors

**Solutions:**

1. **Use client-side check:**

   ```typescript
   if (typeof window !== "undefined") {
     localStorage.getItem("authToken");
   }
   ```

2. **Ensure 'use client' directive is present:**
   ```typescript
   "use client";
   import { useState } from "react";
   ```

---

## 🔍 Debugging Tips

### Enable Detailed Logging

Add to API routes:

```typescript
console.log("Request received:", request.method, request.url);
console.log("Request body:", await request.json());
console.log("Environment:", {
  hasSecret: !!process.env.JWT_SECRET,
  hasDB: !!process.env.DATABASE_URL,
});
```

### Check Token Contents

In browser console:

```javascript
const token = localStorage.getItem("authToken");
const payload = JSON.parse(atob(token.split(".")[1]));
console.log("Token payload:", payload);
console.log("Token expires:", new Date(payload.exp * 1000));
```

### Test API Directly

Using PowerShell:

```powershell
# Test login
$body = @{
    email = "admin@sesacampus.com"
    password = "Admin@123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/admin/login" -Method POST -Body $body -ContentType "application/json"
```

### Check Database

Using MongoDB Compass or mongo shell:

```javascript
// Connect to your database
use your_database_name

// Check if admin exists
db.Admin.find()

// Check if password is hashed
db.Admin.findOne({}, {password: 1})
// Should start with "$2a$10$..."
```

---

## 🆘 Still Having Issues?

1. **Check all documentation files:**

   - `ADMIN_AUTH_README.md`
   - `QUICKSTART_ADMIN.md`
   - `TESTING_ADMIN.md`

2. **Review code comments** in the implementation files

3. **Check browser console** for client-side errors

4. **Check terminal/server logs** for server-side errors

5. **Verify all prerequisites:**

   - Node.js installed
   - npm packages installed
   - MongoDB connected
   - Prisma Client generated
   - Environment variables set

6. **Try the nuclear option:**
   ```bash
   # Delete everything and start fresh
   rm -rf node_modules .next
   npm cache clean --force
   npm install
   npx prisma generate
   npm run dev
   ```

---

## 📋 Checklist for Common Problems

Before asking for help, verify:

- [ ] Node modules installed (`npm install` run successfully)
- [ ] Prisma Client generated (`npx prisma generate` completed)
- [ ] Database connected (connection string in `.env`)
- [ ] Environment variables set (`JWT_SECRET` and `DATABASE_URL`)
- [ ] Dev server running (`npm run dev` active)
- [ ] Admin user created (via script or API)
- [ ] Password is hashed in database (starts with `$2a$10$`)
- [ ] Browser console checked for errors
- [ ] Server terminal checked for errors
- [ ] Tried clearing cache/localStorage
- [ ] Tried restarting dev server

If all above are checked and issue persists, provide:

1. Exact error message
2. Browser console logs
3. Server terminal logs
4. Steps to reproduce
5. What you've already tried
