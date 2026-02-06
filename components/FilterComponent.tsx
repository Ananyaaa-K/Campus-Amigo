"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Filter } from "lucide-react"

interface FilterOption {
    label: string
    value: string
}

interface FilterComponentProps {
    label: string
    paramName: string
    options: FilterOption[]
    className?: string
}

export function FilterComponent({ label, paramName, options, className }: FilterComponentProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const currentValue = searchParams.get(paramName) || ""

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value
        const params = new URLSearchParams(searchParams)

        if (value) {
            params.set(paramName, value)
        } else {
            params.delete(paramName)
        }

        router.replace(`?${params.toString()}`)
    }

    return (
        <div className={`relative ${className}`}>
            <div className="absolute left-3 top-2.5 pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
            </div>
            <select
                className="w-full appearance-none pl-9 pr-8 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 cursor-pointer hover:border-indigo-300 transition-colors"
                value={currentValue}
                onChange={handleChange}
                aria-label={label}
            >
                <option value="">{label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none">
                <svg className="h-3 w-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    )
}
