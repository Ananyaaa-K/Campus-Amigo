"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addReview(mealId: number, rating: number, comment: string) {
    // 1. Get user - simulating logged in user
    const user = await db.user.findUnique({
        where: { email: 'demo@campus-amigo.com' }
    })

    if (!user) {
        return { error: "You must be logged in to review." }
    }

    if (!mealId || !rating) {
        return { error: "Invalid review data." }
    }

    try {
        await db.review.create({
            data: {
                rating,
                comment,
                mealId,
                userId: user.id
            }
        })

        revalidatePath("/meals")
        return { success: "Review added successfully!" }
    } catch (error) {
        console.error("Add review error:", error)
        return { error: "Failed to add review." }
    }
}
