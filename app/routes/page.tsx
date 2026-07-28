'use client'

import { useState } from 'react'
import { ArrowRightLeft, MapPin, IndianRupee } from 'lucide-react'

const bengaluruRoutes = [
  {
    id: 1,
    type: 'Fastest',
    time: '32 min',
    distance: '12.5 km',
    modes: ['500D', 'Purple Line'],
    price: '45',
    tag: 'Fastest',
  },
  {
    id: 2,
    type: 'Metro Only',
    time: '40 min',
    distance: '14.2 km',
    modes: ['5 min walk', 'Purple Line', 'Green Line'],
    price: '35',
    tag: 'Metro Only',
  },
  {
    id: 3,
    type: 'Bus Only',
    time: '55 min',
    distance: '15.8 km',
    modes: ['500D', '356'],
    price: '25',
    tag: 'Bus Only',
  },
  {
    id: 4,
    type: 'Express Route',
    time: '28 min',
    distance: '18 km',
    modes: ['Route 245 Express'],
    price: '50',
    tag: 'Quick',
  },
]

const bengaluruLocations = [
  'Whitefield',
  'Electronic City',
  'Indiranagar',
  'Koramangala',
  'MG Road',
  'Majestic',
  'Marathahalli',
  'Bannerghatta Road',
  'BTM Layout',
  'Cubbon Park',
]

export default function RoutesPage() {
  const [from, setFrom] = useState('Majestic Bus Stand')
  const [to, setTo] = useState('Where to?')
  const [showFromList, setShowFromList] = useState(false)
  const [showToList, setShowToList] = useState(false)

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Location Selection Card */}
      <div className="px-4 pt-6 pb-8">
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-4 border border-gray-100">
          {/* From */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFromList(!showFromList)
                setShowToList(false)
              }}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
                <span className="text-gray-600 text-sm">{from}</span>
              </div>
            </button>

            {showFromList && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                {bengaluruLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setFrom(location)
                      setShowFromList(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 text-sm text-gray-700"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100"></div>

          {/* To */}
          <div className="relative">
            <button
              onClick={() => {
                setShowToList(!showToList)
                setShowFromList(false)
              }}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></div>
                <span className="text-gray-600 text-sm">{to}</span>
              </div>
            </button>

            {showToList && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                {bengaluruLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setTo(location)
                      setShowToList(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 text-sm text-gray-700"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-end pt-2">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors flex-shrink-0">
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Routes */}
      <div className="px-4">
        <h2 className="font-semibold text-gray-900 mb-5 text-lg">Recommended Routes</h2>

        <div className="space-y-4">
          {bengaluruRoutes.map((route) => (
            <div key={route.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-blue-200 cursor-pointer transition-all">
              {/* Tag */}
              <div className="mb-3">
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                    route.tag === 'Fastest'
                      ? 'bg-green-100 text-green-700'
                      : route.tag === 'Metro Only'
                        ? 'bg-purple-100 text-purple-700'
                        : route.tag === 'Bus Only'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-teal-100 text-teal-700'
                  }`}
                >
                  {route.tag}
                </span>
              </div>

              {/* Time and Distance */}
              <div className="flex items-end gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">{route.time}</span>
                <span className="text-sm text-gray-600 mb-1">{route.distance}</span>
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
      </div>
    </div>
  )
}
