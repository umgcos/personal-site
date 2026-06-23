import { Github, Code2, Trophy, Activity } from 'lucide-react'

export function StatsBar() {
  return (
    <section className="border-t border-border">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">数据概览</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem icon={<Github size={20} />} label="GitHub 贡献" value="1,200+" />
          <StatItem icon={<Code2 size={20} />} label="LeetCode 已解" value="350+" />
          <StatItem icon={<Activity size={20} />} label="CF Rating" value="1650" />
          <StatItem icon={<Trophy size={20} />} label="竞赛奖项" value="5" />
        </div>
      </div>
    </section>
  )
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="text-center p-6 rounded-xl border border-border bg-card">
      <div className="flex justify-center mb-2 text-muted-foreground">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  )
}
