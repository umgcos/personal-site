import Link from 'next/link'
import { Github, Mail } from 'lucide-react'
import { getSiteConfig } from '@/lib/site-config'

export async function Footer() {
  const config = await getSiteConfig()

  return (
    <footer className="border-t border-border/60 bg-surface/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {config.hero_name}. 保留所有权利。
        </p>
        <div className="flex items-center gap-5">
          {config.github_url && (
            <a href={config.github_url} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={18} />
            </a>
          )}
          {config.email && (
            <a href={`mailto:${config.email}`}
              className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={18} />
            </a>
          )}
          <Link href="/guestbook"
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            留言板
          </Link>
          <Link href="/admin"
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            管理
          </Link>
        </div>
      </div>
    </footer>
  )
}
