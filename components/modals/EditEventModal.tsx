"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Edit } from "lucide-react"
import { updateEvent } from "@/actions/admin"
import { toast } from "sonner"

export function EditEventModal({ event, adminUserId }: { event: any, adminUserId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(event.title)
    const [date, setDate] = useState(event.date)
    const [location, setLocation] = useState(event.location)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const result = await updateEvent(adminUserId, event.id, { title, date, location })

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Event updated successfully!")
            setIsOpen(false)
        }
        setIsSubmitting(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded p-2 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border rounded p-2 text-sm" required />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
