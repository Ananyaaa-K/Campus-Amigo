import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'accent';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'md', ...props }, ref) => {
        const variants = {
            default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg",
            outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
            ghost: "hover:bg-slate-100 text-slate-700",
            secondary: "bg-pink-500 text-white hover:bg-pink-600 shadow-md",
            accent: "bg-amber-400 text-slate-900 hover:bg-amber-500 font-bold",
        }

        const sizes = {
            sm: "h-9 px-3 text-xs rounded-md",
            md: "h-11 px-6 py-2 rounded-lg",
            lg: "h-14 px-8 text-lg rounded-xl",
            icon: "h-10 w-10 p-2 rounded-full flex items-center justify-center",
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
