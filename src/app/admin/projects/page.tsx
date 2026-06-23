'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Project {
  id: string; title: string; description: string; techStack: string[]
  githubUrl?: string; liveUrl?: string; featured: boolean; sortOrder: number
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', featured: false, sortOrder: 0 })

  useEffect(() => { loadProjects() }, [])

  async function loadProjects() {
    const res = await fetch('/api/admin/projects')
    if (res.ok) setProjects(await res.json())
  }

  function openNew() {
    setEditing(null)
    setForm({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', featured: false, sortOrder: 0 })
    setShowForm(true)
  }

  function openEdit(p: Project) {
    setEditing(p)
    setForm({ title: p.title, description: p.description, techStack: p.techStack.join(', '), githubUrl: p.githubUrl || '', liveUrl: p.liveUrl || '', featured: p.featured, sortOrder: p.sortOrder })
    setShowForm(true)
  }

  async function handleSave() {
    const data = { ...form, techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean) }
    if (editing) {
      await fetch('/api/admin/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...data }) })
    } else {
      await fetch('/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    }
    setShowForm(false)
    loadProjects()
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除该项目？')) return
    await fetch('/api/admin/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    loadProjects()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">项目管理</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
          <Plus size={16} /> 添加项目
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl border border-border">
          <h3 className="font-semibold mb-4">{editing ? '编辑项目' : '新增项目'}</h3>
          <div className="space-y-3">
            <input placeholder="项目名称" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <textarea placeholder="项目描述" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none" />
            <input placeholder="技术栈（用逗号分隔）" value={form.techStack} onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input placeholder="GitHub 链接" value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input placeholder="演示链接" value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} /> 首页精选</label>
              <input type="number" placeholder="排序" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} className="w-32 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">保存</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm">取消</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {projects.map(p => (
          <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-muted-foreground">{p.techStack.join(', ')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-accent"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-accent text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-muted-foreground text-center py-8">暂无项目。</p>}
      </div>
    </div>
  )
}
