"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"
import { createPost } from "@/app/actions"
import { Loader2, Send, Image as ImageIcon } from "lucide-react"

export function CreatePost() {
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState("")

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            const result = await createPost(formData)
            if (result?.success) {
                toast.success(result.message)
                setContent("")
            } else {
                toast.error(result?.message || "Failed to post")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-semibold mb-3 text-lg">Share something with the campus</h3>
            <form action={handleSubmit}>
                <textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="What's happening? Any events, news, or thoughts..."
                    className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 min-h-[100px] resize-none dark:bg-slate-950 dark:border-slate-800"
                />
                <div className="flex justify-between items-center">
                    <Button type="button" variant="ghost" size="sm" className="text-slate-500">
                        <ImageIcon className="h-4 w-4 mr-2" /> Add Photo
                    </Button>
                    <Button type="submit" disabled={isLoading || !content.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                            <>
                                <Send className="h-4 w-4 mr-2" /> Post
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
