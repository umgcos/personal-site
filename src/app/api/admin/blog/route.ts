import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, slug, content, excerpt, coverImage, tags, published } = body

  if (!title || !slug || !content) {
    return NextResponse.json({ error: '标题、slug 和内容不能为空' }, { status: 400 })
  }

  // Check slug uniqueness
  const existing = await prisma.blogPost.findUnique({ where: { slug } })
  if (existing) {
    return NextResponse.json({ error: 'slug 已存在，请更换' }, { status: 400 })
  }

  const post = await prisma.blogPost.create({
    data: { title, slug, content, excerpt, coverImage, tags: tags || [], published: published || false },
  })
  return NextResponse.json(post, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const { id, ...data } = await req.json()

  // If slug is being changed, check uniqueness
  if (data.slug) {
    const existing = await prisma.blogPost.findFirst({ where: { slug: data.slug, NOT: { id } } })
    if (existing) {
      return NextResponse.json({ error: 'slug 已存在' }, { status: 400 })
    }
  }

  const post = await prisma.blogPost.update({ where: { id }, data })
  return NextResponse.json(post)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  await prisma.blogPost.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
