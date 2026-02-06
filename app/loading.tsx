export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mb-8"></div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                ))}
            </div>
        </div>
    )
}
