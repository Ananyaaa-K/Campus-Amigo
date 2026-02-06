"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"
import { updateProfile } from "@/app/actions"
import { Settings, User, Briefcase, Loader2 } from "lucide-react"

export function EditProfileModal({ currentName, currentRole }: { currentName: string, currentRole: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            const result = await updateProfile(formData)
            if (result?.success) {
                toast.success(result.message)
                setIsOpen(false)
            } else {
                toast.error(result?.message || "Failed to update profile")
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) {
        return (
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(true)}>
                <Settings className="h-4 w-4" /> Edit Profile
            </Button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-1">Edit Profile</h2>
                    <p className="text-sm text-slate-500 mb-6">Update your personal details.</p>

                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    name="name"
                                    defaultValue={currentName}
                                    required
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role / Title</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    name="role"
                                    defaultValue={currentRole}
                                    placeholder="e.g. CS Sophomore"
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
