'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { Menu, X, Moon, Sun } from 'lucide-react'

const navItems = [
  { label: '博客', href: '/blog' },
  { label: '项目', href: '/projects' },
  { label: '成绩', href: '/achievements' },
  { label: '竞技场', href: '/playground' },
  { label: '关于', href: '/about' },
]

export function Header() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-lg tracking-tight hover:text-primary transition-colors">
          DayDreamerrrrr
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent font-medium">
              {item.label}
            </Link>
          ))}
          <button onClick={toggle} className="ml-2 p-2 rounded-lg hover:bg-accent transition-colors">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        {/* Mobile */}
        <button className="md:hidden p-2 rounded-lg hover:bg-accent" onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl px-4 py-3">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent font-medium">
              {item.label}
            </Link>
          ))}
          <button onClick={() => { toggle(); setOpen(false) }} className="mt-2 p-2 rounded-lg hover:bg-accent">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      )}
    </header>
  )
}
