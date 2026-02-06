import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Calendar, MapPin, Users, ExternalLink, ArrowRight } from "lucide-react"
import { db } from "@/lib/db"

import { AddEventModalWrapper } from "@/components/modals/AddEventModalWrapper"

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
    let events: any[] = []
    try {
        events = await db.event.findMany({
            orderBy: { date: 'asc' }
        })
    } catch (error) {
        console.error("Failed to fetch events:", error)
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <AddEventModalWrapper />
            <div className="mb-10 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Campus Events</h1>
                <p className="text-slate-500 mb-6 dark:text-slate-400">
                    Never miss out on what's happening around you. Hackathons, Fests, Workshops, and more.
                </p>
                <div className="flex justify-center gap-2">
                    <Button variant="outline" className="rounded-full">All</Button>
                    <Button variant="ghost" className="rounded-full">Hackathons</Button>
                    <Button variant="ghost" className="rounded-full">Cultural</Button>
                    <Button variant="ghost" className="rounded-full">Workshops</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {events.map((event: any) => (
                    <Card key={event.id} className="flex flex-col md:flex-row overflow-hidden hover:border-indigo-300 transition-colors dark:hover:border-indigo-800">
                        <div className="bg-indigo-600 text-white p-6 flex flex-col items-center justify-center min-w-[150px] text-center dark:bg-indigo-900">
                            <span className="text-3xl font-bold">{event.date.split(' ')[0]}</span>
                            {/* Simplified date parsing for demo */}
                            <span className="text-sm font-medium uppercase opacity-90">{event.date.split(' ').slice(1).join(' ')}</span>
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded dark:bg-indigo-900/50 dark:text-indigo-300">
                                        {event.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <p className="text-sm text-slate-500 mb-4 dark:text-slate-400">
                                    {event.description}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4 dark:text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> {event.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" /> {event.participants}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-auto">
                                <Button className="flex-1 gap-2">Register Now <ExternalLink className="h-4 w-4" /></Button>
                                <Button variant="outline">Details</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
