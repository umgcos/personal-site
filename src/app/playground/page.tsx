'use client'

import { useState } from 'react'
import { Code2, Activity, Github } from 'lucide-react'

type Tab = 'leetcode' | 'codeforces' | 'github'

export default function PlaygroundPage() {
  const [tab, setTab] = useState<Tab>('leetcode')

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'leetcode', label: 'LeetCode', icon: <Code2 size={16} /> },
    { id: 'codeforces', label: 'Codeforces', icon: <Activity size={16} /> },
    { id: 'github', label: 'GitHub', icon: <Github size={16} /> },
  ]

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">竞技场</h1>
      <p className="text-muted-foreground mb-8">竞赛编程数据与编码活动统计。</p>

      <div className="flex gap-2 mb-8">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === 'leetcode' && <LeetCodePanel />}
      {tab === 'codeforces' && <CodeforcesPanel />}
      {tab === 'github' && <GitHubPanel />}
    </section>
  )
}

function LeetCodePanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">总解题数</h3>
        <p className="text-3xl font-bold">350</p>
      </div>
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">排名</h3>
        <p className="text-3xl font-bold">Top 8%</p>
      </div>
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">连续打卡</h3>
        <p className="text-3xl font-bold">45 天</p>
      </div>
      <div className="col-span-full p-6 rounded-xl border border-border">
        <h3 className="font-semibold mb-4">难度分布</h3>
        <div className="space-y-3">
          <DifficultyBar label="简单" solved={150} total={800} color="bg-green-500" />
          <DifficultyBar label="中等" solved={140} total={1700} color="bg-yellow-500" />
          <DifficultyBar label="困难" solved={60} total={800} color="bg-red-500" />
        </div>
      </div>
    </div>
  )
}

function DifficultyBar({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const pct = Math.round((solved / total) * 100)
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-sm text-muted-foreground">{label}</span>
      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-medium w-20 text-right">{solved}/{total}</span>
    </div>
  )
}

function CodeforcesPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">当前 Rating</h3>
        <p className="text-3xl font-bold">1650</p>
        <p className="text-sm text-muted-foreground">Expert</p>
      </div>
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">最高 Rating</h3>
        <p className="text-3xl font-bold">1720</p>
        <p className="text-sm text-muted-foreground">Expert</p>
      </div>
      <div className="col-span-full p-6 rounded-xl border border-border">
        <h3 className="font-semibold mb-4">Rating 变化趋势</h3>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          连接 Codeforces API 后将展示 Rating 变化图表。
        </div>
      </div>
    </div>
  )
}

function GitHubPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">公开仓库</h3>
        <p className="text-3xl font-bold">24</p>
      </div>
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">总 Stars</h3>
        <p className="text-3xl font-bold">156</p>
      </div>
      <div className="col-span-full p-6 rounded-xl border border-border">
        <h3 className="font-semibold mb-4">贡献日历</h3>
        <div className="h-32 flex items-center justify-center text-muted-foreground">
          连接 GitHub API 后将展示贡献日历图。
        </div>
      </div>
    </div>
  )
}
