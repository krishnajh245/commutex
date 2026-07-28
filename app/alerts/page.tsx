'use client'

import { BottomNav } from '@/components/BottomNav'
import { AlertCircle, Info, TrendingUp, Clock, CheckCircle } from 'lucide-react'

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Heavy Traffic Alert',
    description: 'Purple Line has heavy congestion. Consider using alternative routes.',
    time: '10 minutes ago',
    icon: AlertCircle,
  },
  {
    id: 2,
    type: 'info',
    title: 'Route 500D Delay',
    description: 'Route 500D is running 8 minutes late due to traffic.',
    time: '25 minutes ago',
    icon: Clock,
  },
  {
    id: 3,
    type: 'success',
    title: 'Green Line On Schedule',
    description: 'Green Line is running on time. No delays reported.',
    time: '1 hour ago',
    icon: CheckCircle,
  },
  {
    id: 4,
    type: 'info',
    title: 'Service Update',
    description: 'Maintenance work scheduled on Route 245 from 2-5 PM.',
    time: '2 hours ago',
    icon: Info,
  },
  {
    id: 5,
    type: 'warning',
    title: 'Peak Hours Alert',
    description: 'High passenger volume expected during peak hours (8-10 AM).',
    time: '3 hours ago',
    icon: TrendingUp,
  },
]

export default function AlertsPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-400 text-white pt-6 pb-8 px-4">
        <h1 className="text-2xl font-bold">Alerts & Updates</h1>
        <p className="text-blue-100 text-sm mt-2">Stay informed about your commute</p>
      </div>

      {/* Alerts List */}
      <div className="px-4 pt-6">
        <div className="space-y-3">
          {alerts.map((alert) => {
            const IconComponent = alert.icon
            const bgColor = alert.type === 'warning' ? 'bg-red-50' : alert.type === 'success' ? 'bg-green-50' : 'bg-blue-50'
            const borderColor = alert.type === 'warning' ? 'border-red-200' : alert.type === 'success' ? 'border-green-200' : 'border-blue-200'
            const iconColor = alert.type === 'warning' ? 'text-red-500' : alert.type === 'success' ? 'text-green-500' : 'text-blue-500'

            return (
              <div
                key={alert.id}
                className={`${bgColor} ${borderColor} rounded-xl p-4 border transition-all hover:shadow-md cursor-pointer`}
              >
                <div className="flex gap-4">
                  <div className={`${iconColor} flex-shrink-0 mt-1`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm">{alert.title}</h3>
                    <p className="text-gray-700 text-sm mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Empty state for no new alerts */}
      <div className="px-4 mt-12">
        <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
          <div className="mb-4">
            <div className="inline-block bg-blue-100 rounded-full p-4">
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-1">All Clear!</h3>
          <p className="text-gray-600 text-sm">You are subscribed to important commute updates</p>
        </div>
      </div>

      {/* Alert Preferences Info */}
      <div className="px-4 mt-8 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs font-medium text-blue-900 mb-2">💡 Tip</p>
          <p className="text-sm text-blue-900">
            Enable push notifications in your phone settings to get real-time alerts about traffic, delays, and service updates.
          </p>
        </div>
      </div>
    </div>
  )
}
