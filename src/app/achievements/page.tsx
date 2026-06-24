import { prisma } from '@/lib/prisma'
import { Trophy, Medal } from 'lucide-react'
import { format } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '竞赛成绩' }

export default async function AchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { date: 'desc' },
  }).catch(() => [])

  const acm = achievements.filter(a => a.competition === 'ACM-ICPC')
  const lanqiao = achievements.filter(a => a.competition === '蓝桥杯')

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="tracking-tight">竞赛成绩</h1>
        <p className="text-muted-foreground mt-2">竞赛经历与获奖记录。</p>
      </div>

      {achievements.length === 0 ? (
        <p className="text-center text-muted-foreground py-16 animate-fade-in">暂无竞赛记录。</p>
      ) : (
        <>
          {acm.length > 0 && (
            <div className="mb-12 animate-fade-in-up stagger-1">
              <h2 className="flex items-center gap-2 mb-6 tracking-tight">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-primary">
                  <Trophy size={18} />
                </span>
                ACM-ICPC
              </h2>
              <div className="space-y-4">
                {acm.map(a => <AchievementItem key={a.id} achievement={a} />)}
              </div>
            </div>
          )}

          {lanqiao.length > 0 && (
            <div className="animate-fade-in-up stagger-2">
              <h2 className="flex items-center gap-2 mb-6 tracking-tight">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-primary">
                  <Medal size={18} />
                </span>
                蓝桥杯
              </h2>
              <div className="space-y-4">
                {lanqiao.map(a => <AchievementItem key={a.id} achievement={a} />)}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}

function AchievementItem({ achievement }: { achievement: any }) {
  const awardColors: Record<string, string> = {
    '金牌': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    '银牌': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    '铜牌': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    '一等奖': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    '二等奖': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    '三等奖': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  }

  return (
    <div className="card p-5 flex items-start gap-4">
      <div className="flex-shrink-0 w-1.5 h-full min-h-[48px] rounded-full bg-gradient-to-b from-primary to-primary/30" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-bold tracking-tight">{achievement.title}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${awardColors[achievement.award] || 'bg-muted'}`}>
            {achievement.award}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          {achievement.level} | {achievement.category} | {format(new Date(achievement.date), 'yyyy年MM月')}
          {achievement.location && ` | ${achievement.location}`}
          {achievement.rank && ` | 第${achievement.rank} 名`}
        </div>
        {achievement.description && (
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{achievement.description}</p>
        )}
      </div>
    </div>
  )
}
