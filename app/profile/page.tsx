import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { BookOpen, Coffee, Settings, Star, Upload, LogOut } from "lucide-react"
import { db } from "@/lib/db"
import { EditProfileModalWrapper } from "@/components/modals/EditProfileModalWrapper"
// Define manual interface since Prisma generation is flaky in this env
interface ProfileUser {
    name: string
    role: string
    karma: number
    _count: {
        notes: number
        meals: number
    }
    notes: any[]
    meals: any[]
}

import { getCurrentUser } from "@/app/actions"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
    // Real Auth
    const userBase = await getCurrentUser()

    if (!userBase) {
        redirect("/login")
    }

    // Fetch full profile details including relations
    let user: ProfileUser | null = null
    try {
        user = await db.user.findUnique({
            where: { id: userBase.id },
            include: {
                _count: {
                    select: { notes: true, meals: true }
                },
                notes: {
                    take: 3,
                    orderBy: { createdAt: 'desc' }
                },
                meals: {
                    take: 3,
                    orderBy: { createdAt: 'desc' }
                }
            }
        }) as unknown as ProfileUser | null
    } catch (e) {
        console.error("Failed to load profile:", e)
    }

    if (!user) {
        return <div className="p-8 text-center">User not found.</div>
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
                <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl font-bold border-4 border-white shadow-lg dark:bg-indigo-900 dark:border-slate-800 dark:text-indigo-300">
                    {user.name.charAt(0)}
                </div>
                <div className="flex-1 text-center md:text-left space-y-2">
                    <div>
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <p className="text-slate-500 dark:text-slate-400">Student • {user.role}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium dark:bg-indigo-900/30 dark:text-indigo-400">
                            🏆 {user.karma} Karma Points
                        </span>
                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium dark:bg-green-900/30 dark:text-green-400">
                            📚 {user._count.notes} Notes Uploaded
                        </span>
                        <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium dark:bg-orange-900/30 dark:text-orange-400">
                            🍔 {user._count.meals} Meals Suggested
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <EditProfileModalWrapper currentName={user.name} currentRole={user.role} />
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                <div className="space-y-8">
                    {/* Recent Loading Activity */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
                        <div className="space-y-4">
                            {user.notes.length === 0 && <p className="text-slate-500">No notes uploaded yet.</p>}
                            {user.notes.map((note) => (
                                <div key={note.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <Upload className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-900 dark:text-slate-200">Uploaded '{note.title}'</p>
                                        <p className="text-xs text-slate-500 text-transform capitalize">{note.subject}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">Recent Suggestions</h2>
                        <div className="space-y-4">
                            {user.meals.length === 0 && <p className="text-slate-500">No meals suggested yet.</p>}
                            {user.meals.map((meal) => (
                                <div key={meal.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                                    <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                                        <Star className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-900 dark:text-slate-200">Suggested '{meal.name}'</p>
                                        <p className="text-xs text-slate-500">{meal.cuisine}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Saved Items */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Saved</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardHeader className="p-4">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Coffee className="h-4 w-4 text-orange-500" /> Spicy Bites
                                    </CardTitle>
                                    <CardDescription>Saved for lunch</CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardHeader className="p-4">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-blue-500" /> K-Map Guide
                                    </CardTitle>
                                    <CardDescription>To read later</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </section>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <Card className="bg-indigo-600 text-white border-none">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-1">Campus Legend</h3>
                            <div className="w-full bg-indigo-800 h-2 rounded-full overflow-hidden mb-2">
                                <div className="bg-white h-full" style={{ width: `${Math.min(user.karma / 10, 100)}%` }}></div>
                            </div>
                            <p className="text-xs text-indigo-200">{1000 - user.karma % 1000} points to next level</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Account</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start h-auto py-2 px-0 hover:bg-transparent hover:text-indigo-600">
                                Notification Settings
                            </Button>
                            <Button variant="ghost" className="w-full justify-start h-auto py-2 px-0 hover:bg-transparent hover:text-indigo-600">
                                Privacy & Security
                            </Button>
                            <Button variant="ghost" className="w-full justify-start h-auto py-2 px-0 hover:bg-transparent hover:text-indigo-600">
                                Help & Support
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
