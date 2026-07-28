'use client'

import { BottomNav } from '@/components/BottomNav'
import { useState } from 'react'
import { ArrowRightLeft, MapPin, Clock, IndianRupee } from 'lucide-react'

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
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-400 text-white pt-6 pb-8 px-4">
        <h1 className="text-2xl font-bold">Find Routes</h1>
      </div>

      {/* Location Selection */}
      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
          {/* From */}
          <div className="relative">
            <label className="flex items-center gap-2 text-gray-600 text-xs font-medium mb-2">
              <MapPin className="w-4 h-4" />
              From
            </label>
            <button
              onClick={() => {
                setShowFromList(!showFromList)
                setShowToList(false)
              }}
              className="w-full text-left px-3 py-2 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-900">{from}</span>
              </div>
            </button>

            {showFromList && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {bengaluruLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setFrom(location)
                      setShowFromList(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors border-b border-gray-200 last:border-b-0"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-500 p-2 rounded-full transition-colors">
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* To */}
          <div className="relative">
            <label className="flex items-center gap-2 text-gray-600 text-xs font-medium mb-2">
              <MapPin className="w-4 h-4" />
              To
            </label>
            <button
              onClick={() => {
                setShowToList(!showToList)
                setShowFromList(false)
              }}
              className="w-full text-left px-3 py-2 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-gray-900">{to}</span>
              </div>
            </button>

            {showToList && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {bengaluruLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setTo(location)
                      setShowToList(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors border-b border-gray-200 last:border-b-0"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Routes */}
      <div className="px-4 mb-8">
        <h2 className="font-bold text-lg text-gray-900 mb-4">Recommended Routes</h2>

        <div className="space-y-4">
          {bengaluruRoutes.map((route) => (
            <div key={route.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
              {/* Tag */}
              <div className="mb-3">
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                    route.tag === 'Fastest'
                      ? 'bg-green-100 text-green-700'
                      : route.tag === 'Metro Only'
                        ? 'bg-blue-100 text-blue-700'
                        : route.tag === 'Bus Only'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-teal-100 text-teal-700'
                  }`}
                >
                  {route.tag}
                </span>
              </div>

              {/* Time and Distance */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-gray-900">{route.time}</span>
                <span className="text-gray-600">{route.distance}</span>
              </div>

              {/* Modes */}
              <div className="flex flex-wrap gap-2 mb-4">
                {route.modes.map((mode, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    {idx > 0 && <span className="text-gray-400">→</span>}
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium">
                      {mode}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center gap-1 text-blue-600 font-bold text-lg">
                <IndianRupee className="w-4 h-4" />
                {route.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
