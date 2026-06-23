import { prisma } from '@/lib/prisma'
import { BarChart3, MessageSquare, FolderKanban, Trophy } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [projectCount, achievementCount, messageCount, pendingCount, visitCount] = await Promise.all([
    prisma.project.count().catch(() => 0),
    prisma.achievement.count().catch(() => 0),
    prisma.message.count({ where: { approved: true } }).catch(() => 0),
    prisma.message.count({ where: { approved: false } }).catch(() => 0),
    prisma.visit.count().catch(() => 0),
  ])

  const cards = [
    { label: '项目总数', value: projectCount, icon: FolderKanban, color: 'text-blue-500' },
    { label: '竞赛记录', value: achievementCount, icon: Trophy, color: 'text-yellow-500' },
    { label: '已审核留言', value: messageCount, icon: MessageSquare, color: 'text-green-500' },
    { label: '待审核留言', value: pendingCount, icon: MessageSquare, color: 'text-orange-500' },
    { label: '总访问量', value: visitCount, icon: BarChart3, color: 'text-purple-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">仪表盘</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="p-5 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{card.label}</span>
                <Icon size={18} className={card.color} />
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
