import { prisma } from '@/lib/prisma'
import { BlogCard } from '@/components/features/BlogCard'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '博客' }

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort()

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">博客</h1>
      <p className="text-muted-foreground mb-8">关于算法、开发与学习的思考。</p>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/blog"><Badge>全部</Badge></Link>
          {allTags.map(tag => (
            <Link key={tag} href={`/blog?tag=${tag}`}><Badge>{tag}</Badge></Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <BlogCard
            key={post.id}
            slug={post.slug}
            title={post.title}
            date={post.createdAt.toISOString()}
            description={post.excerpt || ''}
            tags={post.tags}
            readingTime={`${Math.ceil((post.content?.length || 0) / 500)} 分钟`}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">暂无文章。</p>
          <p className="text-sm mt-2">在后台管理中添加博客文章。</p>
        </div>
      )}
    </section>
  )
}
