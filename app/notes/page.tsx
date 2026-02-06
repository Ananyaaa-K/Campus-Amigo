

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { BookOpen, Download, Filter, Search, User, CloudUpload } from "lucide-react"
import { db } from "@/lib/db"
import { UploadModalWrapper } from "@/components/modals/UploadModalWrapper"

import SearchInput from "@/components/SearchInput"
import { FilterComponent } from "@/components/FilterComponent"

export const dynamic = 'force-dynamic'

export default async function NotesPage(props: {
    searchParams: Promise<{ q?: string; subject?: string; semester?: string }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.q || ""
    const subject = searchParams?.subject || ""
    const semester = searchParams?.semester || ""

    const where: any = {}

    if (query) {
        where.OR = [
            { title: { contains: query } },
            { subject: { contains: query } },
            { displayAuthor: { contains: query } }
        ]
    }

    if (subject) {
        where.subject = { contains: subject }
    }

    if (semester) {
        where.semester = semester
    }

    let notes: any[] = []
    try {
        notes = await db.note.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        })
    } catch (error) {
        console.error("Failed to fetch notes:", error)
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <UploadModalWrapper type="Note" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Study Notes</h1>
                    <p className="text-slate-500 dark:text-slate-400">Share and download high-quality notes from top students.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <SearchInput placeholder="Search for subjects, topics, or authors..." />
                <div className="flex gap-2 min-w-[300px]">
                    <div className="flex-1">
                        <FilterComponent
                            label="Semester"
                            paramName="semester"
                            options={[
                                { label: "1st Semester", value: "1st Semester" },
                                { label: "2nd Semester", value: "2nd Semester" },
                                { label: "3rd Semester", value: "3rd Semester" },
                                { label: "4th Semester", value: "4th Semester" },
                                { label: "5th Semester", value: "5th Semester" },
                                { label: "6th Semester", value: "6th Semester" },
                                { label: "7th Semester", value: "7th Semester" },
                                { label: "8th Semester", value: "8th Semester" },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {notes.length > 0 ? (
                    notes.map((note: any) => (
                        <Card key={note.id} className="hover:border-indigo-200 transition-colors dark:hover:border-indigo-900">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="bg-indigo-100 p-3 rounded-lg dark:bg-indigo-900/30">
                                        <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">{note.title}</h3>
                                        <div className="flex flex-wrap gap-2 text-sm text-slate-500 mt-1">
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">{note.subject}</span>
                                            </span>
                                            <span>•</span>
                                            <span>{note.semester}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <User className="h-3 w-3" /> {note.displayAuthor}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="hidden text-right sm:block">
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{note.size}</p>
                                        <p className="text-xs text-slate-500">{note.downloads} downloads</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                                        <Download className="h-5 w-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-500">
                        <p>No notes found matching your criteria.</p>
                        <a href="/notes" className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            Clear filters
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
