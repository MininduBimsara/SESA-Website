# V2 Bug Fixes Documentation

This document contains descriptions, root causes, and applied fixes for all critical bugs resolved during the migration and stabilization of the SESA Website (V2).

---

## Table of Contents
1. [Prisma Client 'Module Not Found' Error](#1-prisma-client-module-not-found-error)
2. [Lucide React Missing Facebook/Social Icon Exports](#2-lucide-react-missing-facebooksocial-icon-exports)
3. [Next.js 15/16 Route Handler params Promisification](#3-nextjs-1516-route-handler-params-promisification)
4. [Unused KeyActivities Component Import Crash](#4-unused-keyactivities-component-import-crash)
5. [DatePicker onChange Callback Implicit Any Type](#5-datepicker-onchange-callback-implicit-any-type)
6. [Turbopack Dev Server Disk Space Compilation Crash (ENOSPC)](#6-turbopack-dev-server-disk-space-compilation-crash-enospc)
7. [Next.js Image Hostname Unconfigured Error (Vercel Blob Storage)](#7-nextjs-image-hostname-unconfigured-error-vercel-blob-storage)

---

## 1. Prisma Client 'Module Not Found' Error

### Symptom
Production and development builds failed with the following compilation error:
```text
./src/lib/prisma.ts:1:1
Module not found: Can't resolve '../generated/prisma'
> 1 | import { PrismaClient } from "../generated/prisma";
```

### Root Cause
The Prisma generator in [schema.prisma](file:///c:/Users/minin/Documents/GitHub/SESA-Website/prisma/schema.prisma) was configured to output the generated Prisma Client to a custom path:
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}
```
However, the client files had not been generated locally in that directory, leading to a compilation failure when `prisma.ts` tried to import from it.

### Solution
Ran the client generation script to generate the client files at the configured path:
```powershell
npx prisma generate
```

---

## 2. Lucide React Missing Facebook/Social Icon Exports

### Symptom
Next.js Turbopack failed to compile the navigation and footer components with errors such as:
```text
./src/components/Navbar.tsx:6:1
Export Facebook doesn't exist in target module
  6 | import { Menu, X, Facebook } from 'lucide-react'
```

### Root Cause
The version of `lucide-react` installed in the project did not export standard social icons (like `Facebook`, `Instagram`, `Twitter`, `Linkedin`, `Youtube`) in a way that could be resolved statically by Next.js Turbopack, or they were altogether missing from the package's exports.

### Solution
1. Created a dedicated custom icons component: [SocialIcons.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/components/icons/SocialIcons.tsx) to store raw, lightweight SVG components for each platform:
   - `FacebookIcon`
   - `InstagramIcon`
   - `TwitterIcon`
   - `LinkedinIcon`
   - `YoutubeIcon`
   - `GithubIcon`
2. Replaced the broken imports in [Navbar.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/components/Navbar.tsx) and `SocialLinks.tsx` with these custom SVG components.

---

## 3. Next.js 15/16 Route Handler `params` Promisification

### Symptom
TypeScript compiler errors on route parameters during the production build check:
```text
Type error: Route handler parameters must be typed as Promise and awaited in Next.js 15+ / 16.
```

### Root Cause
In Next.js 15+ and 16, dynamic route parameters (`params`) are asynchronous `Promise` objects rather than plain objects. Accessing parameters synchronously (e.g., `params.id`) throws a compilation/runtime type error.

### Solution
Updated the route handlers to type `params` as a `Promise` and awaited the parameters object before extracting properties:

**Before:**
```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  // ...
}
```

**After:**
```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // ...
}
```

**Affected Files:**
- [src/app/api/events/[id]/route.ts](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/api/events/%5Bid%5D/route.ts)
- [src/app/api/team/[id]/route.ts](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/api/team/%5Bid%5D/route.ts)

---

## 4. Unused KeyActivities Component Import Crash

### Symptom
Compilation error indicating a missing file dependency:
```text
Module not found: Can't resolve './KeyActivities' in 'src/app/(webpage)'
```

### Root Cause
The main homepage component imported `KeyActivities` from a local file that did not exist in the codebase. The imported component itself was never rendered in the file's JSX.

### Solution
Removed the unused, broken import statement in [page.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/app/(webpage)/page.tsx).

---

## 5. DatePicker onChange Callback Implicit Any Type

### Symptom
TypeScript type validation error:
```text
./src/components/admin/EventForm.tsx:460:56
Type error: Parameter 'time' implicitly has an 'any' type.
```

### Root Cause
Under strict TypeScript compiler settings (`noImplicitAny`), inline handlers for the `react-datepicker` component's `onChange` event parameter required explicit type annotations.

### Solution
Added type annotations to the `onChange` arrow functions in [EventForm.tsx](file:///c:/Users/minin/Documents/GitHub/SESA-Website/src/components/admin/EventForm.tsx):
```typescript
onChange={(time: Date | null) => handleTimeChange(time, 'startTime')}
```
and
```typescript
onChange={(time: Date | null) => handleTimeChange(time, 'endTime')}
```

---

## 6. Turbopack Dev Server Disk Space Compilation Crash (ENOSPC)

### Symptom
The dev server logs filled with rapid compiler HMR subscription errors:
```text
[Server HMR] Subscription error: TurbopackInternalError: failed to write to ... 
Caused by: - There is not enough space on the disk. (os error 112)
```

### Root Cause
The system's `C:` drive was critically low on free space (~1.25 GB left), causing Turbopack to fail when writing chunk maps and compilation cache.

### Solution
1. Terminated the locked/hung dev server Node processes.
2. Deleted the local `.next` directory to clear out the large compiler cache, reclaiming **~700 MB** of disk space (raising C: drive free space to **1.92 GB**).
3. Warned the developer to clear system space to prevent recurrence.

---

## 7. Next.js Image Hostname Unconfigured Error (Vercel Blob Storage)

### Symptom
Runtime crash and 500 error when rendering the `/team` page:
```text
Error: Invalid src prop (https://hbdrsmhmyufz3xdz.public.blob.vercel-storage.com/...) on `next/image`, hostname is not configured under images in your `next.config.js`
```

### Root Cause
Team member images were uploaded to Vercel Public Blob storage. The `hbdrsmhmyufz3xdz.public.blob.vercel-storage.com` domain was not whitelisted for remote image optimization inside `next.config.ts`.

### Solution
Updated [next.config.ts](file:///c:/Users/minin/Documents/GitHub/SESA-Website/next.config.ts) to define a remote patterns whitelist wildcard matching any subdomains of `public.blob.vercel-storage.com`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
```
After making this change, the development server was restarted to load the updated configurations.
