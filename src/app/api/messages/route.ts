import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const messages = await prisma.message.findMany({
    where: { approved: true, parentId: null },
    orderBy: { createdAt: 'desc' },
    include: { replies: true },
  })
  return NextResponse.json(messages)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, content, email } = body
  if (!name || !content) {
    return NextResponse.json({ error: 'Name and content required' }, { status: 400 })
  }
  const message = await prisma.message.create({
    data: { name, content, email, approved: false },
  })
  return NextResponse.json(message, { status: 201 })
}
