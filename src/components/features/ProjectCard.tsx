import { Badge } from '@/components/ui/Badge'
import { Github, ExternalLink } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  coverImage?: string | null
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
      {project.coverImage && (
        <div className="aspect-video bg-muted overflow-hidden">
          <img src={project.coverImage} alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      {!project.coverImage && (
        <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground text-sm">
          暂无预览
        </div>
      )}
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map(tech => <Badge key={tech}>{tech}</Badge>)}
        </div>
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Github size={14} /> 源码
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink size={14} /> 演示
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
