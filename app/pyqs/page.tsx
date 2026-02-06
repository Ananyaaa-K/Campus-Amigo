import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { FileText, Download, ChevronRight } from "lucide-react"
import { db } from "@/lib/db"
import { UploadModalWrapper } from "@/components/modals/UploadModalWrapper"
import { cn } from "@/lib/utils"

import Link from "next/link"

interface Props {
    searchParams: Promise<{ sem?: string }>
}

export const dynamic = 'force-dynamic'

export default async function PyqsPage(props: Props) {
    const searchParams = await props.searchParams
    const sem = searchParams?.sem

    const where = sem ? { semester: sem } : {}

    let pyqs: any[] = []
    try {
        pyqs = await db.pyq.findMany({
            where,
            orderBy: { year: 'desc' }
        })
    } catch (e) {
        console.error("Failed to load PYQs:", e)
    }

    // Group PYQs by year
    const groupedPyqs = pyqs.reduce((acc: any, pyq: any) => {
        if (!acc[pyq.year]) {
            acc[pyq.year] = []
        }
        acc[pyq.year].push(pyq)
        return acc
    }, {} as Record<string, any>)

    // Sort years descending
    const years = Object.keys(groupedPyqs).sort((a, b) => b.localeCompare(a))

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Previous Year Question Papers</h1>

                    {sem ? (
                        <div className="flex items-center gap-2">
                            <p className="text-slate-500 dark:text-slate-400">Filtering by: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{sem}</span></p>
                            <Link href="/pyqs">
                                <Button variant="ghost" size="sm" className="h-8">Clear</Button>
                            </Link>
                        </div>
                    ) : (
                        <p className="text-slate-500 dark:text-slate-400">Ace your exams by solving past year papers.</p>
                    )}
                </div>
                <div className="hidden md:block">
                    <UploadModalWrapper type="PYQ" />
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                <div className="space-y-6">
                    {years.map((year) => (
                        <div key={year} className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className="bg-indigo-600 w-1 h-6 rounded-full"></span>
                                {year} Papers
                            </h2>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {groupedPyqs[year].map((pyq: any) => (
                                    <Card key={pyq.id} className="hover:border-indigo-300 transition-colors cursor-pointer">
                                        <CardContent className="p-4 flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-slate-100 p-2 rounded-lg dark:bg-slate-800">
                                                        <FileText className="h-5 w-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-sm md:text-base block">{pyq.subject}</span>
                                                        <span className="text-xs text-slate-500">{pyq.semester}</span>
                                                    </div>
                                                </div>
                                                <Download className="h-4 w-4 text-slate-400" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}

                    {years.length === 0 && (
                        <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl dark:bg-slate-900">
                            <div className="max-w-xs mx-auto">
                                <p className="mb-4">No PYQs found for {sem || "this criteria"}.</p>
                                <UploadModalWrapper type="PYQ" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <Card className="bg-slate-50 dark:bg-slate-900 border-none sticky top-24">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Quick Filters</h3>
                                {sem && <Link href="/pyqs" className="text-xs text-indigo-600 hover:underline">Reset</Link>}
                            </div>
                            <div className="space-y-2">
                                {["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"].map((s) => (
                                    <Link key={s} href={`/pyqs?sem=${s}`}>
                                        <Button
                                            variant={sem === s ? "secondary" : "ghost"}
                                            className={cn("w-full justify-between font-normal", sem === s && "bg-white shadow-sm dark:bg-slate-800")}
                                        >
                                            {s} <ChevronRight className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="md:hidden">
                        <UploadModalWrapper type="PYQ" />
                    </div>
                </div>
            </div>
        </div>
    )
}
