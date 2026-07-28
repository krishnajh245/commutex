import { getDatabase } from './db'
import { randomUUID } from 'crypto'

// Emergency Contacts
export async function addEmergencyContact(
  userId: string,
  name: string,
  phone: string,
  relationship: string
) {
  const db = getDatabase()
  const contactId = randomUUID()

  const stmt = db.prepare(
    'INSERT INTO emergency_contacts (id, userId, name, phone, relationship, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
  )
  stmt.run(contactId, userId, name, phone, relationship, new Date().toISOString())

  return { id: contactId, userId, name, phone, relationship }
}

export async function getEmergencyContacts(userId: string) {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM emergency_contacts WHERE userId = ? ORDER BY createdAt DESC')
  return stmt.all(userId) as any[]
}

export async function deleteEmergencyContact(contactId: string) {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM emergency_contacts WHERE id = ?')
  stmt.run(contactId)
}

// Saved Locations
export async function addSavedLocation(
  userId: string,
  type: string,
  name: string,
  address: string
) {
  const db = getDatabase()
  const locationId = randomUUID()

  const stmt = db.prepare(
    'INSERT INTO saved_locations (id, userId, type, name, address, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
  )
  stmt.run(locationId, userId, type, name, address, new Date().toISOString())

  return { id: locationId, userId, type, name, address }
}

export async function getSavedLocations(userId: string) {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM saved_locations WHERE userId = ? ORDER BY type, name')
  return stmt.all(userId) as any[]
}

export async function updateSavedLocation(locationId: string, name: string, address: string) {
  const db = getDatabase()
  const stmt = db.prepare('UPDATE saved_locations SET name = ?, address = ? WHERE id = ?')
  stmt.run(name, address, locationId)
}

export async function deleteSavedLocation(locationId: string) {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM saved_locations WHERE id = ?')
  stmt.run(locationId)
}
