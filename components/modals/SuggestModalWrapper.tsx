"use client"

import { Button } from "@/components/ui/Button"
import { SuggestModal } from "@/components/modals/SuggestModal"
import { useState } from "react"

export function SuggestModalWrapper() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="absolute top-24 right-4 md:static md:block hidden">
                {/* This button positioning is tricky because I removed it from the flex header in the server component. 
                     Better to pass it as a prop or restructure. 
                     For now, I'll put a fixed button for mobile/desktop here? 
                     Actually, let's just render the button inside here and place this component where the button was.
                 */}
            </div>
            {/* 
               Wait, I need the button to trigger this. 
               The button was: <Button onClick={() => setIsSuggestModalOpen(true)}>Suggest a Place</Button>
            */}
            <SuggestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className="fixed bottom-8 right-8 z-40 md:static md:z-auto">
                <Button onClick={() => setIsOpen(true)} className="shadow-lg md:shadow-none">Suggest a Place</Button>
            </div>
        </>
    )
}
