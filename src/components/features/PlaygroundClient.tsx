'use client'

import { useState } from 'react'
import { Code2, Activity, Github } from 'lucide-react'

type Tab = 'leetcode' | 'codeforces' | 'github'

type LeetCodeData = {
  totalSolved: number
  ranking: string
  streak: number
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
}

type CodeforcesData = {
  currentRating: number
  currentRank: string
  maxRating: number
  maxRank: string
}

type GitHubData = {
  publicRepos: number
  totalStars: number
}

type PlaygroundClientProps = {
  leetcode: LeetCodeData
  codeforces: CodeforcesData
  github: GitHubData
}

export function PlaygroundClient({ leetcode: lc, codeforces: cf, github: gh }: PlaygroundClientProps) {
  const [tab, setTab] = useState<Tab>('leetcode')

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'leetcode', label: 'LeetCode', icon: <Code2 size={16} /> },
    { id: 'codeforces', label: 'Codeforces', icon: <Activity size={16} /> },
    { id: 'github', label: 'GitHub', icon: <Github size={16} /> },
  ]

  return (
    <>
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

      {tab === 'leetcode' && <LeetCodePanel data={lc} />}
      {tab === 'codeforces' && <CodeforcesPanel data={cf} />}
      {tab === 'github' && <GitHubPanel data={gh} />}
    </>
  )
}

function LeetCodePanel({ data }: { data: LeetCodeData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">总解题数</h3>
        <p className="text-3xl font-bold">{data.totalSolved}</p>
      </div>
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">排名</h3>
        <p className="text-3xl font-bold">{data.ranking}</p>
      </div>
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">连续打卡</h3>
        <p className="text-3xl font-bold">{data.streak} 天</p>
      </div>
      <div className="col-span-full p-6 rounded-xl border border-border">
        <h3 className="font-semibold mb-4">难度分布</h3>
        <div className="space-y-3">
          <DifficultyBar label="简单" solved={data.easySolved} total={data.easyTotal} color="bg-green-500" />
          <DifficultyBar label="中等" solved={data.mediumSolved} total={data.mediumTotal} color="bg-yellow-500" />
          <DifficultyBar label="困难" solved={data.hardSolved} total={data.hardTotal} color="bg-red-500" />
        </div>
      </div>
    </div>
  )
}

function DifficultyBar({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0
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

function CodeforcesPanel({ data }: { data: CodeforcesData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">当前 Rating</h3>
        <p className="text-3xl font-bold">{data.currentRating}</p>
        <p className="text-sm text-muted-foreground">{data.currentRank}</p>
      </div>
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">最高 Rating</h3>
        <p className="text-3xl font-bold">{data.maxRating}</p>
        <p className="text-sm text-muted-foreground">{data.maxRank}</p>
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

function GitHubPanel({ data }: { data: GitHubData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">公开仓库</h3>
        <p className="text-3xl font-bold">{data.publicRepos}</p>
      </div>
      <div className="p-6 rounded-xl border border-border">
        <h3 className="text-sm text-muted-foreground mb-1">总 Stars</h3>
        <p className="text-3xl font-bold">{data.totalStars}</p>
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
