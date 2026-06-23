import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { format } from 'date-fns'

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
    <Link href={`/blog/${slug}`} className="group">
      <article className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <time dateTime={date}>{format(new Date(date), 'yyyy年MM月dd日')}</time>
          <span>&middot;</span>
          <span>{readingTime}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </article>
    </Link>
  )
}
