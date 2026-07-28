export interface BengaluruLocation {
  id: string
  name: string
  area: string
  latitude: number
  longitude: number
}

export interface RouteOption {
  id: string
  from: string
  to: string
  distance: number
  time: number
  modes: string[]
  price: number
  type: 'Fastest' | 'Metro Only' | 'Bus Only' | 'Express' | 'Mixed'
}

export const bengaluruLocations: BengaluruLocation[] = [
  { id: 'whitefield', name: 'Whitefield', area: 'East Bangalore', latitude: 12.9698, longitude: 77.7499 },
  { id: 'indiranagar', name: 'Indiranagar', area: 'East Bangalore', latitude: 13.0018, longitude: 77.6431 },
  { id: 'electronic-city', name: 'Electronic City', area: 'South Bangalore', latitude: 12.8387, longitude: 77.6701 },
  { id: 'mg-road', name: 'MG Road', area: 'Central Bangalore', latitude: 12.9352, longitude: 77.6245 },
  { id: 'koramangala', name: 'Koramangala', area: 'South Bangalore', latitude: 12.9352, longitude: 77.6245 },
  { id: 'majestic', name: 'Majestic Bus Stand', area: 'Central Bangalore', latitude: 12.9718, longitude: 77.5681 },
  { id: 'silk-board', name: 'Silk Board Junction', area: 'South Bangalore', latitude: 12.9299, longitude: 77.6388 },
  { id: 'marathon', name: 'Marathon Junction', area: 'West Bangalore', latitude: 12.9687, longitude: 77.5703 },
  { id: 'bellandur', name: 'Bellandur', area: 'East Bangalore', latitude: 12.9352, longitude: 77.7280 },
  { id: 'sarjapur', name: 'Sarjapur Road', area: 'South Bangalore', latitude: 12.8882, longitude: 77.6461 },
  { id: 'mekhri-circle', name: 'Mekhri Circle', area: 'East Bangalore', latitude: 12.9718, longitude: 77.5938 },
  { id: 'yeswanthpur', name: 'Yeswanthpur', area: 'West Bangalore', latitude: 13.0015, longitude: 77.5821 },
  { id: 'vidhana-soudha', name: 'Vidhana Soudha', area: 'Central Bangalore', latitude: 12.9929, longitude: 77.5901 },
  { id: 'cubbon-park', name: 'Cubbon Park', area: 'Central Bangalore', latitude: 12.9972, longitude: 77.5939 },
  { id: 'ulsoor', name: 'Ulsoor', area: 'Central Bangalore', latitude: 12.9822, longitude: 77.6100 },
  { id: 'jayanagar', name: 'Jayanagar', area: 'South Bangalore', latitude: 12.9352, longitude: 77.5904 },
  { id: 'basavanagudi', name: 'Basavanagudi', area: 'South Bangalore', latitude: 12.9352, longitude: 77.5703 },
  { id: 'bt-road', name: 'BT Road', area: 'South Bangalore', latitude: 12.9352, longitude: 77.6245 },
  { id: 'frazer-town', name: 'Frazer Town', area: 'East Bangalore', latitude: 13.0050, longitude: 77.5943 },
  { id: 'austin-town', name: 'Austin Town', area: 'Central Bangalore', latitude: 12.9845, longitude: 77.5950 },
  { id: 'rajajinagar', name: 'Rajajinagar', area: 'West Bangalore', latitude: 13.0010, longitude: 77.5725 },
  { id: 'kachanayakanahalli', name: 'Kachanayakanahalli', area: 'North Bangalore', latitude: 13.1156, longitude: 77.6265 },
  { id: 'marathahalli', name: 'Marathahalli', area: 'East Bangalore', latitude: 12.9593, longitude: 77.7150 },
  { id: 'yelahanka', name: 'Yelahanka', area: 'North Bangalore', latitude: 13.0800, longitude: 77.5965 },
  { id: 'cv-raman-nagar', name: 'CV Raman Nagar', area: 'East Bangalore', latitude: 12.9718, longitude: 77.6373 },
  { id: 'yeshwantpur-station', name: 'Yeswanthpur Railway Station', area: 'West Bangalore', latitude: 13.0015, longitude: 77.5821 },
  { id: 'kempegowda-airport', name: 'Kempegowda Airport', area: 'North Bangalore', latitude: 13.1939, longitude: 77.7068 },
]

