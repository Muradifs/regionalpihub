"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LocationData {
  country: string
  latitude: number
  longitude: number
  timestamp: number
  isNode?: boolean
  nodeType?: "full" | "light" | "validator"
}

interface LocationContextType {
  location: LocationData | null
  isLoading: boolean
  error: string | null
  requestLocation: () => void
  registerNode: (nodeType: "full" | "light" | "validator") => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

function getCountryFromCoordinates(lat: number, lng: number): string {
  // Slovenia
  if (lat >= 45.4 && lat <= 46.9 && lng >= 13.4 && lng <= 16.6) return "Slovenia"
  // Croatia
  if (lat >= 42.4 && lat <= 46.6 && lng >= 13.5 && lng <= 19.5) return "Croatia"
  // Bosnia and Herzegovina
  if (lat >= 42.5 && lat <= 45.3 && lng >= 15.7 && lng <= 19.7) return "Bosnia and Herzegovina"
  // Serbia
  if (lat >= 42.2 && lat <= 46.2 && lng >= 18.8 && lng <= 23.0) return "Serbia"
  // Montenegro
  if (lat >= 41.8 && lat <= 43.6 && lng >= 18.4 && lng <= 20.4) return "Montenegro"
  // North Macedonia
  if (lat >= 40.8 && lat <= 42.4 && lng >= 20.4 && lng <= 23.0) return "North Macedonia"
  // Albania
  if (lat >= 39.6 && lat <= 42.7 && lng >= 19.3 && lng <= 21.1) return "Albania"
  // Kosovo
  if (lat >= 41.8 && lat <= 43.3 && lng >= 20.0 && lng <= 21.8) return "Kosovo"
  // Bulgaria
  if (lat >= 41.2 && lat <= 44.2 && lng >= 22.3 && lng <= 28.6) return "Bulgaria"
  // Romania
  if (lat >= 43.6 && lat <= 48.3 && lng >= 20.2 && lng <= 29.7) return "Romania"
  // Greece
  if (lat >= 34.8 && lat <= 41.8 && lng >= 19.4 && lng <= 28.2) return "Greece"
  // Hungary
  if (lat >= 45.7 && lat <= 48.6 && lng >= 16.1 && lng <= 22.9) return "Hungary"
  // Austria
  if (lat >= 46.4 && lat <= 49.0 && lng >= 9.5 && lng <= 17.2) return "Austria"
  // Italy (Northern region)
  if (lat >= 35.5 && lat <= 47.1 && lng >= 6.6 && lng <= 18.5) return "Italy"

  return "Unknown"
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const country = getCountryFromCoordinates(position.coords.latitude, position.coords.longitude)

        const locationData: LocationData = {
          country,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: Date.now(),
        }

        setLocation(locationData)
        setIsLoading(false)

        // Store in localStorage for analytics
        const existingData = localStorage.getItem("userLocations")
        const locations = existingData ? JSON.parse(existingData) : []
        locations.push(locationData)
        localStorage.setItem("userLocations", JSON.stringify(locations))
      },
      (error) => {
        setError(error.message)
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  }

  const registerNode = (nodeType: "full" | "light" | "validator") => {
    if (!location) {
      console.warn("Location not available. Request location first.")
      return
    }

    const nodeData: LocationData = {
      ...location,
      isNode: true,
      nodeType,
      timestamp: Date.now(),
    }

    // Store Pi Node data separately
    const existingNodes = localStorage.getItem("piNodes")
    const nodes = existingNodes ? JSON.parse(existingNodes) : []
    nodes.push(nodeData)
    localStorage.setItem("piNodes", JSON.stringify(nodes))

    setLocation(nodeData)
  }

  useEffect(() => {
    // Auto-request location on mount (with user consent)
    requestLocation()
  }, [])

  return (
    <LocationContext.Provider value={{ location, isLoading, error, requestLocation, registerNode }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
