'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { Menu, X, Moon, Sun } from 'lucide-react'

const navItems = [
  { label: '博客', href: '/blog' },
  { label: '项目展示', href: '/projects' },
  { label: '竞赛成绩', href: '/achievements' },
  { label: '竞技场', href: '/playground' },
  { label: '关于我', href: '/about' },
]

export function Header() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">DayDreamerrrrr</Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
          <button onClick={toggle} className="p-2 rounded-lg hover:bg-accent transition-colors">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-3">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
          <button onClick={() => { toggle(); setOpen(false) }} className="mt-2 p-2 rounded-lg hover:bg-accent">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      )}
    </header>
  )
}
