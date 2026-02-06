
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                    <div className="h-4 w-72 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                <div className="flex gap-2">
                    <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                    <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse md:hidden" />
                </div>
            </div>

            <div className="grid gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i} className="h-auto">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                                    <div className="flex gap-2">
                                        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                                        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:block space-y-1 text-right">
                                    <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse ml-auto" />
                                    <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                                </div>
                                <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
