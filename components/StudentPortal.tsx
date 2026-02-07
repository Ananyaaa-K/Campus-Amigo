"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { MessageSquare, Send, Plus, CheckCircle, Clock } from "lucide-react"
import { createQuery, createReply } from "@/app/actions"

interface StudentPortalProps {
    user: {
        id: string
        name: string
        email: string
        role: string
    }
    queries: any[]
}

export function StudentPortal({ user, queries }: StudentPortalProps) {
    const [showNewQueryForm, setShowNewQueryForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null)
    const [replyingTo, setReplyingTo] = useState<number | null>(null)

    const handleQuerySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        const result = await createQuery(formData)

        setLoading(false)
        setMessage({
            type: result.success ? "success" : "error",
            text: result.message
        })

        if (result.success) {
            e.currentTarget.reset()
            setShowNewQueryForm(false)
            // Refresh the page to show new query
            window.location.reload()
        }
    }

    const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>, queryId: number) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        formData.append("queryId", queryId.toString())
        const result = await createReply(formData)

        setLoading(false)

        if (result.success) {
            e.currentTarget.reset()
            setReplyingTo(null)
            // Refresh to show new reply
            window.location.reload()
        }
    }

    return (
        <div className="space-y-6">
            {/* Message Display */}
            {message && (
                <div
                    className={`p-4 rounded-lg ${
                        message.type === "success"
                            ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                >
                    {message.text}
                </div>
            )}

            {/* Post New Query Button */}
            {!showNewQueryForm && (
                <Button
                    onClick={() => setShowNewQueryForm(true)}
                    className="w-full md:w-auto"
                    size="lg"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Query
                </Button>
            )}

            {/* New Query Form */}
            {showNewQueryForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Post a New Query</CardTitle>
                        <CardDescription>Ask your question and get answers from the community</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleQuerySubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium mb-2">
                                    Question Title *
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="e.g., How to prepare for DSA exam?"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium mb-2">
                                    Question Details *
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    required
                                    rows={4}
                                    placeholder="Provide more details about your question..."
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Posting..." : "Post Query"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowNewQueryForm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Queries List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Recent Queries</h2>
                
                {queries.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                            <p className="text-slate-500">No queries yet. Be the first to ask a question!</p>
                        </CardContent>
                    </Card>
                ) : (
                    queries.map((query) => (
                        <Card key={query.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <CardTitle className="text-lg">{query.title}</CardTitle>
                                            {query.status === "answered" ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full dark:bg-green-900/30 dark:text-green-400">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Answered
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full dark:bg-yellow-900/30 dark:text-yellow-400">
                                                    <Clock className="h-3 w-3" />
                                                    Pending
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            Posted by <span className="font-medium">{query.author.name}</span> • {new Date(query.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-700 dark:text-slate-300 mb-4">{query.content}</p>

                                {/* Replies */}
                                {query.replies.length > 0 && (
                                    <div className="space-y-3 mb-4 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
                                        {query.replies.map((reply: any) => (
                                            <div key={reply.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-sm">{reply.author.name}</span>
                                                    {reply.author.role === "admin" && (
                                                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
                                                            Admin
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-slate-500">
                                                        {new Date(reply.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-700 dark:text-slate-300">{reply.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Reply Form */}
                                {user.role === "admin" && replyingTo === query.id ? (
                                    <form onSubmit={(e) => handleReplySubmit(e, query.id)} className="space-y-2">
                                        <textarea
                                            name="content"
                                            required
                                            rows={2}
                                            placeholder="Write your reply..."
                                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                        />
                                        <div className="flex gap-2">
                                            <Button type="submit" size="sm" disabled={loading}>
                                                <Send className="h-3 w-3 mr-1" />
                                                {loading ? "Sending..." : "Send Reply"}
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setReplyingTo(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                ) : user.role === "admin" ? (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setReplyingTo(query.id)}
                                    >
                                        <MessageSquare className="h-3 w-3 mr-1" />
                                        Reply
                                    </Button>
                                ) : null}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
