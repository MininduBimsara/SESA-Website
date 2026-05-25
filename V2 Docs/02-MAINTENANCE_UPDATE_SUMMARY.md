# Project Maintenance Summary: Documentation Migration & Dependency Updates

This document summarizes the recent project maintenance activities, specifically focusing on organizing project documentation and updating npm dependencies.

## 1. Documentation Migration

To improve project structure and reduce clutter in the root directory, all supplementary documentation files have been relocated.

*   **Created Directory**: A new `docs/` directory was created at the project root.
*   **Moved Files**: 58 `.md` documentation files (covering admin, blog, events, homepage, team, troubleshooting, etc.) were moved from the project root into the `docs/` folder.
*   **Root `README.md`**: The main `README.md` file was intentionally kept at the project root as per standard conventions.

## 2. Dependency Updates

All project dependencies and `devDependencies` in `package.json` were audited and updated to their latest available versions on npm.

### Major Upgrades
Several packages underwent major version bumps:
*   `next`: `^9.3.3` ➡️ `^16.2.6` (Fixed an issue where `npm audit fix --force` had downgraded Next.js).
*   `@prisma/client` & `prisma`: `^6.15.0` ➡️ `^7.8.0`
*   `lucide-react`: `^0.542.0` ➡️ `^1.16.0`
*   `react-datepicker`: `^8.7.0` ➡️ `^9.1.0`
*   `@types/node`: `^20` ➡️ `^25.9.1`
*   `typescript`: `^5` ➡️ `^6.0.3`
*   `eslint-config-next`: `15.3.2` ➡️ `^16.2.6`

### Minor & Patch Upgrades
*   `@tiptap/*` packages: Updated from `^3.6.6` to `^3.23.6`
*   `framer-motion`: Updated from `^12.23.22` to `^12.40.0`
*   `tailwind-merge`: Updated from `^3.3.1` to `^3.6.0`
*   `react` / `react-dom`: Updated to `^19.2.6`

### Cleanups and Conflict Resolutions
*   **Removed Deprecated Types**: Uninstalled `@types/bcryptjs` and `@types/react-datepicker`. These were deprecated stub packages because the main `bcryptjs` and `react-datepicker` packages now include their own TypeScript definitions.
*   **ESLint Compatibility**: Downgraded `eslint` from `^10.4.0` to `^9.39.4`. This was necessary to resolve peer dependency conflicts, as plugins used by `eslint-config-next` (like `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, and `eslint-plugin-react`) currently only support ESLint v9.

> [!NOTE]
> There is a lingering warning (`EBADENGINE`) during `npm install` for `@prisma/streams-local` which requires Node.js `>=22.0.0`. The current environment uses Node v20. This is non-critical, but consider upgrading Node.js to v22+ in the future to fully support Prisma 7's streaming features.
