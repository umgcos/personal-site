'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

const defaultData: PlaygroundData = {
  playground_leetcode: {
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
  playground_codeforces: {
    currentRating: 1650,
    currentRank: 'Expert',
    maxRating: 1720,
    maxRank: 'Expert',
  },
  playground_github: {
    publicRepos: 24,
    totalStars: 156,
  },
}

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

type PlaygroundData = {
  playground_leetcode: LeetCodeData
  playground_codeforces: CodeforcesData
  playground_github: GitHubData
}

export default function AdminPlaygroundPage() {
  const [form, setForm] = useState<PlaygroundData>(defaultData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/admin/playground').then(r => r.json()).then(data => {
      setForm(prev => ({ ...prev, ...data }))
      setLoading(false)
    })
  }, [])

  async function handleSave() {
    setSaving(true)
    setMsg('')
    await fetch('/api/admin/playground', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setMsg('保存成功！前台刷新即可看到最新数据。')
    setTimeout(() => setMsg(''), 3000)
  }

  function updateLc(key: keyof LeetCodeData, value: string) {
    const numVal = key === 'ranking' ? value : Number(value) || 0
    setForm(f => ({ ...f, playground_leetcode: { ...f.playground_leetcode, [key]: numVal } }))
  }

  function updateCf(key: keyof CodeforcesData, value: string) {
    const numVal = key.includes('Rank') ? value : Number(value) || 0
    setForm(f => ({ ...f, playground_codeforces: { ...f.playground_codeforces, [key]: numVal } }))
  }

  function updateGh(key: keyof GitHubData, value: string) {
    setForm(f => ({ ...f, playground_github: { ...f.playground_github, [key]: Number(value) || 0 } }))
  }

  if (loading) return <p className="text-muted-foreground">加载中...</p>

  const lc = form.playground_leetcode
  const cf = form.playground_codeforces
  const gh = form.playground_github

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">竞技场管理</h1>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-50">
          <Save size={16} />
          {saving ? '保存中...' : '保存数据'}
        </button>
      </div>

      {msg && <p className="text-sm text-green-600 mb-4">{msg}</p>}

      {/* LeetCode */}
      <div className="mb-8 p-6 rounded-xl border border-border">
        <h2 className="font-semibold mb-4">LeetCode</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">总解题数</label>
            <input type="number" value={lc.totalSolved} onChange={e => updateLc('totalSolved', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">排名</label>
            <input value={lc.ranking} onChange={e => updateLc('ranking', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">连续打卡 (天)</label>
            <input type="number" value={lc.streak} onChange={e => updateLc('streak', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">难度分布</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">简单 已解/总题</label>
              <div className="flex gap-2">
                <input type="number" value={lc.easySolved} onChange={e => updateLc('easySolved', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" placeholder="已解" />
                <input type="number" value={lc.easyTotal} onChange={e => updateLc('easyTotal', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" placeholder="总题" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">中等 已解/总题</label>
              <div className="flex gap-2">
                <input type="number" value={lc.mediumSolved} onChange={e => updateLc('mediumSolved', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" placeholder="已解" />
                <input type="number" value={lc.mediumTotal} onChange={e => updateLc('mediumTotal', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" placeholder="总题" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">困难 已解/总题</label>
              <div className="flex gap-2">
                <input type="number" value={lc.hardSolved} onChange={e => updateLc('hardSolved', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" placeholder="已解" />
                <input type="number" value={lc.hardTotal} onChange={e => updateLc('hardTotal', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" placeholder="总题" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Codeforces */}
      <div className="mb-8 p-6 rounded-xl border border-border">
        <h2 className="font-semibold mb-4">Codeforces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">当前 Rating</label>
            <input type="number" value={cf.currentRating} onChange={e => updateCf('currentRating', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">当前段位</label>
            <input value={cf.currentRank} onChange={e => updateCf('currentRank', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">最高 Rating</label>
            <input type="number" value={cf.maxRating} onChange={e => updateCf('maxRating', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">最高段位</label>
            <input value={cf.maxRank} onChange={e => updateCf('maxRank', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
        </div>
      </div>

      {/* GitHub */}
      <div className="mb-8 p-6 rounded-xl border border-border">
        <h2 className="font-semibold mb-4">GitHub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">公开仓库</label>
            <input type="number" value={gh.publicRepos} onChange={e => updateGh('publicRepos', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">总 Stars</label>
            <input type="number" value={gh.totalStars} onChange={e => updateGh('totalStars', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
