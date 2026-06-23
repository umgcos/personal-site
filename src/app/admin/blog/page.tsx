'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { format } from 'date-fns'

interface BlogPost {
  id: string; title: string; slug: string; content: string; excerpt?: string
  coverImage?: string; tags: string[]; published: boolean; createdAt: string; updatedAt: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', slug: '', content: '', excerpt: '', coverImage: '', tags: '', published: false })
  const [error, setError] = useState('')

  useEffect(() => { load() }, [])
  async function load() { const r = await fetch('/api/admin/blog'); if (r.ok) setPosts(await r.json()) }

  function openNew() {
    setEditing(null)
    setForm({ title: '', slug: '', content: '', excerpt: '', coverImage: '', tags: '', published: false })
    setError('')
    setShowForm(true)
  }

  function openEdit(p: BlogPost) {
    setEditing(p)
    setForm({ title: p.title, slug: p.slug, content: p.content, excerpt: p.excerpt || '', coverImage: p.coverImage || '', tags: p.tags.join(', '), published: p.published })
    setError('')
    setShowForm(true)
  }

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9一-龥]+/g, '-').replace(/^-|-$/g, '')
  }

  async function handleSave() {
    setError('')
    const data = { ...form, tags: form.tags.split(',').map(s => s.trim()).filter(Boolean) }
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { id: editing.id, ...data } : data
    const res = await fetch('/api/admin/blog', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const result = await res.json()
    if (!res.ok) { setError(result.error || '保存失败'); return }
    setShowForm(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除该文章？')) return
    await fetch('/api/admin/blog', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  async function togglePublish(post: BlogPost) {
    await fetch('/api/admin/blog', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: post.id, published: !post.published }) })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">博客管理</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
          <Plus size={16} /> 新增文章
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl border border-border">
          <h3 className="font-semibold mb-4">{editing ? '编辑文章' : '新增文章'}</h3>
          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
          <div className="space-y-3">
            <input
              placeholder="文章标题"
              value={form.title}
              onChange={e => {
                setForm(f => ({ ...f, title: e.target.value }))
                if (!editing) setForm(f => ({ ...f, slug: generateSlug(e.target.value) }))
              }}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
            <input
              placeholder="slug (URL 路径，自动生成)"
              value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
            <input
              placeholder="摘要 (可选)"
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
            <input
              placeholder="封面图片 URL (可选)"
              value={form.coverImage}
              onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
            <input
              placeholder="标签 (用逗号分隔)"
              value={form.tags}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
            <textarea
              placeholder="文章内容 (支持 Markdown)"
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={15}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono resize-y"
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
                立即发布
              </label>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">保存</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm">取消</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {posts.map(p => (
          <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium truncate">{p.title}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs ${p.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                  {p.published ? '已发布' : '草稿'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">/{p.slug} | {format(new Date(p.createdAt), 'yyyy-MM-dd')}</p>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <button onClick={() => togglePublish(p)} className="p-2 rounded-lg hover:bg-accent" title={p.published ? '取消发布' : '发布'}>
                {p.published ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-accent"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-accent text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground text-center py-8">暂无文章。</p>}
      </div>
    </div>
  )
}
