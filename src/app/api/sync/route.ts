import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { platform } = await req.json()

  try {
    if (platform === 'github') {
      const username = process.env.GITHUB_USERNAME
      const token = process.env.GITHUB_TOKEN
      if (!username) return NextResponse.json({ error: 'GITHUB_USERNAME not set' }, { status: 400 })

      const headers: Record<string, string> = {}
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(`https://api.github.com/users/${username}`, { headers })
      const data = await res.json()

      await prisma.externalProfile.upsert({
        where: { platform_username: { platform: 'GITHUB', username } },
        update: { data, syncedAt: new Date() },
        create: { platform: 'GITHUB', username, data },
      })
      return NextResponse.json({ ok: true, platform: 'github' })
    }

    if (platform === 'leetcode') {
      const username = process.env.LEETCODE_USERNAME
      if (!username) return NextResponse.json({ error: 'LEETCODE_USERNAME not set' }, { status: 400 })

      const res = await fetch('https://leetcode.cn/graphql/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query userProfilePublicProfile($username: String!) { matchedUser(username: $username) { profile { ranking } submitStats { acSubmissionNum { difficulty count } } } }`,
          variables: { username },
        }),
      })
      const data = await res.json()

      await prisma.externalProfile.upsert({
        where: { platform_username: { platform: 'LEETCODE', username } },
        update: { data, syncedAt: new Date() },
        create: { platform: 'LEETCODE', username, data },
      })
      return NextResponse.json({ ok: true, platform: 'leetcode' })
    }

    if (platform === 'codeforces') {
      const username = process.env.CODEFORCES_USERNAME
      if (!username) return NextResponse.json({ error: 'CODEFORCES_USERNAME not set' }, { status: 400 })

      const res = await fetch(`https://codeforces.com/api/user.info?handles=${username}`)
      const data = await res.json()

      await prisma.externalProfile.upsert({
        where: { platform_username: { platform: 'CODEFORCES', username } },
        update: { data, syncedAt: new Date() },
        create: { platform: 'CODEFORCES', username, data },
      })
      return NextResponse.json({ ok: true, platform: 'codeforces' })
    }

    return NextResponse.json({ error: 'Unknown platform' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
