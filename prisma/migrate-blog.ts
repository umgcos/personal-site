import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const prisma = new PrismaClient()
const blogDir = path.join(process.cwd(), 'content/blog')

async function main() {
  if (!fs.existsSync(blogDir)) {
    console.log('No content/blog directory found, skipping migration')
    return
  }

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))
  console.log(`Found ${files.length} MDX files to migrate`)

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '')
    const filePath = path.join(blogDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (existing) {
      console.log(`  Skipping ${slug} (already exists)`)
      continue
    }

    await prisma.blogPost.create({
      data: {
        title: data.title || slug,
        slug,
        content,
        excerpt: data.description || content.slice(0, 200) + '...',
        tags: data.tags || [],
        published: true,
        createdAt: data.date ? new Date(data.date) : new Date(),
      },
    })
    console.log(`  Migrated: ${slug}`)
  }

  const defaultConfig: Record<string, string> = {
    site_name: 'DayDreamerrrrr',
    site_title: 'DayDreamerrrrr | YuChen Wang',
    site_description: 'Qufu Normal University ACM Team',
    hero_name: 'YuChen Wang',
    hero_subtitle: 'DayDreamerrrrr | ACM Team | CS',
    hero_bio: 'Student at Qufu Normal University.',
    school: 'Qufu Normal University',
    major: 'Computer Science',
    grade: '2025 - 2029',
    role: 'ACM Team Member',
    github_url: 'https://github.com/umgcos',
    github_username: 'umgcos',
    email: '3130727798@qq.com',
    codeforces_username: '',
    leetcode_username: '',
  }

  console.log('Seeding site config...')
  for (const [key, value] of Object.entries(defaultConfig)) {
    await prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  }
  console.log('Site config seeded')
  console.log('Migration complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
