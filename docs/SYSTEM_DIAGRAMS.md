# 📊 Admin Authentication System - Visual Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  /admin      │───▶│ /admin/login │───▶│  /admin/     │  │
│  │  (redirect)  │    │  (form)      │    │  dashboard   │  │
│  └──────────────┘    └──────┬───────┘    └───────▲──────┘  │
│                              │                    │          │
│                              │ POST login         │ verify   │
│                              ▼                    │          │
└──────────────────────────────┼────────────────────┼──────────┘
                               │                    │
                               │                    │
┌──────────────────────────────┼────────────────────┼──────────┐
│                        API Routes                  │          │
├────────────────────────────────────────────────────┼──────────┤
│                              │                     │          │
│  ┌───────────────────┐      │      ┌──────────────┴───────┐  │
│  │ /api/admin/login  │◀─────┘      │ /api/admin/verify   │  │
│  │                   │              │                     │  │
│  │ - Validate        │              │ - Check JWT token  │  │
│  │ - Hash compare    │              │ - Return user info │  │
│  │ - Generate JWT    │              │                     │  │
│  └─────────┬─────────┘              └─────────────────────┘  │
│            │                                                  │
│            │                         ┌──────────────────────┐│
│            │                         │ /api/admin/register ││
│            │                         │                     ││
│            │                         │ - Create admin     ││
│            │                         │ - Hash password    ││
│            │                         └──────────┬──────────┘│
│            │                                    │           │
└────────────┼────────────────────────────────────┼───────────┘
             │                                    │
             │                                    │
┌────────────┼────────────────────────────────────┼───────────┐
│         Database (MongoDB via Prisma)           │           │
├─────────────────────────────────────────────────┼───────────┤
│                                                  │           │
│  ┌──────────────────────────────────────────────▼────────┐  │
│  │                   Admin Collection                     │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ id, name, email, password (hashed), role,       │  │  │
│  │  │ createdAt, updatedAt                            │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## Authentication Flow Diagram

```
┌─────────┐
│  User   │
└────┬────┘
     │
     ▼
┌─────────────────┐
│ Visit /admin    │
└────┬────────────┘
     │
     ▼
┌────────────────────────┐
│ Has valid token?       │
└────┬───────────────┬───┘
     │ NO            │ YES
     ▼               ▼
┌─────────────┐  ┌──────────────┐
│ Redirect to │  │ Show         │
│ /login      │  │ Dashboard    │
└─────┬───────┘  └──────────────┘
      │
      ▼
┌──────────────────┐
│ Enter Email &    │
│ Password         │
└─────┬────────────┘
      │
      ▼
┌──────────────────────────┐
│ POST /api/admin/login    │
└─────┬────────────────────┘
      │
      ▼
┌─────────────────────────────┐
│ Server: Validate Credentials│
└─────┬──────────────┬────────┘
      │ INVALID      │ VALID
      │              │
      ▼              ▼
┌──────────┐    ┌────────────────┐
│ Show     │    │ Generate JWT   │
│ Error    │    │ Return token   │
└──────────┘    └────┬───────────┘
                     │
                     ▼
              ┌──────────────────┐
              │ Store in         │
              │ localStorage     │
              └────┬─────────────┘
                   │
                   ▼
              ┌──────────────────┐
              │ Redirect to      │
              │ Dashboard        │
              └──────────────────┘
```

## Token Lifecycle

```
┌──────────────────────────────────────────────────────────┐
│                    Token Lifecycle                        │
└──────────────────────────────────────────────────────────┘

1. LOGIN
   ┌─────────────────┐
   │ User logs in    │
   └────────┬────────┘
            │
            ▼
   ┌─────────────────────────────┐
   │ JWT Token Generated         │
   │ - Payload: id, email, role  │
   │ - Expiry: 7 days            │
   │ - Signed with JWT_SECRET    │
   └────────┬────────────────────┘
            │
            ▼
   ┌─────────────────────────────┐
   │ Token stored in localStorage│
   └─────────────────────────────┘

2. USAGE (Every Protected Request)
   ┌─────────────────────┐
   │ User accesses page  │
   └────────┬────────────┘
            │
            ▼
   ┌───────────────────────────┐
   │ useAuth hook checks token │
   └────────┬──────────────────┘
            │
            ▼
   ┌──────────────────────────────┐
   │ GET /api/admin/verify        │
   │ Authorization: Bearer <token>│
   └────────┬─────────────────────┘
            │
            ▼
   ┌─────────────────┐
   │ Token Valid?    │
   └────┬───────┬────┘
        │ NO    │ YES
        │       │
        ▼       ▼
   ┌─────┐  ┌──────────┐
   │Logout│  │Allow     │
   │      │  │Access    │
   └──────┘  └──────────┘

3. LOGOUT
   ┌─────────────────┐
   │ User clicks     │
   │ Logout button   │
   └────────┬────────┘
            │
            ▼
   ┌──────────────────────┐
   │ Clear localStorage   │
   │ - Remove authToken   │
   │ - Remove adminInfo   │
   └────────┬─────────────┘
            │
            ▼
   ┌──────────────────────┐
   │ Redirect to /login   │
   └──────────────────────┘
```

