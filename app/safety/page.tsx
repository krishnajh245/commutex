'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, Plus, Trash2 } from 'lucide-react'

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
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white pt-8 pb-12 px-4 rounded-b-3xl">
        <h1 className="text-3xl font-bold">Safety</h1>
      </div>

      {/* SOS Button */}
      <div className="flex justify-center px-4 py-8">
        <button className="w-40 h-40 bg-red-500 hover:bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transform hover:scale-105 transition-all duration-200">
          <AlertCircle className="w-16 h-16 mb-3" />
          <span className="font-bold text-2xl">SOS</span>
        </button>
      </div>
      <p className="text-center text-gray-600 text-sm mb-8">Press in case of emergency</p>

      {/* Emergency Contacts */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-900 text-lg">Trusted Contacts</h2>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Add Contact Form */}
        {showForm && (
          <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-5 mb-6 border border-blue-100 shadow-sm">
            <form onSubmit={handleAddContact} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <input
                type="text"
                placeholder="Contact name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />

              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />

              <input
                type="text"
                placeholder="Relationship (e.g., Brother, Friend)"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 text-sm"
                >
                  {submitting ? 'Adding...' : 'Add Contact'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contacts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 text-sm mt-3">Loading contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
            <p className="text-gray-600 font-medium mb-1">No emergency contacts yet</p>
            <p className="text-sm text-gray-500">Add your first trusted contact using the + button</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{contact.name}</p>
                    <p className="text-xs text-gray-600">{contact.relationship}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`tel:${contact.phone}`}
                    className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-2.5 transition-colors"
                    title="Call contact"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </a>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2.5 transition-colors"
                    title="Delete contact"
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
