import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'DayDreamerrrrr | YuChen Wang',
    template: '%s | DayDreamerrrrr',
  },
  description: '曲阜师范大学 ACM 集训队成员 | 热爱算法与竞赛编程',
  keywords: ['YuChen Wang', 'DayDreamerrrrr', 'ACM', 'competitive programming', '曲阜师范大学', '计算机科学'],
  authors: [{ name: 'YuChen Wang' }],
  openGraph: {
    title: 'DayDreamerrrrr | YuChen Wang',
    description: '曲阜师范大学 ACM 集训队成员 | 热爱算法与竞赛编程',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
