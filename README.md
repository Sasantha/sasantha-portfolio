# Sasantha Portfolio

Next.js App Router portfolio with a Supabase-backed Projects CMS and protected `/admin` dashboard.

## Environment Variables

Create `.env.local` with:

```env
DATABASE_URL=postgresql://...pooled-connection...
ADMIN_PASSWORD=your_admin_password
AUTH_SECRET=long_random_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
SUPABASE_STORAGE_BUCKET=project-covers
```

## Database Setup

```bash
npm run db:seed
```

## Run Locally

```bash
npm i
npm run dev
```

## Admin CMS

- `/admin/login` for password login
- `/admin` dashboard list
- `/admin/projects/new` create
- `/admin/projects/[id]/edit` edit/delete

## Vercel Environment Setup

Set these variables in Vercel Project Settings:

- `DATABASE_URL` -> Supabase pooled connection string (runtime)
- `ADMIN_PASSWORD` -> admin login password
- `AUTH_SECRET` -> long random secret used for signed cookie token
- `NEXT_PUBLIC_SITE_URL` -> production URL (`https://sasantha-portfolio.vercel.app`)
- `NEXT_PUBLIC_SUPABASE_URL` -> `https://<project-ref>.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` -> Supabase service role key (server-side only)
- `SUPABASE_STORAGE_BUCKET` -> storage bucket name for project cover uploads (default: `project-covers`)

## Project Cover Uploads

Admin CMS supports direct image uploads for `coverImageUrl`.

Requirements:

1. Create a Supabase Storage bucket (recommended name: `project-covers`).
2. Set bucket visibility to `public` (so uploaded cover URLs can be rendered on the site).
3. Set `SUPABASE_STORAGE_BUCKET` in environment variables (optional if using `project-covers`).

## Supabase RLS Policies

Apply policy SQL from:

- `supabase/rls-projects.sql`

How to apply:

1. Open Supabase dashboard -> SQL Editor.
2. Paste `supabase/rls-projects.sql`.
3. Run the query.

What it does:

- Enables RLS on the projects table (`Project` or `projects`).
- Allows public read (`SELECT`) for `anon` and `authenticated`.
- Does not allow public writes (no INSERT/UPDATE/DELETE policies for anon/authenticated).

Write operations should happen only through server routes using `SUPABASE_SERVICE_ROLE_KEY`.