export const bengaluruRoutes: RouteOption[] = [
  // Whitefield to other areas
  { id: 'wr-1', from: 'Whitefield', to: 'Majestic Bus Stand', distance: 28, time: 45, modes: ['500D Bus'], price: 45, type: 'Bus Only' },
  { id: 'wr-2', from: 'Whitefield', to: 'Indiranagar', distance: 12, time: 25, modes: ['Purple Line Metro', 'Walk'], price: 30, type: 'Metro Only' },
  { id: 'wr-3', from: 'Whitefield', to: 'MG Road', distance: 18, time: 35, modes: ['330 Bus'], price: 35, type: 'Bus Only' },
  
  // Indiranagar to other areas
  { id: 'ir-1', from: 'Indiranagar', to: 'Whitefield', distance: 12, time: 25, modes: ['Purple Line Metro', 'Walk'], price: 30, type: 'Metro Only' },
  { id: 'ir-2', from: 'Indiranagar', to: 'Majestic Bus Stand', distance: 8, time: 20, modes: ['Purple Line Metro'], price: 25, type: 'Metro Only' },
  { id: 'ir-3', from: 'Indiranagar', to: 'Electronic City', distance: 22, time: 50, modes: ['130 Bus'], price: 40, type: 'Bus Only' },
  { id: 'ir-4', from: 'Indiranagar', to: 'Koramangala', distance: 10, time: 28, modes: ['142 Bus'], price: 28, type: 'Bus Only' },
  
  // Electronic City to other areas
  { id: 'ec-1', from: 'Electronic City', to: 'Indiranagar', distance: 22, time: 50, modes: ['130 Bus'], price: 40, type: 'Bus Only' },
  { id: 'ec-2', from: 'Electronic City', to: 'Majestic Bus Stand', distance: 30, time: 65, modes: ['356 Bus'], price: 50, type: 'Bus Only' },
  { id: 'ec-3', from: 'Electronic City', to: 'MG Road', distance: 18, time: 42, modes: ['112 Bus'], price: 35, type: 'Bus Only' },
  { id: 'ec-4', from: 'Electronic City', to: 'Koramangala', distance: 15, time: 35, modes: ['130 Bus'], price: 32, type: 'Bus Only' },
  
  // Majestic Bus Stand to other areas
  { id: 'mb-1', from: 'Majestic Bus Stand', to: 'Whitefield', distance: 28, time: 45, modes: ['500D Bus'], price: 45, type: 'Bus Only' },
  { id: 'mb-2', from: 'Majestic Bus Stand', to: 'Indiranagar', distance: 8, time: 20, modes: ['Purple Line Metro'], price: 25, type: 'Metro Only' },
  { id: 'mb-3', from: 'Majestic Bus Stand', to: 'MG Road', distance: 5, time: 15, modes: ['Walk', 'Purple Line Metro'], price: 20, type: 'Metro Only' },
  { id: 'mb-4', from: 'Majestic Bus Stand', to: 'Electronic City', distance: 30, time: 65, modes: ['356 Bus'], price: 50, type: 'Bus Only' },
  { id: 'mb-5', from: 'Majestic Bus Stand', to: 'Koramangala', distance: 10, time: 28, modes: ['142 Bus'], price: 30, type: 'Bus Only' },
  
  // MG Road to other areas
  { id: 'mgr-1', from: 'MG Road', to: 'Whitefield', distance: 18, time: 35, modes: ['330 Bus'], price: 35, type: 'Bus Only' },
  { id: 'mgr-2', from: 'MG Road', to: 'Indiranagar', distance: 10, time: 22, modes: ['142 Bus'], price: 28, type: 'Bus Only' },
  { id: 'mgr-3', from: 'MG Road', to: 'Electronic City', distance: 18, time: 42, modes: ['112 Bus'], price: 35, type: 'Bus Only' },
  { id: 'mgr-4', from: 'MG Road', to: 'Majestic Bus Stand', distance: 5, time: 15, modes: ['Purple Line Metro', 'Walk'], price: 20, type: 'Metro Only' },
  { id: 'mgr-5', from: 'MG Road', to: 'Koramangala', distance: 12, time: 30, modes: ['142 Bus'], price: 30, type: 'Bus Only' },
  
  // Koramangala to other areas
  { id: 'kr-1', from: 'Koramangala', to: 'Whitefield', distance: 20, time: 38, modes: ['142 Bus', 'Walk'], price: 32, type: 'Bus Only' },
  { id: 'kr-2', from: 'Koramangala', to: 'Indiranagar', distance: 10, time: 28, modes: ['142 Bus'], price: 28, type: 'Bus Only' },
  { id: 'kr-3', from: 'Koramangala', to: 'Electronic City', distance: 15, time: 35, modes: ['130 Bus'], price: 32, type: 'Bus Only' },
  { id: 'kr-4', from: 'Koramangala', to: 'Majestic Bus Stand', distance: 10, time: 28, modes: ['142 Bus'], price: 30, type: 'Bus Only' },
  { id: 'kr-5', from: 'Koramangala', to: 'MG Road', distance: 12, time: 30, modes: ['142 Bus'], price: 30, type: 'Bus Only' },
  
  // Bellandur to other areas
  { id: 'bl-1', from: 'Bellandur', to: 'Whitefield', distance: 8, time: 18, modes: ['Walk', 'Auto'], price: 15, type: 'Fastest' },
  { id: 'bl-2', from: 'Bellandur', to: 'Marathahalli', distance: 5, time: 12, modes: ['Auto'], price: 20, type: 'Fastest' },
  { id: 'bl-3', from: 'Bellandur', to: 'Electronic City', distance: 20, time: 45, modes: ['130 Bus'], price: 38, type: 'Bus Only' },
  
  // Silk Board to other areas
  { id: 'sb-1', from: 'Silk Board Junction', to: 'Koramangala', distance: 8, time: 20, modes: ['Walk', 'Auto'], price: 18, type: 'Fastest' },
  { id: 'sb-2', from: 'Silk Board Junction', to: 'Electronic City', distance: 12, time: 28, modes: ['130 Bus'], price: 30, type: 'Bus Only' },
  { id: 'sb-3', from: 'Silk Board Junction', to: 'MG Road', distance: 15, time: 35, modes: ['142 Bus'], price: 32, type: 'Bus Only' },
  
  // Marathon Junction to other areas
  { id: 'mj-1', from: 'Marathon Junction', to: 'Yeswanthpur', distance: 8, time: 18, modes: ['Auto', 'Walk'], price: 20, type: 'Fastest' },
  { id: 'mj-2', from: 'Marathon Junction', to: 'Rajajinagar', distance: 5, time: 12, modes: ['Auto', 'Walk'], price: 15, type: 'Fastest' },
  { id: 'mj-3', from: 'Marathon Junction', to: 'Majestic Bus Stand', distance: 8, time: 20, modes: ['150 Bus'], price: 25, type: 'Bus Only' },
]

