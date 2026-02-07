"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Mock function to check if user is admin. 
// In a real app, you'd check a session/cookie. 
// For this demo, we'll assume a specific email or id is admin, 
// OR we rely on client-side protection + server validation if we had auth.
// Since we have a simple user implementation, let's fetch the user by email or ID if passed.
// For now, we'll just check if the user *associated with the action* has the admin role.
// NOTE: In a real Next.js app with Auth.js/NextAuth, you would get the session here.

export async function deleteNote(userId: string, noteId: number) {
    try {
        const user = await db.user.findUnique({
            where: { id: userId }
        })

        if (!user || user.role !== "admin") {
            return { error: "Unauthorized. Admin access required." }
        }

        await db.note.delete({
            where: { id: noteId }
        })

        revalidatePath("/admin")
        revalidatePath("/notes")
        return { success: "Note deleted successfully." }
    } catch (error) {
        console.error("Delete note error:", error)
        return { error: "Failed to delete note." }
    }
}

export async function updateNote(userId: string, noteId: number, data: { title: string, subject: string }) {
    try {
        const user = await db.user.findUnique({
            where: { id: userId }
        })

        if (!user || user.role !== "admin") {
            return { error: "Unauthorized. Admin access required." }
        }

        await db.note.update({
            where: { id: noteId },
            data: {
                title: data.title,
                subject: data.subject
            }
        })

        revalidatePath("/admin")
        revalidatePath("/notes")
        return { success: "Note updated successfully." }

    } catch (error) {
        console.error("Update note error:", error)
        return { error: "Failed to update note." }
    }
}


export async function updateEvent(userId: string, eventId: number, data: { title: string, location: string, date: string }) {
    try {
        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user || user.role !== "admin") return { error: "Unauthorized" }

        await db.event.update({
            where: { id: eventId },
            data
        })
        revalidatePath("/admin")
        revalidatePath("/events")
        return { success: "Event updated successfully." }
    } catch (error) {
        return { error: "Failed to update event." }
    }
}

export async function updateProduct(userId: string, productId: number, data: { title: string, price: number, status: string }) {
    try {
        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user || user.role !== "admin") return { error: "Unauthorized" }

        await db.product.update({
            where: { id: productId },
            data
        })
        revalidatePath("/admin")
        revalidatePath("/marketplace")
        return { success: "Product updated successfully." }
    } catch (error) {
        return { error: "Failed to update product." }
    }
}


export async function deleteEvent(userId: string, eventId: number) {
    return deleteEntity(userId, 'event', eventId, '/events')
}

export async function deleteProduct(userId: string, productId: number) {
    return deleteEntity(userId, 'product', productId, '/marketplace')
}

export async function deleteLostItem(userId: string, itemId: number) {
    return deleteEntity(userId, 'lostItem', itemId, '/lost-and-found')
}

export async function deletePyq(userId: string, pyqId: number) {
    return deleteEntity(userId, 'pyq', pyqId, '/pyqs')
}

export async function deleteMeal(userId: string, mealId: number) {
    return deleteEntity(userId, 'meal', mealId, '/meals')
}


// Helper to reduce repetition
async function deleteEntity(userId: string, model: 'event' | 'product' | 'lostItem' | 'pyq' | 'meal', id: number, revalidateRoute: string) {
    try {
        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user || user.role !== "admin") return { error: "Unauthorized" }

        // @ts-ignore - Dynamic access to prisma model
        await db[model].delete({ where: { id } })

        revalidatePath("/admin")
        revalidatePath(revalidateRoute)
        return { success: "Item deleted successfully." }
    } catch (error) {
        console.error(`Delete ${model} error:`, error)
        return { error: `Failed to delete ${model}.` }
    }
}
