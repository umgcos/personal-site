import { HeroSection } from '@/components/features/HeroSection'
import { BlogCard } from '@/components/features/BlogCard'
import { ProjectCard } from '@/components/features/ProjectCard'
import { StatsBar } from '@/components/features/StatsBar'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, projects] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { sortOrder: 'asc' },
      take: 3,
    }).catch(() => []),
  ])

  return (
    <>
      <HeroSection />

      {/* Latest Posts */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            查看全部 &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          {posts.length === 0 && (
            <p className="col-span-3 text-center text-muted-foreground py-12">
              暂无文章，敬请期待！
            </p>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">精选项目</h2>
          <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
            查看全部 &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {projects.length === 0 && (
            <p className="col-span-3 text-center text-muted-foreground py-12">
              项目即将上线！
            </p>
          )}
        </div>
      </section>

      <StatsBar />
    </>
  )
}
