"use client"

import { Button } from "@/components/ui/Button"
import { UploadModal } from "@/components/modals/UploadModal"
import { useState } from "react"
import { CloudUpload } from "lucide-react"

interface UploadModalWrapperProps {
    type: "Note" | "PYQ"
}

export function UploadModalWrapper({ type }: UploadModalWrapperProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <UploadModal isOpen={isOpen} onClose={() => setIsOpen(false)} type={type} />
            {/* Positioning this button is tricky if we want it to replace the header button.
                 I'll render the header button style here and just place it in the header.
                 Wait, Server Component renders layout, Client Component renders just the interaction.
                 I'll make this render JUST the open button (and the modal).
              */}
            <div className="fixed bottom-8 right-8 z-40 md:static md:z-auto inline-block">
                <Button onClick={() => setIsOpen(true)} className="shadow-lg md:shadow-none bg-indigo-600 hover:bg-indigo-700 text-white">
                    <CloudUpload className="mr-2 h-4 w-4 md:hidden" />
                    Upload {type === 'Note' ? 'Notes' : 'PYQ'}
                </Button>
            </div>
        </>
    )
}
