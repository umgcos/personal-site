'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Skill { id: string; name: string; category: string; level: number; order: number }

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [form, setForm] = useState({ name: '', category: 'language', level: 50, order: 0 })

  useEffect(() => { load() }, [])
  async function load() { const r = await fetch('/api/admin/skills'); if (r.ok) setSkills(await r.json()) }

  function openNew() { setEditing(null); setForm({ name: '', category: 'language', level: 50, order: 0 }); setShowForm(true) }
  function openEdit(s: Skill) { setEditing(s); setForm({ name: s.name, category: s.category, level: s.level, order: s.order }); setShowForm(true) }

  async function handleSave() {
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { id: editing.id, ...form } : form
    await fetch('/api/admin/skills', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    setShowForm(false); load()
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除该技能？')) return
    await fetch('/api/admin/skills', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  const grouped = skills.reduce((acc, s) => { if (!acc[s.category]) acc[s.category] = []; acc[s.category].push(s); return acc }, {} as Record<string, Skill[]>)

  const categoryLabels: Record<string, string> = { language: '编程语言', framework: '框架与库', tool: '开发工具', cs: '计算机基础' }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">技能管理</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm"><Plus size={16} /> 添加技能</button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl border border-border">
          <h3 className="font-semibold mb-4">{editing ? '编辑技能' : '新增技能'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="技能名称" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              <option value="language">编程语言</option><option value="framework">框架与库</option><option value="tool">开发工具</option><option value="cs">计算机基础</option>
            </select>
            <div className="col-span-2">
              <label className="text-sm text-muted-foreground">熟练度: {form.level}%</label>
              <input type="range" min={0} max={100} value={form.level} onChange={e => setForm(f => ({ ...f, level: parseInt(e.target.value) }))} className="w-full" />
            </div>
            <input type="number" placeholder="排序" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">保存</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm">取消</button>
          </div>
        </div>
      )}

      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="mb-6">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-3">{categoryLabels[cat] || cat}</h3>
          <div className="space-y-2">
            {items.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <span className="w-28 font-medium text-sm">{s.name}</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${s.level}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{s.level}%</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(s)} className="p-1.5 rounded hover:bg-accent"><Pencil size={13} /></button>
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded hover:bg-accent text-red-500"><Trash2 size={13} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
