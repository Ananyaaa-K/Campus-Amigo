'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Something went wrong!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
                We encountered an error while loading this page. This might be due to a network connection or a temporary server issue.
            </p>
            <div className="flex gap-4">
                <Button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                    Go Home
                </Button>
            </div>
        </div>
    )
}
