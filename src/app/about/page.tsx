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
    <section className="max-w-3xl mx-auto px-4 py-12">
      {/* Bio */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
        <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center text-4xl flex-shrink-0">
          {'{ }'}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">关于我</h1>

          <p className="text-muted-foreground mb-4">
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
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <Github size={14} /> GitHub
              </a>
            )}

            {config.email && (
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail size={14} /> Email
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap size={20} /> 教育经历
        </h2>

        <div className="p-4 rounded-lg border border-border">
          <p className="font-semibold">{config.school}</p>
          <p className="text-sm text-muted-foreground">
            {config.major} | {config.grade}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {config.role}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold mb-6">技能</h2>

        {Object.keys(grouped).length > 0 ? (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {categoryLabels[category] || category}
              </h3>

              <div className="space-y-3">
                {items.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-3">
                    <span className="w-24 text-sm">{skill.name}</span>

                    <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground w-10 text-right">
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">
            暂无技能数据，请在后台管理中添加。
          </p>
        )}
      </div>
    </section>
  )
}