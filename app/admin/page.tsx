import { getCurrentUser } from "@/app/actions"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/AdminDashboard"
import { db } from "@/lib/db"

export default async function AdminPage() {
    const user = await getCurrentUser()

    // Check if user is logged in
    if (!user) {
        redirect("/login")
    }

    // All logged-in users can access admin features now
    // Admins have special privileges but everyone can view

    // Fetch queries for admin to respond
    const queries = await db.query.findMany({
        include: {
            author: true,
            replies: {
                include: {
                    author: true
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Manage notes, PYQs, and respond to student queries
                </p>
            </div>

            <AdminDashboard user={user} queries={queries} />
        </div>
    )
}
