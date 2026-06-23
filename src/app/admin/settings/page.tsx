'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, Save } from 'lucide-react'

const defaultSettings = {
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

export default function AdminSettingsPage() {
  const [form, setForm] = useState(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [syncing, setSyncing] = useState<string | null>(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(data => {
      setForm(prev => ({ ...prev, ...data }))
      setLoading(false)
    })
  }, [])

  async function handleSave() {
    setSaving(true)
    setMsg('')
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setMsg('保存成功！刷新页面后生效。')
    setTimeout(() => setMsg(''), 3000)
  }

  async function sync(platform: string) {
    setSyncing(platform)
    try {
      await fetch('/api/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ platform }) })
    } finally {
      setSyncing(null)
    }
  }

  function update(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  if (loading) return <p className="text-muted-foreground">加载中...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">网站设置</h1>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-50">
          <Save size={16} />
          {saving ? '保存中...' : '保存设置'}
        </button>
      </div>

      {msg && <p className="text-sm text-green-600 mb-4">{msg}</p>}

      {/* Basic Info */}
      <div className="mb-8 p-6 rounded-xl border border-border">
        <h2 className="font-semibold mb-4">基本信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">姓名</label>
            <input value={form.hero_name} onChange={e => update('hero_name', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">副标题</label>
            <input value={form.hero_subtitle} onChange={e => update('hero_subtitle', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground mb-1 block">个人简介</label>
            <textarea value={form.hero_bio} onChange={e => update('hero_bio', e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none" />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-8 p-6 rounded-xl border border-border">
        <h2 className="font-semibold mb-4">教育信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">学校</label>
            <input value={form.school} onChange={e => update('school', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">专业</label>
            <input value={form.major} onChange={e => update('major', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">年级</label>
            <input value={form.grade} onChange={e => update('grade', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">身份</label>
            <input value={form.role} onChange={e => update('role', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mb-8 p-6 rounded-xl border border-border">
        <h2 className="font-semibold mb-4">社交链接</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">GitHub 链接</label>
            <input value={form.github_url} onChange={e => update('github_url', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">GitHub 用户名</label>
            <input value={form.github_username} onChange={e => update('github_username', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">邮箱</label>
            <input value={form.email} onChange={e => update('email', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Codeforces 用户名</label>
            <input value={form.codeforces_username} onChange={e => update('codeforces_username', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">LeetCode 用户名</label>
            <input value={form.leetcode_username} onChange={e => update('leetcode_username', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="mb-8 p-6 rounded-xl border border-border">
        <h2 className="font-semibold mb-4">SEO 设置</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">站点名称</label>
            <input value={form.site_name} onChange={e => update('site_name', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">站点标题</label>
            <input value={form.site_title} onChange={e => update('site_title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground mb-1 block">站点描述</label>
            <input value={form.site_description} onChange={e => update('site_description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
        </div>
      </div>

      {/* Data Sync */}
      <div className="mb-8 p-6 rounded-xl border border-border">
        <h2 className="font-semibold mb-4">数据同步</h2>
        <div className="space-y-3">
          {[{ id: 'github', label: 'GitHub', desc: '同步贡献数据和仓库信息' },
            { id: 'leetcode', label: 'LeetCode', desc: '同步解题统计和排名' },
            { id: 'codeforces', label: 'Codeforces', desc: '同步 Rating 和比赛记录' }].map(p => (
            <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div>
                <p className="font-medium">{p.label}</p>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
              <button onClick={() => sync(p.id)} disabled={syncing === p.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-accent disabled:opacity-50">
                <RefreshCw size={14} className={syncing === p.id ? 'animate-spin' : ''} />
                {syncing === p.id ? '同步中...' : '立即同步'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
