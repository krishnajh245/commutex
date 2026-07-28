'use client'

import { useState, useEffect } from 'react'
import { ArrowRightLeft, ChevronDown } from 'lucide-react'
import { bengaluruLocations } from '@/lib/routes-data'

interface RouteOption {
  id: string
  from: string
  to: string
  distance: number
  time: number
  modes: string[]
  price: number
  type: 'Fastest' | 'Metro Only' | 'Bus Only' | 'Express' | 'Mixed'
}

export default function RoutesPage() {
  const [from, setFrom] = useState('Majestic Bus Stand')
  const [to, setTo] = useState('Indiranagar')
  const [routes, setRoutes] = useState<RouteOption[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Get location names from bengaluruLocations
  const locationNames = bengaluruLocations.map(loc => loc.name)

  // Search routes whenever from and to change
  useEffect(() => {
    if (from && to && from !== to) {
      searchRoutes(from, to)
    }
  }, [from, to])

  const searchRoutes = async (fromLocation: string, toLocation: string) => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(
        `/api/routes/search?from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}`
      )
      
      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to search routes')
        setRoutes([])
        return
      }

      const data = await response.json()
      setRoutes(data.routes || [])
    } catch (err) {
      console.error('[v0] Error searching routes:', err)
      setError('Failed to search routes')
      setRoutes([])
    } finally {
      setLoading(false)
    }
  }

  const handleSwapLocations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Location Selection Card */}
      <div className="px-4 pt-6 pb-8">
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-4 border border-gray-100">
          {/* From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              {locationNames.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100"></div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              {locationNames.filter(loc => loc !== from).map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-end pt-2">
            <button 
              onClick={handleSwapLocations}
              className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors flex-shrink-0"
              title="Swap locations"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Routes */}
      <div className="px-4">
        <div className="mb-4">
          <h3 className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{from}</span>
            <span className="mx-2">→</span>
            <span className="font-medium text-gray-900">{to}</span>
          </h3>
        </div>

        <h2 className="font-semibold text-gray-900 mb-5 text-lg">Recommended Routes</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 text-sm mt-3">Searching for routes...</p>
          </div>
        ) : routes.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-100">
            <p className="text-gray-600 font-medium mb-1">No routes found</p>
            <p className="text-sm text-gray-500">No available routes between these locations</p>
          </div>
        ) : (
          <div className="space-y-4">
            {routes.map((route) => (
              <div key={route.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-blue-200 cursor-pointer transition-all">
                {/* Tag */}
                <div className="mb-3">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                      route.type === 'Fastest'
                        ? 'bg-green-100 text-green-700'
                        : route.type === 'Metro Only'
                          ? 'bg-purple-100 text-purple-700'
                          : route.type === 'Bus Only'
                            ? 'bg-blue-100 text-blue-700'
                            : route.type === 'Express'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-teal-100 text-teal-700'
                    }`}
                  >
                    {route.type}
                  </span>
                </div>

                {/* Time and Distance */}
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900">{route.time} min</span>
                  <span className="text-sm text-gray-600 mb-1">{route.distance} km</span>
                </div>

                {/* Modes - Horizontal layout */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {route.modes.map((mode, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium">
                        {mode}
                      </span>
                      {idx < route.modes.length - 1 && <span className="text-gray-400 text-sm">→</span>}
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-1 text-blue-600 font-bold text-lg">
                  <span>₹</span>
                  <span>{route.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
