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
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="tracking-tight">最新文章</h2>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            查看全部 &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <BlogCard
                slug={post.slug}
                title={post.title}
                date={post.createdAt.toISOString()}
                description={post.excerpt || ''}
                tags={post.tags}
                readingTime={`${Math.ceil((post.content?.length || 0) / 500)} 分钟`}
              />
            </div>
          ))}
          {posts.length === 0 && (
            <p className="col-span-3 text-center text-muted-foreground py-16">
              暂无文章，敬请期待！
            </p>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="tracking-tight">精选项目</h2>
          <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            查看全部 &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <ProjectCard project={project} />
            </div>
          ))}
          {projects.length === 0 && (
            <p className="col-span-3 text-center text-muted-foreground py-16">
              项目即将上线，敬请期待！
            </p>
          )}
        </div>
      </section>

      <StatsBar />
    </>
  )
}
