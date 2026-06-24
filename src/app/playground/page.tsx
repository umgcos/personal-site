import { prisma } from '@/lib/prisma'
import { PlaygroundClient } from '@/components/features/PlaygroundClient'

const defaults = {
  leetcode: {
    totalSolved: 350,
    ranking: 'Top 8%',
    streak: 45,
    easySolved: 150,
    easyTotal: 800,
    mediumSolved: 140,
    mediumTotal: 1700,
    hardSolved: 60,
    hardTotal: 800,
  },
  codeforces: {
    currentRating: 1650,
    currentRank: 'Expert',
    maxRating: 1720,
    maxRank: 'Expert',
  },
  github: {
    publicRepos: 24,
    totalStars: 156,
  },
}

async function getConfig(key: string, fallback: any) {
  try {
    const config = await prisma.siteConfig.findUnique({ where: { key } })
    return config ? config.value : fallback
  } catch {
    return fallback
  }
}

export default async function PlaygroundPage() {
  const [leetcode, codeforces, github] = await Promise.all([
    getConfig('playground_leetcode', defaults.leetcode),
    getConfig('playground_codeforces', defaults.codeforces),
    getConfig('playground_github', defaults.github),
  ])

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">竞技场</h1>
      <p className="text-muted-foreground mb-8">竞赛编程数据与编码活动统计。</p>

      <PlaygroundClient
        leetcode={leetcode}
        codeforces={codeforces}
        github={github}
      />
    </section>
  )
}
