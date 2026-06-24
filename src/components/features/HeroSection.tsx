import { Github, Mail, Code2 } from 'lucide-react'
import { getSiteConfig } from '@/lib/site-config'

export async function HeroSection() {
  const config = await getSiteConfig()

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        {/* Avatar from GitHub */}
        <div className="relative animate-fade-in">
          <img
            src={`https://github.com/${config.github_username || 'umgcos'}.png`}
            alt={config.hero_name}
            width={112}
            height={112}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover rotate-3 shadow-lg ring-2 ring-primary/20"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-background" />
        </div>

        <div className="flex-1 space-y-5">
          {/* Name with accent underline */}
          <div className="animate-fade-in-up">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-1">Hello, I am</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="text-primary">{config.hero_name}</span>
            </h1>
          </div>

          {/* Subtitle with better typography */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-in-up stagger-1">
            {config.hero_subtitle}
          </p>

          {/* Bio */}
          <p className="text-base text-muted-foreground/80 leading-relaxed max-w-2xl animate-fade-in-up stagger-2">
            {config.hero_bio}
          </p>

          {/* Action buttons with better styling */}
          <div className="flex flex-wrap items-center gap-3 pt-2 animate-fade-in-up stagger-3">
            {config.github_url && (
              <a href={config.github_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-medium text-sm hover:opacity-90 transition-all hover:shadow-lg">
                <Github size={16} /> GitHub
              </a>
            )}
            {config.email && (
              <a href={`mailto:${config.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border font-medium text-sm hover:bg-accent hover:border-primary/30 transition-all">
                <Mail size={16} /> Contact
              </a>
            )}
            <a href="/playground"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border font-medium text-sm hover:bg-accent hover:border-primary/30 transition-all">
              <Code2 size={16} /> LeetCode
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
