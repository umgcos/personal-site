import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

const KEYS = ['playground_leetcode', 'playground_codeforces', 'playground_github']

const defaults: Record<string, any> = {
  playground_leetcode: {
    totalSolved: 350,
    ranking: 'Top 8%',
    streak: 45,
    easySolved: 150,
    easyTotal: 800,
    mediumSolved: 140,
    mediumTotal: 1700,
    hardSolved: 60,
    hardTotal: 800,
  },
  playground_codeforces: {
    currentRating: 1650,
    currentRank: 'Expert',
    maxRating: 1720,
    maxRank: 'Expert',
  },
  playground_github: {
    publicRepos: 24,
    totalStars: 156,
  },
}

export async function GET() {
  const result: Record<string, any> = {}
  for (const key of KEYS) {
    const config = await prisma.siteConfig.findUnique({ where: { key } })
    result[key] = config ? config.value : defaults[key]
  }
  return NextResponse.json(result)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  for (const key of KEYS) {
    if (body[key] !== undefined) {
      await prisma.siteConfig.upsert({
        where: { key },
        update: { value: body[key] },
        create: { key, value: body[key] },
      })
    }
  }
  return NextResponse.json({ ok: true })
}
