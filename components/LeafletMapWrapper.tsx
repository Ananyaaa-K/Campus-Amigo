"use client"

import dynamic from 'next/dynamic'

// Dynamically import LeafletMap with SSR disabled
// Dynamically import LeafletMap with SSR disabled
// This must be done in a Client Component to use { ssr: false }
const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[400px] bg-slate-100 dark:bg-slate-900 animate-pulse rounded-xl" />
})

interface LeafletMapProps {
    points?: {
        lat: number
        lng: number
        title: string
        description?: string
    }[]
}

export default function LeafletMapWrapper(props: LeafletMapProps) {
    return <LeafletMap {...props} />
}
