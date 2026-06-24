import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { format } from 'date-fns'
import { ArrowUpRight } from 'lucide-react'

interface BlogCardProps {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: string
}

export function BlogCard({ slug, title, date, description, tags, readingTime }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="card p-6 h-full flex flex-col">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-2">
            <time dateTime={date}>{format(new Date(date), 'yyyy年MM月dd日')}</time>
            <span className="text-border">|</span>
            <span>{readingTime}</span>
          </div>
          <ArrowUpRight size={14} className="text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => <Badge key={tag} >{tag}</Badge>)}
        </div>
      </article>
    </Link>
  )
}
