import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(messages)
}

export async function PUT(req: NextRequest) {
  const { id, approved } = await req.json()
  const message = await prisma.message.update({ where: { id }, data: { approved } })
  return NextResponse.json(message)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  await prisma.message.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
