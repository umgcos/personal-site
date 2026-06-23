'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Achievement {
  id: string; title: string; competition: string; category: string
  level: string; award: string; rank?: number; date: string
  location?: string; description?: string; year: number
}

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([])
  const [editing, setEditing] = useState<Achievement | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', competition: 'ACM-ICPC', category: '团体赛', level: '国家级', award: '金牌', rank: '', date: '', location: '', description: '', year: new Date().getFullYear() })

  useEffect(() => { load() }, [])
  async function load() { const r = await fetch('/api/admin/achievements'); if (r.ok) setItems(await r.json()) }

  function openNew() { setEditing(null); setForm({ title: '', competition: 'ACM-ICPC', category: '团体赛', level: '国家级', award: '金牌', rank: '', date: '', location: '', description: '', year: new Date().getFullYear() }); setShowForm(true) }
  function openEdit(a: Achievement) { setEditing(a); setForm({ title: a.title, competition: a.competition, category: a.category, level: a.level, award: a.award, rank: String(a.rank || ''), date: a.date.split('T')[0], location: a.location || '', description: a.description || '', year: a.year }); setShowForm(true) }

  async function handleSave() {
    const data = { ...form, rank: form.rank ? parseInt(form.rank) : null, date: new Date(form.date).toISOString() }
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { id: editing.id, ...data } : data
    await fetch('/api/admin/achievements', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    setShowForm(false); load()
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除该记录？')) return
    await fetch('/api/admin/achievements', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">竞赛成绩管理</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm"><Plus size={16} /> 添加记录</button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl border border-border">
          <h3 className="font-semibold mb-4">{editing ? '编辑记录' : '新增记录'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="标题" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <select value={form.competition} onChange={e => setForm(f => ({ ...f, competition: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              <option>ACM-ICPC</option><option>蓝桥杯</option>
            </select>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              <option>团体赛</option><option>个人赛</option>
            </select>
            <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              <option>国家级</option><option>省级</option><option>校级</option>
            </select>
            <select value={form.award} onChange={e => setForm(f => ({ ...f, award: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              <option>金牌</option><option>银牌</option><option>铜牌</option><option>一等奖</option><option>二等奖</option><option>三等奖</option>
            </select>
            <input type="number" placeholder="名次" value={form.rank} onChange={e => setForm(f => ({ ...f, rank: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input placeholder="比赛地点" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <textarea placeholder="补充说明" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full mt-3 px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none" />
          <div className="flex gap-2 mt-3">
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">保存</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm">取消</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(a => (
          <div key={a.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <p className="font-medium">{a.title}</p>
              <p className="text-sm text-muted-foreground">{a.competition} | {a.award} | {a.year}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(a)} className="p-2 rounded-lg hover:bg-accent"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg hover:bg-accent text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-center py-8">暂无竞赛记录。</p>}
      </div>
    </div>
  )
}
