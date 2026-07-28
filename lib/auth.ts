import { getDatabase } from './db'
import { randomUUID } from 'crypto'

export async function registerUser(
  name: string,
  email: string,
  phone: string,
  password: string
) {
  const db = getDatabase()
  const userId = randomUUID()

  try {
    const stmt = db.prepare(
      'INSERT INTO users (id, name, email, phone, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
    )
    stmt.run(userId, name, email, phone, password, new Date().toISOString())

    // Create a session
    const sessionId = randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    const sessionStmt = db.prepare(
      'INSERT INTO sessions (id, userId, createdAt, expiresAt) VALUES (?, ?, ?, ?)'
    )
    sessionStmt.run(sessionId, userId, new Date().toISOString(), expiresAt)

    return { userId, sessionId, name, email, phone }
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      if (error.message.includes('email')) {
        throw new Error('Email already registered')
      }
      if (error.message.includes('phone')) {
        throw new Error('Phone number already registered')
      }
    }
    throw error
  }
}

export async function loginUser(email: string, password: string) {
  const db = getDatabase()

  const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?')
  const user = stmt.get(email, password) as any

  if (!user) {
    throw new Error('Invalid email or password')
  }

  // Create a session
  const sessionId = randomUUID()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  const sessionStmt = db.prepare(
    'INSERT INTO sessions (id, userId, createdAt, expiresAt) VALUES (?, ?, ?, ?)'
  )
  sessionStmt.run(sessionId, user.id, new Date().toISOString(), expiresAt)

  return { userId: user.id, sessionId, name: user.name, email: user.email, phone: user.phone }
}

export async function getUserById(userId: string) {
  const db = getDatabase()
  const stmt = db.prepare('SELECT id, name, email, phone, createdAt FROM users WHERE id = ?')
  return stmt.get(userId) as any
}

export async function verifySession(sessionId: string) {
  const db = getDatabase()
  const stmt = db.prepare(
    'SELECT s.userId, u.name, u.email, u.phone FROM sessions s JOIN users u ON s.userId = u.id WHERE s.id = ? AND s.expiresAt > ?'
  )
  return stmt.get(sessionId, new Date().toISOString()) as any
}

export async function logoutUser(sessionId: string) {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM sessions WHERE id = ?')
  stmt.run(sessionId)
}
