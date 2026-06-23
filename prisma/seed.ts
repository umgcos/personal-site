import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const password = await hash(process.env.ADMIN_PASSWORD || 'admin123', 12)
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || '3130727798@qq.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || '3130727798@qq.com',
      name: 'YuChen Wang',
      password,
    },
  })

  // Seed skills
  const skills = [
    { name: 'C++', category: 'language', level: 85, order: 1 },
    { name: 'Python', category: 'language', level: 70, order: 2 },
    { name: 'TypeScript', category: 'language', level: 65, order: 3 },
    { name: 'Java', category: 'language', level: 50, order: 4 },
    { name: 'Next.js', category: 'framework', level: 60, order: 1 },
    { name: 'React', category: 'framework', level: 55, order: 2 },
    { name: 'Node.js', category: 'framework', level: 50, order: 3 },
    { name: 'Git', category: 'tool', level: 80, order: 1 },
    { name: 'Docker', category: 'tool', level: 40, order: 2 },
    { name: 'Linux', category: 'tool', level: 65, order: 3 },
    { name: 'Algorithms', category: 'cs', level: 85, order: 1 },
    { name: 'Data Structures', category: 'cs', level: 80, order: 2 },
    { name: 'OS', category: 'cs', level: 55, order: 3 },
    { name: 'Networking', category: 'cs', level: 45, order: 4 },
  ]

  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }

  // Seed sample project
  await prisma.project.create({
    data: {
      title: 'Personal Site',
      description: '基于 Next.js、TypeScript、TailwindCSS 构建的现代化个人主页。',
      techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Prisma'],
      githubUrl: 'https://github.com/umgcos/personal-site',
      featured: true,
      sortOrder: 1,
    },
  })

  // Seed sample achievement
  await prisma.achievement.create({
    data: {
      title: 'ACM-ICPC 区域赛',
      competition: 'ACM-ICPC',
      category: '团体赛',
      level: '国家级',
      award: '银牌',
      rank: 23,
      date: new Date('2025-11-01'),
      location: 'Nanjing',
      description: 'ACM-ICPC Asia Nanjing Regional Contest',
      year: 2025,
    },
  })

  console.log('Seed completed')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
