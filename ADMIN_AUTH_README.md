# Admin Authentication System

This admin authentication system uses JWT tokens and bcrypt for secure password hashing.

## Environment Variables

Add the following to your `.env` file:

```env
DATABASE_URL="your-mongodb-connection-string"
JWT_SECRET="your-super-secret-jwt-key-change-this"
```

⚠️ **Important**: Change the JWT_SECRET to a strong, random string in production!

## Creating Your First Admin User

Since the registration endpoint should be protected in production, you can create your first admin using one of these methods:

### Method 1: Using Node.js Script

Run this command in your terminal (make sure you're in the project root):

```bash
node scripts/create-admin.js
```

### Method 2: Using API Directly (Development Only)

Send a POST request to `/api/admin/register`:

```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Name",
    "email": "admin@example.com",
    "password": "your-secure-password",
    "role": "superadmin"
  }'
```

Or use a tool like Postman/Insomnia with:

- URL: `http://localhost:3000/api/admin/register`
- Method: POST
- Body (JSON):

```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "your-secure-password",
  "role": "superadmin"
}
```

## API Endpoints

### POST `/api/admin/login`

Login with email and password.

**Request:**

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response:**

```json
{
  "success": true,
  "token": "jwt-token-here",
  "admin": {
    "id": "...",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### GET `/api/admin/verify`

Verify JWT token validity.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "admin": {
    "id": "...",
    "email": "admin@example.com",
    "name": "Admin Name",
    "role": "admin"
  }
}
```

### POST `/api/admin/register`

Create a new admin (should be protected in production).

**Request:**

```json
{
  "name": "New Admin",
  "email": "newadmin@example.com",
  "password": "secure-password",
  "role": "admin"
}
```

## Security Notes

1. **JWT_SECRET**: Use a strong, random secret in production
2. **HTTPS**: Always use HTTPS in production
3. **Registration Endpoint**: Protect `/api/admin/register` endpoint - only superadmins should be able to create new admins
4. **Password Requirements**: Consider implementing password strength requirements
5. **Rate Limiting**: Implement rate limiting on login endpoint to prevent brute force attacks
6. **Token Expiry**: Tokens expire after 7 days by default

## Usage

1. Navigate to `/admin` or `/admin/login`
2. Enter your credentials
3. Upon successful login, you'll be redirected to `/admin/dashboard`
4. Token is stored in localStorage and automatically used for authentication
5. Click "Logout" to clear the session

## Protected Routes

The authentication hook (`useAuth`) automatically protects any page that uses it:

- Checks for valid token
- Redirects to login if not authenticated
- Verifies token with backend
- Provides logout functionality
