import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: 'asc' } })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const project = await prisma.project.create({ data: body })
  return NextResponse.json(project, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const { id, ...data } = await req.json()
  const project = await prisma.project.update({ where: { id }, data })
  return NextResponse.json(project)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
