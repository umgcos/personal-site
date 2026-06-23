import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const visits = await prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  }).catch(() => [])

  const totalVisits = await prisma.visit.count().catch(() => 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayVisits = await prisma.visit.count({ where: { createdAt: { gte: today } } }).catch(() => 0)

  const topPaths = await prisma.visit.groupBy({
    by: ['path'],
    _count: { path: true },
    orderBy: { _count: { path: 'desc' } },
    take: 10,
  }).catch(() => [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">访问统计</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-5 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">总访问量</p>
          <p className="text-2xl font-bold">{totalVisits}</p>
        </div>
        <div className="p-5 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">今日访问</p>
          <p className="text-2xl font-bold">{todayVisits}</p>
        </div>
      </div>

      {topPaths.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold mb-3">热门页面</h2>
          <div className="space-y-2">
            {topPaths.map(p => (
              <div key={p.path} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <span className="text-sm font-mono">{p.path}</span>
                <span className="text-sm text-muted-foreground">{p._count.path} 次访问</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="font-semibold mb-3">最近访问</h2>
      <div className="space-y-2">
        {visits.map(v => (
          <div key={v.id} className="flex items-center justify-between p-3 rounded-lg border border-border text-sm">
            <span className="font-mono">{v.path}</span>
            <span className="text-muted-foreground">{format(new Date(v.createdAt), 'MM/dd HH:mm')}</span>
          </div>
        ))}
        {visits.length === 0 && <p className="text-muted-foreground text-center py-8">暂无访问记录。</p>}
      </div>
    </div>
  )
}
