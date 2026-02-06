import Link from "next/link"
import { GraduationCap } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full border-t border-indigo-100 bg-indigo-50/50 py-12 md:py-16 lg:py-20 dark:border-indigo-900 dark:bg-slate-950">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            <GraduationCap className="h-6 w-6" />
                            <span className="text-xl font-bold tracking-tight">Campus Amigo</span>
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Your ultimate college companion. Find food, share notes, and stay updated.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Features</h3>
                        <Link href="/meals" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                            Meals
                        </Link>
                        <Link href="/notes" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                            Notes
                        </Link>
                        <Link href="/pyqs" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                            PYQs
                        </Link>
                        <Link href="/events" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                            Events
                        </Link>
                    </div>
                    <div className="grid gap-4">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Resources</h3>
                        <Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                            Blog
                        </Link>
                        <Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                            Community
                        </Link>
                        <Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                            Help Center
                        </Link>
                    </div>
                    <div className="grid gap-4">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Legal</h3>
                        <Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                            Terms of Service
                        </Link>
                    </div>
                </div>
                <div className="mt-10 border-t border-indigo-200 pt-6 text-center text-sm text-slate-500 dark:border-indigo-800 dark:text-slate-400">
                    © {new Date().getFullYear()} Campus Amigo. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
