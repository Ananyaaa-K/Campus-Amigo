import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Calendar, MapPin, Users, ExternalLink, ArrowRight } from "lucide-react"
import { db } from "@/lib/db"

import { AddEventModalWrapper } from "@/components/modals/AddEventModalWrapper"

export const dynamic = 'force-dynamic'

export default async function EventsPage({
    searchParams
}: {
    searchParams?: Promise<{ category?: string, registered?: string, event?: string }>
}) {
    const params = await searchParams || {}
    const category = params.category
    const registered = params.registered
    const eventTitle = params.event

    // Fetch events from the database
    let events = [];
    try {
        events = await db.event.findMany({
            orderBy: { date: 'asc' }
        });
        
        // Add category based on title for filtering
        events = events.map((event: any) => ({
            ...event,
            category: event.category || 'Tech' // Default to Tech if no category
        }));
    } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to sample events if database query fails
        events = [
            {
                id: 1,
                title: "HackTheVerse 2024",
                date: "March 15, 2024",
                location: "Main Auditorim",
                category: "Tech",
                description: "24-hour hackathon.",
                participants: "300+ registered"
            },
            {
                id: 2,
                title: "Cultural Fest: Aura",
                date: "April 2-4, 2024",
                location: "Campus Grounds",
                category: "Cultural",
                description: "Annual cultural fest.",
                participants: "Open to all"
            }
        ];
    }

    // Filter events based on selected category
    let filteredEvents = events;
    if (category && category !== 'All') {
        filteredEvents = events.filter((event: any) => event.category.toLowerCase() === category.toLowerCase());
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <AddEventModalWrapper />
            
            {/* Registration Success Message */}
            {registered === 'true' && eventTitle && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
                    <p className="font-medium">Success! You've registered for <span className="font-bold">{decodeURIComponent(eventTitle)}</span>.</p>
                    <p className="text-sm mt-1">Check your email for confirmation and further details.</p>
                </div>
            )}
            
            <div className="mb-10 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Campus Events</h1>
                <p className="text-slate-500 mb-6 dark:text-slate-400">
                    Never miss out on what's happening around you. Hackathons, Fests, Workshops, and more.
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                    <a href="/events">
                        <Button variant={!category ? "outline" : "ghost"} className="rounded-full my-1">All</Button>
                    </a>
                    <a href="/events?category=Hackathon">
                        <Button variant={category === 'Hackathon' ? "outline" : "ghost"} className="rounded-full my-1">Hackathons</Button>
                    </a>
                    <a href="/events?category=Cultural">
                        <Button variant={category === 'Cultural' ? "outline" : "ghost"} className="rounded-full my-1">Cultural</Button>
                    </a>
                    <a href="/events?category=Workshop">
                        <Button variant={category === 'Workshop' ? "outline" : "ghost"} className="rounded-full my-1">Workshops</Button>
                    </a>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {filteredEvents.map((event: any) => (
                    <Card key={event.id} className="flex flex-col md:flex-row overflow-hidden hover:border-indigo-300 transition-colors dark:hover:border-indigo-800">
                        <div className="bg-indigo-600 text-white p-6 flex flex-col items-center justify-center min-w-[150px] text-center dark:bg-indigo-900">
                            <span className="text-3xl font-bold">{event.date.split(' ')[0]}</span>
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
                                <a href={`/api/register/event/${event.id}`} className="flex-1 gap-2 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-sm transition-colors">
                                    Register Now <ExternalLink className="h-4 w-4 ml-2" />
                                </a>
                                <Button variant="outline">Details</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg text-slate-500 dark:text-slate-400">No events found for this category.</p>
                    <a href="/events" className="text-indigo-600 hover:underline mt-2 inline-block">View all events</a>
                </div>
            )}
        </div>
    )
}
