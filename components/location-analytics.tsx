"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { MapPin, Users, TrendingUp } from "lucide-react"
import { useLocation } from "@/contexts/location-context"

interface CountryStats {
  country: string
  count: number
  percentage: number
}

export function LocationAnalytics() {
  const { location } = useLocation()
  const [countryStats, setCountryStats] = useState<CountryStats[]>([])
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    // Process location data from localStorage
    const processLocationData = () => {
      const existingData = localStorage.getItem("userLocations")
      if (!existingData) return

      const locations = JSON.parse(existingData)
      const countryMap = new Map<string, number>()

      locations.forEach((loc: { country: string }) => {
        if (loc.country && loc.country !== "Unknown") {
          countryMap.set(loc.country, (countryMap.get(loc.country) || 0) + 1)
        }
      })

      const total = Array.from(countryMap.values()).reduce((sum, count) => sum + count, 0)
      setTotalUsers(total)

      const stats = Array.from(countryMap.entries())
        .map(([country, count]) => ({
          country,
          count,
          percentage: total > 0 ? (count / total) * 100 : 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      setCountryStats(stats)
    }

    processLocationData()

    // Update every 30 seconds
    const interval = setInterval(processLocationData, 30000)
    return () => clearInterval(interval)
  }, [location])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">User Analytics by Location</h2>
        {location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location.country}</span>
          </div>
        )}
      </div>

      <Card className="p-4 bg-card">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">Total Users Tracked</span>
        </div>
        <p className="text-3xl font-bold text-foreground">{totalUsers}</p>
      </Card>

      {countryStats.length > 0 && (
        <Card className="p-4 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Top Countries</h3>
          </div>
          <div className="space-y-3">
            {countryStats.map((stat, index) => (
              <div key={stat.country} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {index + 1}. {stat.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{stat.count} users</span>
                    <span className="font-semibold text-primary">{stat.percentage.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
