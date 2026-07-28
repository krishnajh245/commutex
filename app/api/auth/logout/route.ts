import { initializeDatabase } from '@/lib/db'
import { logoutUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase()

    const sessionId = request.cookies.get('sessionId')?.value

    if (sessionId) {
      await logoutUser(sessionId)
    }

    const response = NextResponse.json({ success: true }, { status: 200 })
    response.cookies.delete('sessionId')

    return response
  } catch (error: any) {
    console.error('[v0] Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 400 }
    )
  }
}
