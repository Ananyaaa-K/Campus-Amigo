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
    const role = formData.get("role") as string
    
    if (!email) return { success: false, message: "Email is required" }
    if (!role) return { success: false, message: "Please select your role" }

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
                    role // Use selected role
                }
            })
        } else {
            // Update role if user exists but role is different
            if (user.role !== role) {
                user = await db.user.update({
                    where: { id: user.id },
                    data: { role }
                })
            }
        }

        const cookieStore = await cookies()
        cookieStore.set("userId", user.id, { secure: true, httpOnly: true, path: "/" })

        return { success: true, message: `Logged in successfully as ${role}!` }
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
        const semester = formData.get("semester") as string
        const file = formData.get("file") as File | null

        // Real Auth
        const user = await getCurrentUser()
        if (!user) {
            return { success: false, message: "You must be logged in to upload notes." }
        }

        if (!title) {
            return { success: false, message: "Title is required" }
        }

        // For demo purposes, we'll create a mock file URL
        // In a real application, you would upload to cloud storage (AWS S3, Google Cloud, etc.)
        let fileUrl = null
        let size = "1.2 MB"
        let fileType = "PDF"
        
        if (file && file.name) {
            // Mock file processing - in real app you'd upload to cloud storage
            fileUrl = `/api/files/note_${Date.now()}_${file.name}`
            fileType = file.name.split('.').pop()?.toUpperCase() || "PDF"
            // Convert file size to human readable format
            const fileSize = file.size
            if (fileSize < 1024 * 1024) {
                size = `${Math.round(fileSize / 1024)} KB`
            } else {
                size = `${(fileSize / (1024 * 1024)).toFixed(1)} MB`
            }
        }

        await db.note.create({
            data: {
                title,
                subject: subject || "General",
                displayAuthor: user?.name,
                semester: semester || "General",
                size,
                fileType,
                fileUrl, // Store the file URL
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
        revalidatePath("/admin")
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
        const file = formData.get("file") as File | null

        if (!subject) {
            return { success: false, message: "Subject is required" }
        }

        // For demo purposes, we'll create a mock file URL
        // In a real application, you would upload to cloud storage (AWS S3, Google Cloud, etc.)
        let fileUrl = null
        
        if (file && file.name) {
            // Mock file processing - in real app you'd upload to cloud storage
            fileUrl = `/api/files/pyq_${Date.now()}_${file.name}`
        }

        await db.pyq.create({
            data: {
                subject,
                year,
                semester,
                fileUrl  // Store the file URL
            }
        })

        revalidatePath("/pyqs")
        revalidatePath("/admin")
        return { success: true, message: "PYQ uploaded successfully!" }
    } catch (error) {
        console.error("Error creating PYQ:", error)
        return { success: false, message: "Failed to upload PYQ." }
    }
}

export async function createEvent(formData: FormData) {
    try {
        console.log("createEvent called");
        const title = formData.get("title") as string
        const date = formData.get("date") as string
        const location = formData.get("location") as string
        const description = formData.get("description") as string

        console.log("Form data in action:", { title, date, location, description });

        if (!title || !date) {
            console.log("Validation failed: title or date missing");
            return { success: false, message: "Title and Date are required" }
        }

        console.log("Creating event in database");
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

        console.log("Event created successfully");
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

export async function createQuery(formData: FormData) {
    try {
        const title = formData.get("title") as string
        const content = formData.get("content") as string

        const user = await getCurrentUser()
        if (!user) {
            return { success: false, message: "You must be logged in to post a query." }
        }

        if (!title || !content) {
            return { success: false, message: "Title and content are required" }
        }

        await db.query.create({
            data: {
                title,
                content,
                authorId: user.id
            }
        })

        revalidatePath("/student-portal")
        revalidatePath("/admin")
        return { success: true, message: "Query posted successfully!" }
    } catch (error) {
        console.error("Error creating query:", error)
        return { success: false, message: "Failed to post query." }
    }
}

export async function createReply(formData: FormData) {
    try {
        const content = formData.get("content") as string
        const queryId = formData.get("queryId") as string

        const user = await getCurrentUser()
        if (!user) {
            return { success: false, message: "You must be logged in to reply." }
        }

        if (!content) {
            return { success: false, message: "Reply content is required" }
        }

        await db.reply.create({
            data: {
                content,
                queryId: parseInt(queryId),
                authorId: user.id
            }
        })

        // Update query status to answered
        await db.query.update({
            where: { id: parseInt(queryId) },
            data: { status: "answered" }
        })

        revalidatePath("/student-portal")
        revalidatePath("/admin")
        return { success: true, message: "Reply posted successfully!" }
    } catch (error) {
        console.error("Error creating reply:", error)
        return { success: false, message: "Failed to post reply." }
    }
}
