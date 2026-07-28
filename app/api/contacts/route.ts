import { initializeDatabase } from '@/lib/db'
import { verifySession } from '@/lib/auth'
import { getEmergencyContacts, addEmergencyContact, deleteEmergencyContact } from '@/lib/userdata'
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

    const contacts = await getEmergencyContacts(user.userId)
    return NextResponse.json(contacts, { status: 200 })
  } catch (error: any) {
    console.error('[v0] Get contacts error:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 400 })
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

    const { name, phone, relationship } = await request.json()

    if (!name || !phone || !relationship) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const contact = await addEmergencyContact(user.userId, name, phone, relationship)
    return NextResponse.json(contact, { status: 201 })
  } catch (error: any) {
    console.error('[v0] Add contact error:', error)
    return NextResponse.json({ error: 'Failed to add contact' }, { status: 400 })
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
    const contactId = searchParams.get('id')

    if (!contactId) {
      return NextResponse.json({ error: 'Contact ID required' }, { status: 400 })
    }

    await deleteEmergencyContact(contactId)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('[v0] Delete contact error:', error)
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 400 })
  }
}
