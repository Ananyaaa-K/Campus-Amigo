
import { Card, CardContent, CardHeader } from "@/components/ui/Card"

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                    <div className="h-4 w-72 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                </div>
            </div>

            <div className="mb-8 w-full md:w-1/2">
                <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden h-full">
                        <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                        <CardHeader className="pb-2 space-y-2">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2 flex-1">
                                    <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                                    <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                                </div>
                                <div className="h-6 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                                <div className="h-4 w-10 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-2 animate-pulse" />
                                <div className="flex gap-2">
                                    <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
                                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
