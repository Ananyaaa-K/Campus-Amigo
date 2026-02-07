import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Trash2, FileText, ShoppingBag, MapPin, Calendar, Coffee, File } from "lucide-react"
import { deleteNote, deleteEvent, deleteProduct, deleteLostItem, deletePyq, deleteMeal } from "@/actions/admin"
import { EditNoteModal } from "@/components/modals/EditNoteModal"
import { EditEventModal } from "@/components/modals/EditEventModal"
import { EditProductModal } from "@/components/modals/EditProductModal"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

interface AdminPageProps {
    searchParams: Promise<{ tab?: string }>
}

export default async function AdminPage(props: AdminPageProps) {
    const searchParams = await props.searchParams
    const currentTab = searchParams?.tab || "notes"

    // 1. Verify Verification (Mock/Simple)
    // In a real app, use getCurrentUser() and check role
    const adminUser = await db.user.findUnique({
        where: { email: 'demo@campus-amigo.com' }
    })

    if (!adminUser || adminUser.role !== 'admin') {
        redirect("/")
    }

    // 2. Fetch Data based on Tab
    let data: any[] = []
    let title = ""
    let description = ""

    switch (currentTab) {
        case "notes":
            title = "Manage Notes"
            description = "Approve or remove student notes."
            data = await db.note.findMany({ orderBy: { createdAt: 'desc' }, include: { uploadedBy: true } })
            break
        case "events":
            title = "Manage Events"
            description = "Oversee campus events."
            data = await db.event.findMany({ orderBy: { createdAt: 'desc' } })
            break
        case "marketplace":
            title = "Manage Marketplace"
            description = "Monitor items listed for sale."
            data = await db.product.findMany({ orderBy: { createdAt: 'desc' }, include: { seller: true } })
            break
        case "lost-found":
            title = "Lost & Found"
            description = "Manage reported items."
            data = await db.lostItem.findMany({ orderBy: { createdAt: 'desc' }, include: { reportedBy: true } })
            break
        case "pyqs":
            title = "Manage PYQs"
            description = "Curate past year papers."
            data = await db.pyq.findMany({ orderBy: { createdAt: 'desc' } })
            break
        case "meals":
            title = "Manage Meals"
            description = "Review community food suggestions."
            data = await db.meal.findMany({ orderBy: { createdAt: 'desc' }, include: { suggestedBy: true } })
            break
        default:
            data = []
    }

    const tabs = [
        { id: "notes", label: "Notes", icon: FileText },
        { id: "events", label: "Events", icon: Calendar },
        { id: "marketplace", label: "Market", icon: ShoppingBag },
        { id: "lost-found", label: "Lost & Found", icon: MapPin },
        { id: "pyqs", label: "PYQs", icon: File },
        { id: "meals", label: "Meals", icon: Coffee },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = currentTab === tab.id
                    return (
                        <Link key={tab.id} href={`/admin?tab=${tab.id}`}>
                            <Button
                                variant={isActive ? "default" : "ghost"}
                                className={cn("gap-2", isActive && "bg-indigo-600 hover:bg-indigo-700")}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </Button>
                        </Link>
                    )
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {data.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                No items found in this category.
                            </div>
                        ) : (
                            data.map((item: any) => (
                                <div key={item.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-lg">{item.title || item.name || item.subject + ' ' + item.year}</h3>
                                            {item.status && (
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                    {item.status}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            {/* Dynamic description based on type */}
                                            {currentTab === 'notes' && `${item.subject} • ${item.uploadedBy?.name}`}
                                            {currentTab === 'events' && `${item.date} • ${item.location}`}
                                            {currentTab === 'marketplace' && `₹${item.price} • ${item.category}`}
                                            {currentTab === 'lost-found' && `${item.location} • ${item.contactInfo || 'No contact'}`}
                                            {currentTab === 'pyqs' && `${item.subject} • ${item.semester}`}
                                            {currentTab === 'meals' && `${item.cuisine} • ${item.distance}`}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {/* Edit Modals */}
                                        {currentTab === 'notes' && (
                                            <EditNoteModal note={item} adminUserId={adminUser.id} />
                                        )}
                                        {currentTab === 'events' && (
                                            <EditEventModal event={item} adminUserId={adminUser.id} />
                                        )}
                                        {currentTab === 'marketplace' && (
                                            <EditProductModal product={item} adminUserId={adminUser.id} />
                                        )}

                                        <form action={async () => {
                                            "use server"
                                            if (currentTab === 'notes') await deleteNote(adminUser.id, item.id)
                                            if (currentTab === 'events') await deleteEvent(adminUser.id, item.id)
                                            if (currentTab === 'marketplace') await deleteProduct(adminUser.id, item.id)
                                            if (currentTab === 'lost-found') await deleteLostItem(adminUser.id, item.id)
                                            if (currentTab === 'pyqs') await deletePyq(adminUser.id, item.id)
                                            if (currentTab === 'meals') await deleteMeal(adminUser.id, item.id)
                                        }}>
                                            <Button variant="ghost" size="sm" type="submit" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
