"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"
import { createEvent } from "@/app/actions"
import { Calendar, Loader2, MapPin, Type } from "lucide-react"

export function AddEventModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Form submitted!");
        
        // Get form data manually
        const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement)?.value;
        const date = (e.currentTarget.elements.namedItem("date") as HTMLInputElement)?.value;
        const location = (e.currentTarget.elements.namedItem("location") as HTMLInputElement)?.value;
        const description = (e.currentTarget.elements.namedItem("description") as HTMLTextAreaElement)?.value;
        
        console.log("Manual form data:", { title, date, location, description });
        
        setIsLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            console.log("FormData object:", {
                title: formData.get("title"),
                date: formData.get("date"),
                location: formData.get("location"),
                description: formData.get("description")
            });
            const result = await createEvent(formData);
            console.log("Create event result:", result);
            if (result?.success) {
                toast.success(result.message);
                setIsOpen(false);
            } else {
                toast.error(result?.message || "Failed to create event");
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    if (!isOpen) {
        return (
            <Button onClick={() => setIsOpen(true)} className="gap-2 shadow-lg">
                <Calendar className="h-4 w-4" /> Add Event
            </Button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-1">Host an Event</h2>
                    <p className="text-sm text-slate-500 mb-6">Share details about your upcoming activity.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Event Title</label>
                            <div className="relative">
                                <Type className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    name="title"
                                    required
                                    placeholder="e.g. Coding Workshop"
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date & Time</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    name="date"
                                    required
                                    placeholder="e.g. 15th Aug, 2 PM"
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    name="location"
                                    placeholder="e.g. Auditorium"
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                rows={3}
                                placeholder="Tell us more about the event..."
                                className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                className="flex-1" 
                                disabled={isLoading}
                                onClick={(e) => {
                                    console.log("Publish button clicked");
                                    console.log("Event target:", e.target);
                                    console.log("Current target:", e.currentTarget);
                                }}
                            >
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish Event"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
