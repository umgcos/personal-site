<div align="center">

# DayDreamerrrrr

**A modern personal website · ACM competitor · Full-stack built**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E5A0?logo=neon)](https://neon.tech/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com/)

<br />

<!-- Add your screenshots here -->
<!-- ![Home](./docs/screenshots/home.png) -->
<!-- ![Blog](./docs/screenshots/blog.png) -->
<!-- ![Admin](./docs/screenshots/admin.png) -->

</div>

---

## Highlights

- **ACM Competition Showcase** — Track and display ACM-ICPC, Lanqiao Cup, and other contest achievements with ranks, medals, and detailed records
- **MDX Blog System** — Write posts in Markdown with code highlighting, tags, full-text search, and admin management
- **Admin Dashboard** — Full CRUD for all content: blog posts, projects, achievements, skills, guestbook moderation, and site analytics
- **Playground** — Live sync of GitHub contributions, LeetCode stats, and Codeforces ratings
- **Interactive Skill Tree** — Visual skill progression with categories: languages, frameworks, tools, and CS fundamentals
- **Guestbook** — Visitor messages with admin moderation and reply threading

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, RSC, Server Actions) |
| Language | TypeScript 5 |
| Styling | TailwindCSS 4 |
| Database | PostgreSQL (Neon serverless) |
| ORM | Prisma 6 |
| Auth | Custom JWT (jose) |
| Blog | MDX + rehype-pretty-code + Shiki |
| Charts | Recharts |
| Icons | Lucide React |

## Quick Start

### Prerequisites

- Node.js 18+
- A PostgreSQL database ([Neon](https://neon.tech) recommended, free tier available)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/personal-site.git
cd personal-site
npm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values. See [.env.example](./.env.example) for detailed comments on each variable.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | Random string for JWT signing (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Yes | Site URL (`http://localhost:3000` for dev) |
| `ADMIN_EMAIL` | Yes | Admin login email |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `GITHUB_TOKEN` | Optional | GitHub personal access token for activity sync |
| `GITHUB_USERNAME` | Optional | Your GitHub username |
| `LEETCODE_USERNAME` | Optional | Your Leetcode username |
| `CODEFORCES_USERNAME` | Optional | Your Codeforces handle |

### Database Setup

```bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed admin user + sample data
npm run db:seed

# (Optional) Migrate MDX blog posts to database
npm run db:migrate-blog
```

### Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — Admin panel at [/admin](http://localhost:3000/admin).

## Neon Database Setup

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project and copy the connection string
3. Paste it as `DATABASE_URL` in `.env.local`:
   ```
   DATABASE_URL="postgresql://user:password@ep-xxx.pooler.us-east-1.aws.neon.tech/dbname?sslmode=require"
   ```
4. Run `npx prisma db push` to create tables
5. Run `npm run db:seed` to initialize data

> Neon provides a generous free tier with 0.5 GB storage, perfect for personal projects.

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set the environment variables in Vercel dashboard (same as `.env.local`)
4. Deploy!

> **Important**: Add your Vercel domain to `NEXTAUTH_URL` after deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/personal-site)

## Project Structure

```
personal-site/
├── content/blog/          # MDX blog posts
├── docs/                  # Documentation & screenshots
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Seed script
│   └── migrate-blog.ts     # MDX to DB migration
├── public/                # Static assets
├── src/
│   ├── app/
│   │   ├── admin/            # Admin dashboard
│   │   ├── api/              # API routes
│   │   ├── blog/             # Blog pages
│   │   ├── achievements/     # Competition records
│   │   ├── projects/         # Project showcase
│   │   ├── playground/       # External stats
│   │   ├── guestbook/        # Visitor messages
│   │   └── about/            # Personal intro
│   ├── components/         # Shared components
│   ├── lib/                # Utilities & config
│   └── middleware.ts        # Auth middleware
├── .env.example           # Environment template
├── package.json
└── tsconfig.json
```

## Content Management

### Blog Posts

Add `.mdx` files to `content/blog/`:

```mdx
---
title: Your Post Title
date: 2026-06-22
description: A brief description.
tags: [algorithms, cpp]
---

Your content here with **Markdown** and `code` blocks.
```

### Admin Panel

Access `/admin` to manage:
- Blog posts (CRUD + publish toggle)
- Projects (with tech stack, links, featured flag)
- Achievements (competition records)
- Skills (interactive tree editor)
- Guestbook (moderation + replies)
- Site analytics (page views, visitors)
- External data sync (GitHub, LeetCode, Codeforces)

## ACM Competition Features

This site is designed to showcase competitive programming achievements:

- **Competition Timeline** — Chronological view of all contests
- **Medal Gallery** — Visual display with award levels and ranks
- **Category Filtering** — Filter by ACM-ICPC, Lanqiao Cup, CCPC, etc.
- **Detailed Records** — Location, year, team/individual, and descriptions

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:seed` | Seed database |
| `npm run db:migrate-blog` | Migrate MDX posts to DB |

## License

MIT