export function searchRoutes(from: string, to: string): RouteOption[] {
  // Normalize location names
  const fromName = from.trim().toLowerCase()
  const toName = to.trim().toLowerCase()

  // Find exact matches first
  let matches = bengaluruRoutes.filter(
    route =>
      route.from.toLowerCase() === fromName &&
      route.to.toLowerCase() === toName
  )

  // If exact matches found, return them sorted by type (Fastest first)
  if (matches.length > 0) {
    return matches.sort((a, b) => {
      const typeOrder = { 'Fastest': 0, 'Metro Only': 1, 'Mixed': 2, 'Express': 3, 'Bus Only': 4 }
      return (typeOrder[a.type] || 5) - (typeOrder[b.type] || 5)
    })
  }

  // If no exact match, generate synthetic route with realistic data
  const distance = 15 + Math.random() * 20
  const baseTime = 20 + (distance / 1.2)
  const time = Math.round(baseTime)
  
  // Determine modes based on distance
  let modes: string[] = []
  let type: 'Fastest' | 'Metro Only' | 'Bus Only' | 'Express' | 'Mixed' = 'Bus Only'
  
  if (distance < 8) {
    modes = ['Walk', 'Auto']
    type = 'Fastest'
  } else if (distance < 15) {
    modes = ['Auto', 'Bus']
    type = 'Express'
  } else {
    modes = ['Bus']
    type = 'Bus Only'
  }

  // Calculate price based on distance
  const price = Math.round(15 + (distance * 1.5))

  return [
    {
      id: `synthetic-${Date.now()}`,
      from,
      to,
      distance: Math.round(distance * 10) / 10,
      time,
      modes,
      price,
      type,
    }
  ]
}
