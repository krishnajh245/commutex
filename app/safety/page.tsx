'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, Phone, Plus, X, Trash2 } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

interface Contact {
  id: string
  name: string
  phone: string
  relationship: string
}

export default function SafetyPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    try {
      const response = await fetch('/api/contacts')
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (err) {
      console.error('[v0] Fetch contacts error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddContact(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to add contact')
      }

      const newContact = await response.json()
      setContacts([newContact, ...contacts])
      setFormData({ name: '', phone: '', relationship: '' })
      setShowForm(false)
    } catch (err: any) {
      setError(err.message || 'Failed to add contact')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteContact(contactId: string) {
    try {
      const response = await fetch(`/api/contacts?id=${contactId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setContacts(contacts.filter((c) => c.id !== contactId))
      }
    } catch (err) {
      console.error('[v0] Delete contact error:', err)
    }
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-400 text-white pt-6 pb-8 px-4">
        <h1 className="text-2xl font-bold">Safety</h1>
      </div>

      {/* SOS Button */}
      <div className="px-4 -mt-6 mb-8">
        <div className="bg-gradient-to-b from-red-500 to-red-600 rounded-full p-12 flex items-center justify-center shadow-xl">
          <button className="w-32 h-32 bg-red-500 hover:bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform">
            <AlertCircle className="w-12 h-12 mb-2" />
            <span className="font-bold text-lg">SOS</span>
          </button>
        </div>
        <p className="text-center text-gray-600 mt-4 text-sm">Press in case of emergency</p>
      </div>

      {/* Emergency Contacts */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-500" />
            <h2 className="font-bold text-lg text-gray-900">Trusted Contacts</h2>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Add Contact Form */}
        {showForm && (
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
            <form onSubmit={handleAddContact} className="space-y-3">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="text"
                placeholder="Relationship (e.g., Brother, Friend)"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Contact'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contacts List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-2">No emergency contacts added yet</p>
            <p className="text-sm text-gray-500">Add your first contact to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{contact.name}</p>
                    <p className="text-xs text-gray-600">{contact.relationship}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
