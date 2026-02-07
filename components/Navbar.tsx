"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar, Coffee, GraduationCap, FileText, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/Button"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { name: "Meals", href: "/meals", icon: Coffee },
    { name: "Notes", href: "/notes", icon: BookOpen },
    { name: "PYQs", href: "/pyqs", icon: FileText },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Student Portal", href: "/student-portal", icon: Coffee },
]

import { logout } from "@/app/actions"
import { useRouter } from "next/navigation"

export function Navbar({ user }: { user: any }) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    async function handleLogout() {
        await logout()
        router.push("/")
        // Force refresh to update auth state in (server) components
        router.refresh()
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-indigo-100 bg-white/80 backdrop-blur-xl dark:border-indigo-900 dark:bg-slate-950/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <GraduationCap className="h-6 w-6" />
                    <span className="text-xl font-bold tracking-tight">Campus Amigo</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-indigo-600",
                                    isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
                <div className="hidden md:flex gap-2">
                    {user ? (
                        <>
                            <Link href="/profile">
                                <Button variant="outline" size="sm">Profile</Button>
                            </Link>
                            <Button size="sm" onClick={handleLogout}>Log Out</Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button size="sm">Log In</Button>
                        </Link>
                    )}
                </div>
                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-indigo-100 bg-white dark:border-indigo-900 dark:bg-slate-950"
                    >
                        <div className="flex flex-col space-y-4 p-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400"
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 pt-4 border-t border-indigo-50">
                                {user ? (
                                    <>
                                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                                            <Button variant="outline" className="w-full justify-start">Profile</Button>
                                        </Link>
                                        <Button className="w-full justify-start" onClick={() => { setIsOpen(false); handleLogout(); }}>Log Out</Button>
                                    </>
                                ) : (
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full justify-start">Log In</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
