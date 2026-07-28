import { NextRequest, NextResponse } from 'next/server'
import { searchRoutes } from '@/lib/routes-data'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    if (!from || !to) {
      return NextResponse.json(
        { error: 'Missing from or to location' },
        { status: 400 }
      )
    }

    if (from === to) {
      return NextResponse.json(
        { error: 'From and to locations cannot be the same' },
        { status: 400 }
      )
    }

    // Search for available routes
    const routes = searchRoutes(from, to)

    return NextResponse.json({
      success: true,
      from,
      to,
      routes,
      count: routes.length,
    })
  } catch (error) {
    console.error('[v0] Routes search error:', error)
    return NextResponse.json(
      { error: 'Failed to search routes' },
      { status: 500 }
    )
  }
}
