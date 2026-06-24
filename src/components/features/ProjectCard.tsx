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
    <article className="card overflow-hidden group">
      {project.coverImage ? (
        <div className="aspect-video bg-muted overflow-hidden">
          <img src={project.coverImage} alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-accent to-muted flex items-center justify-center">
          <span className="text-2xl font-bold text-muted-foreground/30">{project.title.charAt(0)}</span>
        </div>
      )}
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-lg tracking-tight">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map(tech => <Badge key={tech}>{tech}</Badge>)}
        </div>
        <div className="flex items-center gap-4 pt-1">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
              <Github size={13} /> 源码
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink size={13} /> 演示
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
