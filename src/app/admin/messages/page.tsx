'use client'

import { useState, useEffect } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

interface Message { id: string; name: string; content: string; approved: boolean; createdAt: string }

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => { load() }, [])
  async function load() { const r = await fetch('/api/admin/messages'); if (r.ok) setMessages(await r.json()) }

  async function approve(id: string) {
    await fetch('/api/admin/messages', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, approved: true }) })
    load()
  }

  async function remove(id: string) {
    if (!confirm('确定删除该留言？')) return
    await fetch('/api/admin/messages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  const pending = messages.filter(m => !m.approved)
  const approved = messages.filter(m => m.approved)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">留言审核</h1>

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">待审核 ({pending.length})</h2>
          <div className="space-y-3">
            {pending.map(m => (
              <div key={m.id} className="p-4 rounded-lg border border-border bg-yellow-50/50 dark:bg-yellow-900/10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(m.createdAt), 'yyyy年MM月dd日 HH:mm')}</p>
                    <p className="mt-2 text-sm">{m.content}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => approve(m.id)} className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600"><Check size={14} /></button>
                    <button onClick={() => remove(m.id)} className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-3">已审核 ({approved.length})</h2>
      <div className="space-y-3">
        {approved.map(m => (
          <div key={m.id} className="p-4 rounded-lg border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm">{m.name} <span className="text-xs text-muted-foreground">{format(new Date(m.createdAt), 'yyyy年MM月dd日')}</span></p>
                <p className="mt-1 text-sm">{m.content}</p>
              </div>
              <button onClick={() => remove(m.id)} className="p-2 rounded-lg hover:bg-accent text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {approved.length === 0 && <p className="text-muted-foreground text-center py-8">暂无已审核留言。</p>}
      </div>
    </div>
  )
}
