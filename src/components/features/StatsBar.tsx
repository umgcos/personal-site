import { Github, Code2, Trophy, Activity } from 'lucide-react'
import { prisma } from '@/lib/prisma'

const defaults = {
  github: { publicRepos: 24, totalStars: 156 },
  leetcode: { totalSolved: 350 },
  codeforces: { currentRating: 1650 },
}

async function getConfig(key: string, fallback: any) {
  try {
    const config = await prisma.siteConfig.findUnique({ where: { key } })
    return config ? config.value : fallback
  } catch {
    return fallback
  }
}

export async function StatsBar() {
  const [gh, lc, cf] = await Promise.all([
    getConfig('playground_github', defaults.github),
    getConfig('playground_leetcode', defaults.leetcode),
    getConfig('playground_codeforces', defaults.codeforces),
  ])

  const stats = [
    { icon: <Github size={20} />, label: 'GitHub Stars', value: String(gh.totalStars ?? 0) },
    { icon: <Code2 size={20} />, label: 'LeetCode 已解', value: String(lc.totalSolved ?? 0) },
    { icon: <Activity size={20} />, label: 'CF Rating', value: String(cf.currentRating ?? 0) },
    { icon: <Trophy size={20} />, label: '竞赛奖项', value: '5' },
  ]

  return (
    <section className="border-t border-border bg-surface/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold mb-10 text-center tracking-tight">数据概览</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div key={stat.label}
              className="card p-6 text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-primary mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
