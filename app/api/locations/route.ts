import { initializeDatabase } from '@/lib/db'
import { verifySession } from '@/lib/auth'
import { getSavedLocations, addSavedLocation, deleteSavedLocation, updateSavedLocation } from '@/lib/userdata'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await initializeDatabase()

    const sessionId = request.cookies.get('sessionId')?.value
    if (!sessionId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await verifySession(sessionId)
    if (!user) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 })
    }

    const locations = await getSavedLocations(user.userId)
    return NextResponse.json(locations, { status: 200 })
  } catch (error: any) {
    console.error('[v0] Get locations error:', error)
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 400 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase()

    const sessionId = request.cookies.get('sessionId')?.value
    if (!sessionId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await verifySession(sessionId)
    if (!user) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 })
    }

    const { type, name, address } = await request.json()

    if (!type || !name || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const location = await addSavedLocation(user.userId, type, name, address)
    return NextResponse.json(location, { status: 201 })
  } catch (error: any) {
    console.error('[v0] Add location error:', error)
    return NextResponse.json({ error: 'Failed to add location' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await initializeDatabase()

    const sessionId = request.cookies.get('sessionId')?.value
    if (!sessionId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await verifySession(sessionId)
    if (!user) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 })
    }

    const { id, name, address } = await request.json()

    if (!id || !name || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await updateSavedLocation(id, name, address)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('[v0] Update location error:', error)
    return NextResponse.json({ error: 'Failed to update location' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await initializeDatabase()

    const sessionId = request.cookies.get('sessionId')?.value
    if (!sessionId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await verifySession(sessionId)
    if (!user) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const locationId = searchParams.get('id')

    if (!locationId) {
      return NextResponse.json({ error: 'Location ID required' }, { status: 400 })
    }

    await deleteSavedLocation(locationId)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('[v0] Delete location error:', error)
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 400 })
  }
}
