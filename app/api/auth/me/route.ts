import { initializeDatabase } from '@/lib/db'
import { verifySession } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await initializeDatabase()

    const sessionId = request.cookies.get('sessionId')?.value

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const user = await verifySession(sessionId)

    if (!user) {
      return NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      )
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error: any) {
    console.error('[v0] Me error:', error)
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 400 }
    )
  }
}
