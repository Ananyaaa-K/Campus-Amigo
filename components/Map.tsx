"use client"

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useCallback, useState, useEffect } from 'react';

const containerStyle = {
    width: '100%',
    height: '100%'
};

// Default center (e.g., Campus location or generic city center)
const defaultCenter = {
    lat: 28.6139,
    lng: 77.2090
};

export default function Map({ meals }: { meals: any[] }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    })

    const [map, setMap] = useState(null)
    const [userLocation, setUserLocation] = useState(defaultCenter)
    const [selectedMeal, setSelectedMeal] = useState<any | null>(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                () => {
                    console.log("Geolocation permission denied or error.")
                }
            )
        }
    }, [])

    const onLoad = useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(userLocation);
        meals.forEach(meal => {
            if (meal.latitude && meal.longitude) {
                bounds.extend({ lat: meal.latitude, lng: meal.longitude })
            }
        })
        map.fitBounds(bounds);
        setMap(map)
    }, [meals, userLocation])

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    if (!isLoaded) return <div className="h-full w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Loading Map...</div>

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                disableDefaultUI: false,
                zoomControl: true,
            }}
        >
            {/* User Location */}
            <Marker
                position={userLocation}
                icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }}
                title="You are here"
            />

            {/* Meal Markers */}
            {meals.map((meal) => (
                meal.latitude && meal.longitude ? (
                    <Marker
                        key={meal.id}
                        position={{ lat: meal.latitude, lng: meal.longitude }}
                        title={meal.name}
                        onClick={() => setSelectedMeal(meal)}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        }}
                    />
                ) : null
            ))}

            {selectedMeal && (
                <InfoWindow
                    position={{ lat: selectedMeal.latitude, lng: selectedMeal.longitude }}
                    onCloseClick={() => setSelectedMeal(null)}
                >
                    <div className="p-2 max-w-xs">
                        <h3 className="font-bold text-sm mb-1">{selectedMeal.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">{selectedMeal.cuisine}</p>
                        <p className="text-xs text-gray-600 mb-2">{selectedMeal.distance}</p>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMeal.latitude},${selectedMeal.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded transition-colors"
                        >
                            Get Directions
                        </a>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    )
}
