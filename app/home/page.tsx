'use client'

import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { SearchIcon, Mic, Bus, Zap } from 'lucide-react'
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

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header with greeting - Blue gradient */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white pt-8 pb-12 px-4 rounded-b-3xl">
        <p className="text-sm font-medium opacity-95 mb-1">Good morning</p>
        <h1 className="text-3xl font-bold">{user?.name || 'Guest'}</h1>
      </div>

      {/* Search box - floating style */}
      <div className="px-4 -mt-8 mb-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <SearchIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Where to today?"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
            <Mic className="w-5 h-5 text-gray-400 flex-shrink-0 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>

      {/* Live Bus Tracking */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bus className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-900 text-lg">Live Bus Tracking</h2>
          </div>
          <Link href="/routes" className="text-blue-600 text-sm font-medium hover:text-blue-700">
            See All
          </Link>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          {busRoutes[0] && (
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="inline-block bg-blue-600 text-white font-bold px-3 py-1 rounded-lg text-sm mb-3">
                  {busRoutes[0].id}
                </div>
                <p className="font-semibold text-gray-900 text-sm">
                  {busRoutes[0].from} → {busRoutes[0].to}
                </p>
              </div>
              <div className="text-right">
                <p className="text-teal-600 font-bold text-sm">{busRoutes[0].time}</p>
                <p className="text-xs text-gray-600">away</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metro Status */}
      <div className="px-4 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="font-semibold text-gray-900 text-lg">Metro Status</h2>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
              <span className="font-medium text-gray-900 text-sm">Purple Line</span>
            </div>
            <span className="text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">On Time</span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
              <span className="font-medium text-gray-900 text-sm">Green Line</span>
            </div>
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">5 min delay</span>
          </div>
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="px-4 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
            💡
          </div>
          <h2 className="font-semibold text-gray-900 text-lg">Smart Suggestions</h2>
        </div>

        <div className="space-y-3">
          {smartLocations.map((location) => (
            <Link key={location.label} href="/routes" className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-50 hover:from-blue-100 hover:to-blue-100 rounded-xl p-4 border border-blue-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                  {location.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{location.label}</p>
                  <p className="text-xs text-gray-600">{location.description}</p>
                </div>
              </div>
              <span className="text-gray-400 flex-shrink-0">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

HomePage.requireAuth = true
