import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const items = await prisma.achievement.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const item = await prisma.achievement.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const { id, ...data } = await req.json()
  const item = await prisma.achievement.update({ where: { id }, data })
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  await prisma.achievement.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
