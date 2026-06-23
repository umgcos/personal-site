import Link from 'next/link'
import { Github, Mail } from 'lucide-react'
import { getSiteConfig } from '@/lib/site-config'

export async function Footer() {
  const config = await getSiteConfig()

  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {config.hero_name}. 保留所有权利。
        </p>
        <div className="flex items-center gap-4">
          {config.github_url && (
            <a href={config.github_url} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={18} />
            </a>
          )}
          {config.email && (
            <a href={`mailto:${config.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={18} />
            </a>
          )}
          <Link href="/guestbook"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            留言板
          </Link>
          <Link href="/admin"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            后台管理
          </Link>
        </div>
      </div>
    </footer>
  )
}
