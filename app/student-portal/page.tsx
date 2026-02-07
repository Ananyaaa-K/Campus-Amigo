import { getCurrentUser } from "@/app/actions"
import { redirect } from "next/navigation"
import { StudentPortal } from "@/components/StudentPortal"
import { db } from "@/lib/db"

export default async function StudentPortalPage() {
    const user = await getCurrentUser()

    // Check if user is logged in
    if (!user) {
        redirect("/login")
    }

    // Fetch all queries with replies and authors
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
                <h1 className="text-3xl font-bold tracking-tight mb-2">Student Portal</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Post your queries and get answers from admins and fellow students
                </p>
            </div>

            <StudentPortal user={user} queries={queries} />
        </div>
    )
}
