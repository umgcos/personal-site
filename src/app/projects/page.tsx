import { prisma } from '@/lib/prisma'
import { ProjectCard } from '@/components/features/ProjectCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '项目展示' }

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: 'asc' },
  }).catch(() => [])

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">项目展示</h1>
      <p className="text-muted-foreground mb-8">我构建和参与的项目。</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {projects.length === 0 && (
          <p className="col-span-3 text-center text-muted-foreground py-12">
            暂无项目，请在后台管理中添加。
          </p>
        )}
      </div>
    </section>
  )
}
