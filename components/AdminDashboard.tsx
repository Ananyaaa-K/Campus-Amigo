"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { FileText, Upload, MessageSquare, BookOpen } from "lucide-react"
import { createNote, createPyq, createReply } from "@/app/actions"

interface AdminDashboardProps {
    user: {
        id: string
        name: string
        email: string
        role: string
    }
    queries?: any[]
}

export function AdminDashboard({ user, queries = [] }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<"notes" | "pyqs" | "queries">("notes")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null)

    const handleNoteUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        const result = await createNote(formData)

        setLoading(false)
        setMessage({
            type: result.success ? "success" : "error",
            text: result.message
        })

        if (result.success) {
            e.currentTarget.reset()
        }
    }

    const handlePyqUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        const result = await createPyq(formData)

        setLoading(false)
        setMessage({
            type: result.success ? "success" : "error",
            text: result.message
        })

        if (result.success) {
            e.currentTarget.reset()
        }
    }

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user.name}</CardTitle>
                    <CardDescription>Admin Dashboard - Manage campus resources</CardDescription>
                </CardHeader>
            </Card>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setActiveTab("notes")}
                    className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === "notes"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                >
                    <FileText className="inline h-4 w-4 mr-2" />
                    Upload Notes
                </button>
                <button
                    onClick={() => setActiveTab("pyqs")}
                    className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === "pyqs"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                >
                    <BookOpen className="inline h-4 w-4 mr-2" />
                    Upload PYQs
                </button>
                <button
                    onClick={() => setActiveTab("queries")}
                    className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === "queries"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                >
                    <MessageSquare className="inline h-4 w-4 mr-2" />
                    Student Queries
                </button>
            </div>

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

            {/* Upload Notes Tab */}
            {activeTab === "notes" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Study Notes</CardTitle>
                        <CardDescription>Add new notes for students to access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleNoteUpload} className="space-y-4">
                            <div>
                                <label htmlFor="note-title" className="block text-sm font-medium mb-2">
                                    Note Title *
                                </label>
                                <input
                                    id="note-title"
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="e.g., Data Structures - Trees and Graphs"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="note-subject" className="block text-sm font-medium mb-2">
                                    Subject *
                                </label>
                                <input
                                    id="note-subject"
                                    name="subject"
                                    type="text"
                                    required
                                    placeholder="e.g., Computer Science"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="note-semester" className="block text-sm font-medium mb-2">
                                    Semester
                                </label>
                                <select
                                    id="note-semester"
                                    name="semester"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                >
                                    <option value="1st Semester">1st Semester</option>
                                    <option value="2nd Semester">2nd Semester</option>
                                    <option value="3rd Semester">3rd Semester</option>
                                    <option value="4th Semester">4th Semester</option>
                                    <option value="5th Semester">5th Semester</option>
                                    <option value="6th Semester">6th Semester</option>
                                    <option value="7th Semester">7th Semester</option>
                                    <option value="8th Semester">8th Semester</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="note-file" className="block text-sm font-medium mb-2">
                                    Upload File
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-2 text-slate-500" />
                                            <p className="mb-2 text-sm text-slate-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-slate-500">PDF, DOCX, TXT (MAX. 10MB)</p>
                                        </div>
                                        <input id="note-file" name="file" type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" />
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Uploading..." : "Upload Note"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Upload PYQs Tab */}
            {activeTab === "pyqs" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Previous Year Questions</CardTitle>
                        <CardDescription>Add PYQs for exam preparation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePyqUpload} className="space-y-4">
                            <div>
                                <label htmlFor="pyq-subject" className="block text-sm font-medium mb-2">
                                    Subject *
                                </label>
                                <input
                                    id="pyq-subject"
                                    name="subject"
                                    type="text"
                                    required
                                    placeholder="e.g., Operating Systems"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="pyq-year" className="block text-sm font-medium mb-2">
                                    Year *
                                </label>
                                <input
                                    id="pyq-year"
                                    name="year"
                                    type="text"
                                    required
                                    placeholder="e.g., 2024"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="pyq-semester" className="block text-sm font-medium mb-2">
                                    Semester
                                </label>
                                <select
                                    id="pyq-semester"
                                    name="semester"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                >
                                    <option value="General">General</option>
                                    <option value="1st Semester">1st Semester</option>
                                    <option value="2nd Semester">2nd Semester</option>
                                    <option value="3rd Semester">3rd Semester</option>
                                    <option value="4th Semester">4th Semester</option>
                                    <option value="5th Semester">5th Semester</option>
                                    <option value="6th Semester">6th Semester</option>
                                    <option value="7th Semester">7th Semester</option>
                                    <option value="8th Semester">8th Semester</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="pyq-file" className="block text-sm font-medium mb-2">
                                    Upload File
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-2 text-slate-500" />
                                            <p className="mb-2 text-sm text-slate-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-slate-500">PDF, DOCX (MAX. 10MB)</p>
                                        </div>
                                        <input id="pyq-file" name="file" type="file" className="hidden" accept=".pdf,.doc,.docx" />
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Uploading..." : "Upload PYQ"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Student Queries Tab */}
            {activeTab === "queries" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Student Queries</CardTitle>
                        <CardDescription>Respond to student questions and concerns</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {queries.length === 0 ? (
                                <div className="text-center py-8 text-slate-500">
                                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>No queries yet</p>
                                </div>
                            ) : (
                                queries.map((query: any) => (
                                    <div key={query.id} className="p-4 border border-slate-200 rounded-lg dark:border-slate-800">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                                    {query.author.name.substring(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium">{query.author.name}</span>
                                                    <span className="text-xs text-slate-500">
                                                        {new Date(query.createdAt).toLocaleDateString()}
                                                    </span>
                                                    {query.status === "answered" && (
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full dark:bg-green-900/30 dark:text-green-400">
                                                            Answered
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="font-medium text-sm mb-1">{query.title}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                                    {query.content}
                                                </p>

                                                {/* Show existing replies */}
                                                {query.replies && query.replies.length > 0 && (
                                                    <div className="mb-3 space-y-2 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
                                                        {query.replies.map((reply: any) => (
                                                            <div key={reply.id} className="bg-slate-50 dark:bg-slate-800 rounded p-2">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-xs font-medium">{reply.author.name}</span>
                                                                    <span className="text-xs text-slate-500">
                                                                        {new Date(reply.createdAt).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-slate-700 dark:text-slate-300">{reply.content}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Reply form */}
                                                <form
                                                    onSubmit={async (e) => {
                                                        e.preventDefault()
                                                        setLoading(true)
                                                        const formData = new FormData(e.currentTarget)
                                                        formData.append("queryId", query.id.toString())
                                                        const result = await createReply(formData)
                                                        setLoading(false)
                                                        if (result.success) {
                                                            e.currentTarget.reset()
                                                            window.location.reload()
                                                        }
                                                    }}
                                                    className="flex gap-2"
                                                >
                                                    <input
                                                        name="content"
                                                        type="text"
                                                        required
                                                        placeholder="Type your response..."
                                                        className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700"
                                                    />
                                                    <Button type="submit" size="sm" disabled={loading}>
                                                        {loading ? "Sending..." : "Send Reply"}
                                                    </Button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
