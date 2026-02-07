"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"
import { createLostItem } from "@/app/actions"
import { HelpCircle, Loader2, MapPin, Phone, Type, Info, Search } from "lucide-react"

export function AddLostItemModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            const result = await createLostItem(formData)
            if (result?.success) {
                toast.success(result.message)
                setIsOpen(false)
            } else {
                toast.error(result?.message || "Failed to report item")
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) {
        return (
            <Button onClick={() => setIsOpen(true)} className="gap-2 shadow-lg bg-orange-600 hover:bg-orange-700 text-white">
                <HelpCircle className="h-4 w-4" /> Report Lost/Found
            </Button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-1">Report an Item</h2>
                    <p className="text-sm text-slate-500 mb-6">Help the community by reporting lost or found items.</p>

                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">What is the item?</label>
                            <div className="relative">
                                <Type className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    name="title"
                                    required
                                    placeholder="e.g. Blue Water Bottle"
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select
                                name="status"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                            >
                                <option value="Lost">I Lost this item</option>
                                <option value="Found">I Found this item</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    name="location"
                                    required
                                    placeholder="e.g. Library 2nd Floor"
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <div className="relative">
                                <Info className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <textarea
                                    name="description"
                                    required
                                    rows={2}
                                    placeholder="Color, brand, distinguishing marks..."
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Contact Info (Optional)</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    name="contactInfo"
                                    placeholder="Phone or Email (if willing to share)"
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Report"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
