# ATC Client Hub

A modern Next.js 14 application that combines a marketing landing page, a lightweight CRM dashboard, and an automation workflow for handling new client inquiries. Visitors can explore the product, submit the "Sign Up Now" form, and every submission is stored in MongoDB and forwarded via Resend email so your team never misses a lead. The dashboard lets you review, filter, update, and manage the same dataset in real time.

## Features

- **Marketing landing page** with hero, feature highlights, and responsive design built with Tailwind CSS + shadcn/ui components.
- **Validated contact form** powered by Next.js server actions + Zod that persists signups to MongoDB.
- **Email automation** using Resend; each successful submission triggers a notification email.
- **Client management dashboard** where you can add, edit, delete, and filter clients by project type or status.
- **RESTful API routes** (`/api/clients` + `/api/clients/[id]`) that back the dashboard actions and can be reused by other surfaces.

## Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- [MongoDB](https://www.mongodb.com/) for data persistence
- [Resend](https://resend.com/) for transactional email notifications

## Getting Started

### Prerequisites

- Node.js **18.17+** (Next.js 14 requirement)
- npm **10+** (ships with Node 18)
- A MongoDB instance (local Compass, Docker, or Atlas cluster)
- A Resend account + API key (or update the email helper to your preferred provider)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/mrvishalg2004/ATC-Client-Hub.git
cd ATC-Client-Hub

# 2. Install dependencies
npm install

# 3. Copy the env template
cp .env.example .env.local

# 4. Update .env.local with your values (see below)

# 5. Run the dev server
npm run dev
```

Visit `http://localhost:3000` for the landing page and `http://localhost:3000/dashboard` for the management UI.

### Environment Variables

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | Connection string pointing to your MongoDB deployment (e.g., `mongodb://localhost:27017/ats`). |
| `MONGODB_DB_NAME` | Database name that stores the `clients` collection. |
| `RESEND_API_KEY` | Resend secret key used to send notification emails. |
| `NOTIFICATION_FROM_EMAIL` | Verified sender (default fallback: `ATC Client Hub <onboarding@resend.dev>`). |
| `NOTIFICATION_EMAIL` | Recipient address that should receive signup alerts. |

> **Resend note:** The sandbox sender (`onboarding@resend.dev`) works out of the box for testing, but production domains must be added and verified within the Resend dashboard before use.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts Next.js in development mode with hot reload. |
| `npm run build` | Produces the production build (`.next/`). |
| `npm run start` | Runs the compiled app in production mode. |
| `npm run lint` | Runs ESLint with the Next.js config. |

## Architecture Notes

- **Server Actions:** `lib/actions.ts` hosts the `submitContactForm` action. It validates inputs via Zod, writes to MongoDB using `lib/db.ts`, and then calls `sendSignupNotification`.
- **API Routes:** Dashboard CRUD flows rely on `/api/clients` for list/create and `/api/clients/[id]` for update/delete. Both reuse the shared schemas from `lib/schemas.ts`.
- **UI Components:** Common primitives live under `components/ui/` (generated via shadcn/ui). Landing and dashboard-specific components live in their respective folders.

## Deployment Checklist

1. Provision production-ready MongoDB (Atlas or managed cluster).
2. Add/verify a sending domain in Resend and update `NOTIFICATION_FROM_EMAIL` + `NOTIFICATION_EMAIL` in your hosted environment.
3. Configure your hosting platform (Vercel recommended) with the environment variables above.
4. `npm run build && npm run start` locally to confirm everything works before pushing.

## Testing the Automation

1. Ensure MongoDB and Resend env vars are configured.
2. Run `npm run dev` and submit the form on the landing page.
3. Check MongoDB Compass (database `ats`, collection `clients`) to confirm the document was created.
4. Verify that the configured `NOTIFICATION_EMAIL` inbox received the Resend email. If not, inspect the terminal logs for `Failed to send signup notification` errors.

## Troubleshooting

- **GitHub rejects large files:** `node_modules` and `.next` are ignored via `.gitignore`; if you previously committed them, run `git rm -r --cached node_modules .next` and recommit.
- **Email not sending:** Confirm your Resend API key, verified sender, and that you restarted the dev server after editing `.env.local`.
- **MongoDB connection errors:** Make sure your local MongoDB/Atlas cluster is running and that your IP is whitelisted (for Atlas).

Feel free to open issues or PRs if you spot bugs or have suggestions. Happy shipping! 🎉
