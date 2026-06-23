import { prisma } from './prisma'

const defaults: Record<string, string> = {
  site_name: 'DayDreamerrrrr',
  site_title: 'DayDreamerrrrr | YuChen Wang',
  site_description: '曲阜师范大学 ACM 集训队成员 | 热爱算法与竞赛编程',
  hero_name: 'YuChen Wang',
  hero_subtitle: 'DayDreamerrrrr | ACM 集训队成员 | 计算机科学与技术',
  hero_bio: '曲阜师范大学大一学生，热爱算法与竞赛编程。享受用代码解决问题的过程，正在 ACM 集训队中不断磨练自己的思维能力。对系统设计和工程实践同样充满兴趣。',
  school: '曲阜师范大学',
  major: '计算机科学与技术',
  grade: '2025 - 2029',
  role: 'ACM 集训队成员',
  github_url: 'https://github.com/umgcos',
  github_username: 'umgcos',
  email: '3130727798@qq.com',
  codeforces_username: '',
  leetcode_username: '',
}

export async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const configs = await prisma.siteConfig.findMany()
    const result = { ...defaults }
    for (const c of configs) {
      if (typeof c.value === 'string') {
        result[c.key] = c.value
      }
    }
    return result
  } catch {
    return defaults
  }
}

export async function getConfig(key: string): Promise<string> {
  try {
    const config = await prisma.siteConfig.findUnique({ where: { key } })
    if (config && typeof config.value === 'string') return config.value
    return defaults[key] || ''
  } catch {
    return defaults[key] || ''
  }
}
