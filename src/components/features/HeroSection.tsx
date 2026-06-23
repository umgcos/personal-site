import { Github, Mail, Code2 } from 'lucide-react'
import { getSiteConfig } from '@/lib/site-config'

export async function HeroSection() {
  const config = await getSiteConfig()

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl">
          {'{ }'}
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">Hi, I'm <span className="text-primary">{config.hero_name}</span></h1>
          <p className="text-xl text-muted-foreground mb-4">
            {config.hero_subtitle}
          </p>
          <p className="text-muted-foreground max-w-2xl mb-6">
            {config.hero_bio}
          </p>
          <div className="flex items-center gap-4">
            {config.github_url && (
              <a href={config.github_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm">
                <Github size={16} /> GitHub
              </a>
            )}
            {config.email && (
              <a href={`mailto:${config.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm">
                <Mail size={16} /> Contact
              </a>
            )}
            <a href="/playground"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm">
              <Code2 size={16} /> LeetCode
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
