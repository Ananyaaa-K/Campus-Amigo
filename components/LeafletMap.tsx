"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon issues in Webpack/Next.js
const fixLeafletIcons = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
};

export default function LeafletMap({ points }: { points?: { lat: number, lng: number, title: string, description?: string }[] }) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<L.Map | null>(null)
    const markersRef = useRef<L.Marker[]>([])

    useEffect(() => {
        // Run fix only once strictly on client
        fixLeafletIcons()

        if (mapRef.current && !mapInstance.current) {
            // Default center (Jaipur)
            const map = L.map(mapRef.current).setView([26.9124, 75.7873], 13)

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map)

            mapInstance.current = map
        }

        // Update markers when points change
        if (mapInstance.current) {
            // Clear existing markers
            markersRef.current.forEach(marker => marker.remove())
            markersRef.current = []

            const map = mapInstance.current

            if (points && points.length > 0) {
                const bounds = L.latLngBounds([])

                points.forEach(point => {
                    if (point.lat && point.lng) {
                        const marker = L.marker([point.lat, point.lng])
                            .addTo(map)
                            .bindPopup(`<b>${point.title}</b><br>${point.description || ''}`)

                        markersRef.current.push(marker)
                        bounds.extend([point.lat, point.lng])
                    }
                })

                // Fit bounds if we have points
                if (bounds.isValid()) {
                    map.fitBounds(bounds, { padding: [50, 50] })
                }
            } else {
                // Default marker for Campus Amigo HQ if no specific points
                const marker = L.marker([26.9124, 75.7873]).addTo(map)
                    .bindPopup('<b>Campus Amigo HQ</b><br>Jaipur, India')
                markersRef.current.push(marker)
            }
        }

        return () => {
            // Cleanup handled by ref check or rigorous teardown if needed
            // For now we keep the instance alive for simple re-renders
        }
    }, [points])

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 z-0">
            <div ref={mapRef} className="w-full h-full min-h-[400px]" />
        </div>
    )
}
