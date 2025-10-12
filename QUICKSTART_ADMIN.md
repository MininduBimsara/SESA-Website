# Quick Start Guide - Admin Login System

## 🚀 Setup Steps

### 1. Install Dependencies (Already done!)

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your-mongodb-connection-string"
JWT_SECRET="your-secret-key-min-32-characters-long"
```

### 3. Run Database Migrations

```bash
npx prisma generate
npx prisma db push
```

### 4. Create Your First Admin User

**Option A: Using the API directly**
Start the dev server:

```bash
npm run dev
```

Then make a POST request to create an admin:

```bash
curl -X POST http://localhost:3000/api/admin/register -H "Content-Type: application/json" -d "{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"SecurePass123\",\"role\":\"superadmin\"}"
```

**Option B: Using the Node.js script**

```bash
node scripts/create-admin.js
```

(Edit the script first to set your desired credentials)

### 5. Test the Login

1. Navigate to: `http://localhost:3000/admin`
2. You'll be redirected to: `http://localhost:3000/admin/login`
3. Enter your credentials
4. Upon success, you'll be redirected to the dashboard

## 📝 Test Credentials (if using the script as-is)

- **Email:** admin@sesacampus.com
- **Password:** Admin@123

⚠️ **Change these immediately after first login!**

## 🔑 Features Implemented

✅ Secure password hashing with bcrypt
✅ JWT token-based authentication
✅ Protected admin routes
✅ Auto-redirect if not authenticated
✅ Login page with error handling
✅ Dashboard with user info and logout
✅ Token verification endpoint
✅ Admin registration endpoint

## 🛠️ API Endpoints

| Endpoint              | Method | Description             |
| --------------------- | ------ | ----------------------- |
| `/api/admin/login`    | POST   | Login and get JWT token |
| `/api/admin/verify`   | GET    | Verify token validity   |
| `/api/admin/register` | POST   | Create new admin user   |

## 🔒 Security Recommendations

1. **Use HTTPS in production**
2. **Set a strong JWT_SECRET** (at least 32 characters)
3. **Protect the registration endpoint** - only allow superadmins to create new admins
4. **Implement rate limiting** on login endpoint
5. **Add password strength requirements**
6. **Enable 2FA** for additional security
7. **Log authentication attempts** for auditing
8. **Rotate JWT secrets periodically**

## 📂 File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx           # Login page
│   │   ├── dashboard/page.tsx       # Protected dashboard
│   │   ├── layout.tsx               # Admin layout
│   │   └── page.tsx                 # Redirector
│   └── api/
│       └── admin/
│           ├── login/route.ts       # Login API
│           ├── verify/route.ts      # Token verification API
│           └── register/route.ts    # Registration API
└── lib/
    └── useAuth.ts                   # Authentication hook
```

## 🐛 Troubleshooting

### "Invalid email or password"

- Check your credentials
- Verify the admin user exists in the database
- Ensure password was hashed correctly

### "No token provided"

- Clear localStorage and try logging in again
- Check browser console for errors

### Database connection issues

- Verify DATABASE_URL in .env
- Ensure MongoDB is running
- Run `npx prisma generate` and `npx prisma db push`

### Token verification fails

- Ensure JWT_SECRET matches between login and verify
- Check if token has expired (7 days default)
- Clear localStorage and login again

## 📞 Need Help?

Check the detailed documentation in `ADMIN_AUTH_README.md`
