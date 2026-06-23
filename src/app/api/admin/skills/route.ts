import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] })
  return NextResponse.json(skills)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const skill = await prisma.skill.create({ data: body })
  return NextResponse.json(skill, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const { id, ...data } = await req.json()
  const skill = await prisma.skill.update({ where: { id }, data })
  return NextResponse.json(skill)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  await prisma.skill.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
