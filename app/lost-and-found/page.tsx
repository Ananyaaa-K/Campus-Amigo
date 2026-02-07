
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card"
import { Search, MapPin, Calendar, Phone, AlertCircle, CheckCircle2 } from "lucide-react"
import { db } from "@/lib/db"
import { AddLostItemModal } from "@/components/modals/AddLostItemModal"
import { ContactButton } from "@/components/ContactButton"

import SearchInput from "@/components/SearchInput"
import { FilterComponent } from "@/components/FilterComponent"

export const dynamic = 'force-dynamic'

export default async function LostAndFoundPage(props: {
    searchParams: Promise<{ q?: string; status?: string }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.q || ""
    const status = searchParams?.status || ""

    const where: any = {}

    if (query) {
        where.OR = [
            { title: { contains: query } },
            { description: { contains: query } },
            { location: { contains: query } }
        ]
    }

    if (status) {
        where.status = status
    }

    let items: any[] = []
    try {
        items = await db.lostItem.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { reportedBy: true }
        })
    } catch (error) {
        console.error("Failed to fetch lost items:", error)
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Lost & Found</h1>
                    <p className="text-slate-500 dark:text-slate-400">Report loss or help others find their belongings.</p>
                </div>
                <AddLostItemModal />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <SearchInput placeholder="Search for items, locations..." />
                <div className="flex gap-2 min-w-[200px]">
                    <div className="flex-1">
                        <FilterComponent
                            label="Filter Status"
                            paramName="status"
                            options={[
                                { label: "All Items", value: "" },
                                { label: "Lost Items", value: "Lost" },
                                { label: "Found Items", value: "Found" },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.length > 0 ? (
                    items.map((item: any) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 border-slate-200 dark:border-slate-800">
                            <div className={`h-2 absolute top-0 w-full ${item.status === 'Lost' ? 'bg-red-500' : 'bg-green-500'}`} />
                            <CardHeader className="pb-2 pt-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide
                                            ${item.status === 'Lost' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                                            {item.status}
                                        </div>
                                        <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                                    </div>
                                </div>
                                <CardDescription className="flex items-center gap-1 text-xs">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(item.createdAt).toLocaleDateString()}</span> •
                                    <span>{item.reportedBy?.name || "Anonymous"}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 min-h-[4.5em]">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg">
                                        <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                                        <span className="truncate">{item.location}</span>
                                    </div>

                                    {item.contactInfo && (
                                        <div className="flex items-center gap-2 text-sm text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg">
                                            <Phone className="h-4 w-4 shrink-0" />
                                            <span className="truncate">{item.contactInfo}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <ContactButton
                                    label={item.status === 'Lost' ? 'I Found This!' : 'This is Mine!'}
                                    contactInfo={item.contactInfo}
                                    title="Contact Info"
                                    description="Details provided by the reporter:"
                                    className="w-full"
                                    variant="outline"
                                />
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
                        <AlertCircle className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">No items reported</h3>
                        <p className="text-slate-500 mb-4">Everything seems to be in its right place!</p>
                        <AddLostItemModal />
                    </div>
                )}
            </div>
        </div>
    )
}