## Data Flow: Login Request

```
┌──────────────────────────────────────────────────────────────┐
│                    Login Data Flow                           │
└──────────────────────────────────────────────────────────────┘

Frontend                API                    Database
────────                ───                    ────────

┌──────────┐         ┌─────────┐            ┌──────────┐
│ Login    │         │ /api/   │            │ MongoDB  │
│ Form     │         │ admin/  │            │ Prisma   │
│          │         │ login   │            │          │
└────┬─────┘         └────┬────┘            └────┬─────┘
     │                    │                      │
     │ POST               │                      │
     │ {email,password}   │                      │
     ├───────────────────▶│                      │
     │                    │                      │
     │                    │ findUnique({email})  │
     │                    ├─────────────────────▶│
     │                    │                      │
     │                    │ ◀────────────────────┤
     │                    │  Return admin record │
     │                    │                      │
     │                    │ bcrypt.compare()     │
     │                    │ (password validation)│
     │                    │                      │
     │                    │ jwt.sign()           │
     │                    │ (generate token)     │
     │                    │                      │
     │ ◀──────────────────┤                      │
     │ {success, token,   │                      │
     │  admin}            │                      │
     │                    │                      │
     │ Store in           │                      │
     │ localStorage       │                      │
     │                    │                      │
     │ Navigate to        │                      │
     │ /dashboard         │                      │
     │                    │                      │
```

## Component Hierarchy

```
┌────────────────────────────────────────────────┐
│              app/layout.tsx                    │
│              (Root Layout)                     │
└─────────────────┬──────────────────────────────┘
                  │
                  ▼
      ┌───────────────────────────┐
      │   admin/layout.tsx        │
      │   (Conditional Nav/Footer)│
      └─────────┬─────────────────┘
                │
        ┌───────┴──────────────────┐
        │                          │
        ▼                          ▼
┌───────────────┐         ┌─────────────────┐
│ admin/login/  │         │ admin/dashboard/│
│ page.tsx      │         │ page.tsx        │
│               │         │                 │
│ - Login form  │         │ - useAuth()     │
│ - Error msg   │         │ - Stats cards   │
│ - Submit      │         │ - Logout btn    │
└───────────────┘         └─────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────┐
│            Security Implementation              │
└─────────────────────────────────────────────────┘

Layer 1: Password Storage
─────────────────────────
├─ bcrypt hashing (10 rounds)
├─ Never store plain text
└─ Salt automatically included

Layer 2: JWT Tokens
───────────────────
├─ Signed with JWT_SECRET
├─ Contains: id, email, name, role
├─ Expires in 7 days
└─ Verified on every request

Layer 3: Client-side Protection
────────────────────────────────
├─ useAuth hook checks authentication
├─ Auto-redirect if no token
├─ Token verification before rendering
└─ Logout clears all stored data

Layer 4: Server-side Validation
────────────────────────────────
├─ Token signature verification
├─ Token expiry check
├─ Database user lookup
└─ Generic error messages

Layer 5: Transport Security
───────────────────────────
├─ Use HTTPS in production
├─ Bearer token in Authorization header
└─ Secure cookie options (future)
```

## File Relationships

```
useAuth.ts ───────────────┐
     │                    │
     │                    │ Used by
     ▼                    ▼
dashboard/page.tsx    (any protected page)
     │
     │ Calls
     ▼
/api/admin/verify ────────┐
                          │
                          │ Uses
                          ▼
                    JWT verification
                          │
                          ▼
                     JWT_SECRET


login/page.tsx
     │
     │ Calls
     ▼
/api/admin/login ─────────┐
     │                    │
     │ Uses              │ Uses
     ▼                    ▼
Prisma Client        bcrypt + JWT
     │
     │ Queries
     ▼
MongoDB (Admin collection)
```

This visual overview helps understand how all components work together!
