import { prisma } from '@/lib/prisma'
import { MessageForm } from '@/components/features/MessageForm'
import { MessageSquare } from 'lucide-react'
import { format } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '留言板' }

export const dynamic = 'force-dynamic'

export default async function GuestbookPage() {
  const messages = await prisma.message.findMany({
    where: { approved: true, parentId: null },
    orderBy: { createdAt: 'desc' },
    include: { replies: { where: { approved: true }, orderBy: { createdAt: 'asc' } } },
  }).catch(() => [])

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare size={24} />
        <h1 className="text-3xl font-bold">留言板</h1>
      </div>
      <p className="text-muted-foreground mb-8">欢迎留言！打个招呼或者分享你的想法。</p>

      <MessageForm />

      <div className="mt-8 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className="p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-2">
              {msg.avatar ? (
                <img src={msg.avatar} alt={msg.name} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <span className="font-medium text-sm">{msg.name}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {format(new Date(msg.createdAt), 'yyyy年MM月dd日 HH:mm')}
                </span>
              </div>
            </div>
            <p className="text-sm">{msg.content}</p>
            {msg.replies.length > 0 && (
              <div className="mt-3 ml-8 space-y-3 border-l-2 border-border pl-4">
                {msg.replies.map(reply => (
                  <div key={reply.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{reply.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(reply.createdAt), 'yyyy年MM月dd日')}
                      </span>
                    </div>
                    <p className="text-sm">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground py-8">暂无留言，快来第一个留言吧！</p>
        )}
      </div>
    </section>
  )
}
