'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, FolderKanban, Trophy, TreePine, MessageSquare, Settings, BarChart3, LogOut, Gamepad2 } from 'lucide-react'

const sidebarItems = [
  { label: '仪表盘', href: '/admin', icon: LayoutDashboard },
  { label: '博客管理', href: '/admin/blog', icon: FileText },
  { label: '项目管理', href: '/admin/projects', icon: FolderKanban },
  { label: '竞赛成绩', href: '/admin/achievements', icon: Trophy },
  { label: '竞技场', href: '/admin/playground', icon: Gamepad2 },
  { label: '技能树', href: '/admin/skills', icon: TreePine },
  { label: '留言审核', href: '/admin/messages', icon: MessageSquare },
  { label: '访问统计', href: '/admin/analytics', icon: BarChart3 },
  { label: '网站设置', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
      <aside className="w-56 flex-shrink-0">
        <h2 className="font-bold text-lg mb-6">后台管理</h2>
        <nav className="space-y-1">
          {sidebarItems.map(item => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}>
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors w-full mt-4"
          >
            <LogOut size={16} />
            退出登录
          </button>
        </nav>
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
