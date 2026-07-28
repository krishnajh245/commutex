'use client'

import { useAuth } from '@/lib/auth-context'
import { BottomNav } from '@/components/BottomNav'
import Link from 'next/link'
import { SearchIcon, Mic, Bus, Zap, MapPin } from 'lucide-react'
import { useState } from 'react'

const busRoutes = [
  { id: '500D', from: 'Whitefield', to: 'Majestic', time: '45 min', distance: '28 km' },
  { id: '356', from: 'Electronic City', to: 'MG Road', time: '38 min', distance: '22 km' },
  { id: '245', from: 'Indiranagar', to: 'Koramangala', time: '28 min', distance: '12 km' },
]

const smartLocations = [
  { icon: '💼', label: 'Office', description: 'MG Road · 35 min' },
  { icon: '🏠', label: 'Home', description: 'Koramangala · 25 min' },
]

export default function HomePage() {
  const { user } = useAuth()
  const [searchFocus, setSearchFocus] = useState(false)

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header with greeting */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-400 text-white pt-6 pb-8 px-4">
        <p className="text-sm font-medium opacity-90">Good morning</p>
        <h1 className="text-2xl font-bold">{user?.name || 'Guest'}</h1>
      </div>

      {/* Search box */}
      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-2">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search destination..."
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <Mic className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Live Bus Tracking */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Bus className="w-5 h-5 text-blue-500" />
            <h2 className="font-bold text-gray-900">Live Bus Tracking</h2>
          </div>
          <Link href="/routes" className="text-blue-500 text-sm font-medium hover:underline">
            See All →
          </Link>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4">
          {busRoutes[0] && (
            <div className="flex justify-between items-center">
              <div>
                <div className="inline-block bg-blue-500 text-white font-bold px-3 py-1 rounded-lg text-sm mb-2">
                  {busRoutes[0].id}
                </div>
                <p className="font-semibold text-gray-900">
                  {busRoutes[0].from} → {busRoutes[0].to}
                </p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold">{busRoutes[0].time}</p>
                <p className="text-xs text-gray-600">away</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metro Status */}
      <div className="px-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-purple-500" />
          <h2 className="font-bold text-gray-900">Metro Status</h2>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="font-medium text-gray-900">Purple Line</span>
            </div>
            <span className="text-sm font-medium text-teal-600">On Time</span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-gray-900">Green Line</span>
            </div>
            <span className="text-sm font-medium text-orange-500">5 min delay</span>
          </div>
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="px-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">💡</span>
          <h2 className="font-bold text-gray-900">Smart Suggestions</h2>
        </div>

        <div className="space-y-3">
          {smartLocations.map((location) => (
            <div key={location.label} className="flex items-center justify-between bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-lg">
                  {location.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{location.label}</p>
                  <p className="text-xs text-gray-600">{location.description}</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

HomePage.requireAuth = true
