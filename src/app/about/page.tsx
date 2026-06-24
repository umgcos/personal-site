import { prisma } from '@/lib/prisma'
import { getSiteConfig } from '@/lib/site-config'
import { Github, Mail, GraduationCap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '关于我' }

type Skill = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  category: string
  level: number
  icon: string | null
  order: number
  parentId: string | null
}

export default async function AboutPage() {
  const [skills, config] = await Promise.all([
    prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    }),
    getSiteConfig(),
  ])

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})

  const categoryLabels: Record<string, string> = {
    language: '编程语言',
    framework: '框架与库',
    tool: '开发工具',
    cs: '计算机基础',
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Bio */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-16 animate-fade-in-up">
        <img
          src={`https://github.com/${config.github_username || 'umgcos'}.png`}
          alt={config.hero_name}
          width={112}
          height={112}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0 rotate-2 shadow-lg ring-2 ring-primary/20"
        />

        <div className="space-y-4">
          <h1 className="tracking-tight">关于我</h1>

          <p className="text-muted-foreground leading-relaxed">
            我是 {config.hero_name} ({config.site_name})，
            {config.school}{config.major}专业学生，{config.role}。
            {config.hero_bio}
          </p>

          <div className="flex items-center gap-4">
            {config.github_url && (
              <a
                href={config.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={14} /> GitHub
              </a>
            )}

            {config.email && (
              <a
                href={`mailto:${config.email}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={14} /> Email
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-16 animate-fade-in-up stagger-1">
        <h2 className="flex items-center gap-2 mb-6 tracking-tight">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-primary">
            <GraduationCap size={18} />
          </span>
          教育经历
        </h2>

        <div className="card p-5">
          <p className="font-bold text-lg">{config.school}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {config.major} | {config.grade}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {config.role}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="animate-fade-in-up stagger-2">
        <h2 className="mb-8 tracking-tight">技能</h2>

        {Object.keys(grouped).length > 0 ? (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-10">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                {categoryLabels[category] || category}
              </h3>

              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-3">
                    <span className="w-20 sm:w-24 text-sm font-medium">{skill.name}</span>

                    <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 60%, var(--color-accent)))`,
                        }}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground w-10 text-right font-mono font-medium">
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground py-8 text-center">
            暂无技能数据，请在后台管理中添加。
          </p>
        )}
      </div>
    </section>
  )
}
