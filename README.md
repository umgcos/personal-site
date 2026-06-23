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

<details>
<summary>🇬🇧 <b>English</b></summary>

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

</details>

---

<details>
<summary>🇨🇳 <b>中文</b></summary>

## 项目亮点

- **ACM 竞赛展示** — 展示 ACM-ICPC、蓝桥杯等竞赛成绩，包含排名、奖牌和详细记录
- **MDX 博客系统** — Markdown 写作，支持代码高亮、标签分类、全文搜索和后台管理
- **后台管理** — 全内容 CRUD：博文、项目、成就、技能树、留言板审核、站点统计
- **Playground** — 实时同步 GitHub 贡献、LeetCode 统计和 Codeforces 评分
- **交互式技能树** — 可视化技能进度，涵盖语言、框架、工具和计算机基础
- **留言板** — 访客留言 + 管理员审核 + 回复功能

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router, RSC, Server Actions) |
| 语言 | TypeScript 5 |
| 样式 | TailwindCSS 4 |
| 数据库 | PostgreSQL (Neon 无服务器) |
| ORM | Prisma 6 |
| 认证 | Custom JWT (jose) |
| 博客 | MDX + rehype-pretty-code + Shiki |
| 图表 | Recharts |
| 图标 | Lucide React |

## 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 数据库（推荐 [Neon](https://neon.tech)，有免费颕）

### 安装

```bash
git clone https://github.com/YOUR_USERNAME/personal-site.git
cd personal-site
npm install
```

### 环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local` 填入你的值，详见 [.env.example](./.env.example) 中的注释说明。

| 变量 | 必须 | 说明 |
|------|------|------|
| `DATABASE_URL` | 是 | Neon PostgreSQL 连接字符串 |
| `NEXTAUTH_SECRET` | 是 | JWT 签名密钥（`openssl rand -base64 32` 生成）|
| `NEXTAUTH_URL` | 是 | 站点 URL（开发环境为 `http://localhost:3000`）|
| `ADMIN_EMAIL` | 是 | 管理员邮箱 |
| `ADMIN_PASSWORD` | 是 | 管理员密码 |
| `GITHUB_TOKEN` | 否 | GitHub Token，用于活动同步 |
| `GITHUB_USERNAME` | 否 | GitHub 用户名 |
| `LEETCODE_USERNAME` | 否 | LeetCode 用户名 |
| `CODEFORCES_USERNAME` | 否 | Codeforces ID |

### 数据库初始化

```bash
# 推送 Schema 到数据库
npx prisma db push

# 生成 Prisma Client
npx prisma generate

# 种子数据（管理员 + 示例数据）
npm run db:seed

# （可选）将 MDX 博客迁移到数据库
npm run db:migrate-blog
```

### 启动开发

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) — 后台管理在 [/admin](http://localhost:3000/admin)。

## Neon 数据库配置

1. 在 [neon.tech](https://neon.tech) 注册免费账号
2. 创建项目，复制连接字符串
3. 粘贴到 `.env.local` 的 `DATABASE_URL` 中：
   ```
   DATABASE_URL="postgresql://user:password@ep-xxx.pooler.us-east-1.aws.neon.tech/dbname?sslmode=require"
   ```
4. 执行 `npx prisma db push` 创建表
5. 执行 `npm run db:seed` 初始化数据

> Neon 提供 0.5 GB 免费存储，足够个人项目使用。

## 部署到 Vercel

1. 推送代码到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入仓库
3. 在 Vercel 控制台设置环境变量（与 `.env.local` 相同）
4. 部署！

> **重要**：部署后请将 Vercel 域名添加到 `NEXTAUTH_URL`。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/personal-site)

## 项目结构

```
personal-site/
├── content/blog/          # MDX 博文
├── docs/                  # 文档与截图
├── prisma/
│   ├── schema.prisma        # 数据库 Schema
│   ├── seed.ts              # 种子脚本
│   └── migrate-blog.ts     # MDX 迁移
├── public/                # 静态资源
├── src/
│   ├── app/
│   │   ├── admin/            # 后台管理
│   │   ├── api/              # API 路由
│   │   ├── blog/             # 博客页面
│   │   ├── achievements/     # 竞赛成就
│   │   ├── projects/         # 项目展示
│   │   ├── playground/       # 外部统计
│   │   ├── guestbook/        # 留言板
│   │   └── about/            # 个人简介
│   ├── components/         # 组件
│   ├── lib/                # 工具与配置
│   └── middleware.ts        # 认证中间件
├── .env.example           # 环境变量模板
├── package.json
└── tsconfig.json
```

## 内容管理

### 博客

在 `content/blog/` 中添加 `.mdx` 文件：

```mdx
---
title: 博文标题
date: 2026-06-22
description: 简要描述。
tags: [algorithms, cpp]
---

这里写内容，支持 **Markdown** 和 代码块。
```

### 后台管理

访问 `/admin` 管理：
- 博文（增删改查 + 发布开关）
- 项目（技术栈、链接、置顶）
- 成就（竞赛记录）
- 技能树（交互式编辑）
- 留言板（审核 + 回复）
- 站点统计（访问量、访客）
- 外部数据同步（GitHub、LeetCode、Codeforces）

## ACM 竞赛功能

本站专为竞赛选手设计：

- **竞赛时间线** — 按时间顺序展示所有比赛
- **奖牌展厅** — 可视化展示奖项等级和排名
- **分类筛选** — 按 ACM-ICPC、蓝桥杯、CCPC 等分类查看
- **详细记录** — 地点、年份、团队/个人、描述

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run lint` | 快捷检查 |
| `npm run db:push` | 推送 Schema 到数据库 |
| `npm run db:generate` | 生成 Prisma Client |
| `npm run db:seed` | 种子数据库 |
| `npm run db:migrate-blog` | 迁移 MDX 博文到数据库 |

## 开源协议

MIT

</details>
