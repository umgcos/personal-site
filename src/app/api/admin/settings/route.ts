import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

export async function GET() {
  const configs = await prisma.siteConfig.findMany()

  const settings: Record<string, Prisma.JsonValue> = {}

  for (const c of configs) {
    settings[c.key] = c.value as Prisma.JsonValue
  }

  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()

  for (const [key, value] of Object.entries(body)) {
    const safeValue = value as Prisma.InputJsonValue

    await prisma.siteConfig.upsert({
      where: { key },
      update: { value: safeValue },
      create: { key, value: safeValue },
    })
  }

  return NextResponse.json({ ok: true })
}