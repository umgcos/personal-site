import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const configs = await prisma.siteConfig.findMany()
  const settings: Record<string, any> = {}
  for (const c of configs) {
    settings[c.key] = c.value
  }
  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  // body is { key: value, key: value, ... }
  for (const [key, value] of Object.entries(body)) {
    await prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  }
  return NextResponse.json({ ok: true })
}
