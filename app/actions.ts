"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function getCurrentUser() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) return null

    try {
        const user = await db.user.findUnique({
            where: { id: userId }
        })
        return user
    } catch (e) {
        return null
    }
}

export async function login(formData: FormData) {
    const email = formData.get("email") as string
    if (!email) return { success: false, message: "Email is required" }

    try {
        let user = await db.user.findUnique({
            where: { email }
        })

        if (!user) {
            // Auto-signup for demo purposes
            user = await db.user.create({
                data: {
                    email,
                    name: email.split("@")[0],
                    role: "student"
                }
            })
        }

        const cookieStore = await cookies()
        cookieStore.set("userId", user.id, { secure: true, httpOnly: true, path: "/" })

        return { success: true, message: "Logged in successfully!" }
    } catch (error) {
        console.error("Login error:", error)
        return { success: false, message: "Failed to login" }
    }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete("userId")
    revalidatePath("/")
}

export async function createMeal(formData: FormData) {
    try {
        const name = formData.get("name") as string
        const cuisine = formData.get("cuisine") as string
        const price = formData.get("price") as string
        const locationHint = formData.get("locationHint") as string

        // Real Auth
        const user = await getCurrentUser()
        if (!user) {
            return { success: false, message: "You must be logged in to suggest a meal." }
        }

        if (!name || !cuisine) {
            return { success: false, message: "Name and Cuisine are required" }
        }

        await db.meal.create({
            data: {
                name,
                cuisine,
                price: price || "₹",
                distance: locationHint || "Unknown",
                status: "Open Now",
                menuItems: "Suggested Place",
                imageClass: "bg-indigo-100",
                userId: user?.id // Link to user
            }
        })

        // Update User Karma
        if (user) {
            await db.user.update({
                where: { id: user.id },
                data: { karma: { increment: 10 } }
            })
        }

        revalidatePath("/meals")
        revalidatePath("/profile")
        return { success: true, message: "Suggestion submitted successfully!" }
    } catch (error) {
        console.error("Error creating meal:", error)
        return { success: false, message: "Failed to submit suggestion. Please try again." }
    }
}

export async function createNote(formData: FormData) {
    try {
        const title = formData.get("title") as string
        const subject = formData.get("subject") as string

        // Real Auth
        const user = await getCurrentUser()
        if (!user) {
            return { success: false, message: "You must be logged in to upload notes." }
        }

        if (!title) {
            return { success: false, message: "Title is required" }
        }

        await db.note.create({
            data: {
                title,
                subject: subject || "General",
                displayAuthor: user?.name,
                semester: "General",
                size: "1.2 MB", // Mock
                fileType: "PDF",
                downloads: 0,
                userId: user?.id
            }
        })

        if (user) {
            await db.user.update({
                where: { id: user.id },
                data: { karma: { increment: 20 } }
            })
        }

        revalidatePath("/notes")
        revalidatePath("/profile")
        return { success: true, message: "Note uploaded successfully!" }
    } catch (error) {
        console.error("Error creating note:", error)
        return { success: false, message: "Failed to upload note." }
    }
}

export async function createPyq(formData: FormData) {
    try {
        const subject = formData.get("subject") as string
        const year = formData.get("year") as string || "2024"
        const semester = formData.get("semester") as string || "General"

        if (!subject) {
            return { success: false, message: "Subject is required" }
        }

        await db.pyq.create({
            data: {
                subject,
                year,
                semester
            }
        })

        revalidatePath("/pyqs")
        return { success: true, message: "PYQ uploaded successfully!" }
    } catch (error) {
        console.error("Error creating PYQ:", error)
        return { success: false, message: "Failed to upload PYQ." }
    }
}

export async function createEvent(formData: FormData) {
    try {
        const title = formData.get("title") as string
        const date = formData.get("date") as string
        const location = formData.get("location") as string
        const description = formData.get("description") as string

        if (!title || !date) {
            return { success: false, message: "Title and Date are required" }
        }

        await db.event.create({
            data: {
                title,
                date,
                location: location || "Campus Center",
                description: description || "Join us for this amazing event!",
                category: "Student Activity",
                participants: "0+"
            }
        })

        revalidatePath("/events")
        return { success: true, message: "Event created successfully!" }
    } catch (error) {
        console.error("Error creating event:", error)
        return { success: false, message: "Failed to create event." }
    }
}

export async function updateProfile(formData: FormData) {
    try {
        const name = formData.get("name") as string
        const role = formData.get("role") as string

        // Real Auth
        const user = await getCurrentUser()

        if (!user) {
            return { success: false, message: "Not authenticated" }
        }

        if (user) {
            await db.user.update({
                where: { id: user.id },
                data: { name, role }
            })
        }

        revalidatePath("/profile")
        return { success: true, message: "Profile updated!" }
    } catch (error) {
        console.error("Error updating profile:", error)
        return { success: false, message: "Failed to update profile." }
    }
}
