"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"
import { Copy, Mail } from "lucide-react"
import { toast } from "sonner"

interface ContactButtonProps {
    label: string
    title?: string
    description?: string
    contactInfo: string | null | undefined
    variant?: "default" | "outline" | "secondary" | "ghost" | "accent"
    className?: string
}

export function ContactButton({
    label,
    title = "Contact Information",
    description,
    contactInfo,
    variant = "default",
    className
}: ContactButtonProps) {
    const [open, setOpen] = useState(false)

    const handleCopy = () => {
        if (contactInfo) {
            navigator.clipboard.writeText(contactInfo)
            toast.success("Copied to clipboard!")
        }
    }

    if (!contactInfo) {
        return (
            <Button variant={variant} className={className} disabled>
                {label} (No Info)
            </Button>
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={variant} className={className}>
                    {label}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description || "Use the details below to get in touch."}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                            <span className="text-sm font-medium break-all">{contactInfo}</span>
                            <Button size="sm" variant="ghost" onClick={handleCopy} className="h-8 w-8 p-0">
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
