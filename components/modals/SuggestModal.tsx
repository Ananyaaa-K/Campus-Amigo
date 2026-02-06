"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { X, MapPin } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { createMeal } from "@/app/actions"

interface SuggestModalProps {
    isOpen: boolean
    onClose: () => void
}

export function SuggestModal({ isOpen, onClose }: SuggestModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) return null

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            const result = await createMeal(formData)
            if (result?.success) {
                toast.success(result.message)
                onClose()
            } else {
                toast.error(result?.message || "Failed to submit suggestion")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <Card className="w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1 rounded-full hover:bg-slate-100 text-slate-500 dark:hover:bg-slate-800"
                >
                    <X className="h-5 w-5" />
                </button>
                <CardHeader>
                    <CardTitle>Suggest a Place</CardTitle>
                    <CardDescription>Know a hidden gem? Let everyone know!</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Place Name</label>
                            <input
                                name="name"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                placeholder="e.g. Chai Point"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Cuisine</label>
                                <input
                                    name="cuisine"
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                    placeholder="e.g. Snacks"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Price Range</label>
                                <select name="price" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800">
                                    <option value="₹">₹ (Cheap)</option>
                                    <option value="₹₹">₹₹ (Moderate)</option>
                                    <option value="₹₹₹">₹₹₹ (Expensive)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location hint</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    name="locationHint"
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                    placeholder="e.g. Near Main Gate"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit Suggestion"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
