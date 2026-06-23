import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } })
  if (!post) return {}
  return { title: post.title, description: post.excerpt || undefined }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } })
  if (!post) notFound()

  // Simple markdown-like rendering (convert newlines to paragraphs)
  const contentHtml = post.content
    .split('

')
    .map(p => p.trim())
    .filter(p => p)
    .map(p => {
      // Headers
      if (p.startsWith('### ')) return `<h3>${p.slice(4)}</h3>`
      if (p.startsWith('## ')) return `<h2>${p.slice(3)}</h2>`
      if (p.startsWith('# ')) return `<h1>${p.slice(2)}</h1>`
      // Lists
      if (p.startsWith('- ')) {
        const items = p.split('
').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('')
        return `<ul>${items}</ul>`
      }
      // Regular paragraph
      return `<p>${p.replace(/
/g, '<br>')}</p>`
    })
    .join('
')

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={14} /> 返回博客
      </Link>
      <header className="mb-8">
        <time className="text-sm text-muted-foreground">
          {format(new Date(post.createdAt), 'yyyy年MM月dd日')}
        </time>
        <h1 className="text-3xl font-bold mt-2 mb-3">{post.title}</h1>
        {post.excerpt && <p className="text-muted-foreground">{post.excerpt}</p>}
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  )
}
