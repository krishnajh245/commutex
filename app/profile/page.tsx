'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { LogOut, MapPin, Plus, Trash2, Edit2 } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

interface SavedLocation {
  id: string
  type: string
  name: string
  address: string
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [locations, setLocations] = useState<SavedLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'Home',
    name: '',
    address: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchLocations()
  }, [])

  async function fetchLocations() {
    try {
      const response = await fetch('/api/locations')
      if (response.ok) {
        const data = await response.json()
        setLocations(data)
      }
    } catch (err) {
      console.error('[v0] Fetch locations error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddLocation(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to add location')
      }

      const newLocation = await response.json()
      setLocations([...locations, newLocation])
      setFormData({ type: 'Home', name: '', address: '' })
      setShowForm(false)
    } catch (err: any) {
      setError(err.message || 'Failed to add location')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteLocation(locationId: string) {
    try {
      const response = await fetch(`/api/locations?id=${locationId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setLocations(locations.filter((l) => l.id !== locationId))
      }
    } catch (err) {
      console.error('[v0] Delete location error:', err)
    }
  }

  async function handleLogout() {
    try {
      await logout()
      router.push('/')
    } catch (err) {
      console.error('[v0] Logout error:', err)
    }
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-400 text-white pt-6 pb-8 px-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {/* User Info Card */}
      <div className="px-4 -mt-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-blue-100 text-sm">{user?.email}</p>
            </div>
          </div>
          <p className="text-blue-100 text-sm">Phone: {user?.phone}</p>
        </div>
      </div>

      {/* Saved Locations */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <h2 className="font-bold text-lg text-gray-900">Saved Locations</h2>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Add Location Form */}
        {showForm && (
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
            <form onSubmit={handleAddLocation} className="space-y-3">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Location name (e.g., Koramangala)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="text"
                placeholder="Full address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Save Location'}
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

        {/* Locations List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : locations.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-6 text-center mb-8">
            <p className="text-gray-600 mb-2">No saved locations yet</p>
            <p className="text-sm text-gray-500">Save your favorite locations to access them quickly</p>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {location.type}
                    </span>
                    <p className="font-semibold text-gray-900">{location.name}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{location.address}</p>
                </div>

                <button
                  onClick={() => handleDeleteLocation(location.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2 transition-colors ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="px-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
