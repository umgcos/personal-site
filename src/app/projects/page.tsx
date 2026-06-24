import { prisma } from '@/lib/prisma'
import { ProjectCard } from '@/components/features/ProjectCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '项目展示' }

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: 'asc' },
  }).catch(() => [])

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="tracking-tight">项目展示</h1>
        <p className="text-muted-foreground mt-2">我构建和参与的项目。</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <ProjectCard project={project} />
          </div>
        ))}
        {projects.length === 0 && (
          <p className="col-span-3 text-center text-muted-foreground py-16 animate-fade-in">
            暂无项目，请在后台管理中添加。
          </p>
        )}
      </div>
    </section>
  )
}
