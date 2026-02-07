"use client"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { login } from "@/app/actions"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { User, Shield } from "lucide-react"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            const result = await login(formData)
            if (result.success) {
                toast.success(result.message)
                router.push("/profile")
            } else {
                toast.error(result.message)
            }
        } catch (e) {
            toast.error("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Select your role and enter your email to sign in</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-indigo-300"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">I am a</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="relative flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white p-4 text-center hover:bg-slate-50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-950/20">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        defaultChecked
                                        className="sr-only"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <User className="h-5 w-5 text-slate-600 has-[:checked]:text-indigo-600 dark:text-slate-400 dark:has-[:checked]:text-indigo-400" />
                                        <span className="text-sm font-medium text-slate-900 has-[:checked]:text-indigo-700 dark:text-slate-200 dark:has-[:checked]:text-indigo-300">Student</span>
                                    </div>
                                </label>
                                <label className="relative flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white p-4 text-center hover:bg-slate-50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-950/20">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        className="sr-only"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <Shield className="h-5 w-5 text-slate-600 has-[:checked]:text-indigo-600 dark:text-slate-400 dark:has-[:checked]:text-indigo-400" />
                                        <span className="text-sm font-medium text-slate-900 has-[:checked]:text-indigo-700 dark:text-slate-200 dark:has-[:checked]:text-indigo-300">Admin</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <Button className="w-full" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
