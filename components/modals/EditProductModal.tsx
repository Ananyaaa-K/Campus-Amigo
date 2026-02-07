"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Edit } from "lucide-react"
import { updateProduct } from "@/actions/admin"
import { toast } from "sonner"

export function EditProductModal({ product, adminUserId }: { product: any, adminUserId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [status, setStatus] = useState(product.status)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const result = await updateProduct(adminUserId, product.id, { title, price: parseFloat(price), status })

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Product updated successfully!")
            setIsOpen(false)
        }
        setIsSubmitting(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border rounded p-2 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded p-2 text-sm">
                            <option value="Available">Available</option>
                            <option value="Sold">Sold</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
