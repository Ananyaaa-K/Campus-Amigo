const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Create default user
    const user = await prisma.user.upsert({
        where: { email: 'demo@campus-amigo.com' },
        update: {},
        create: {
            email: 'demo@campus-amigo.com',
            name: 'Michael Jordan',
            role: 'student',
            karma: 1250,
        },
    })

    // Seed Meals
    const meals = [
        {
            name: "Campus Canteen",
            cuisine: "North Indian, Snacks",
            rating: 4.5,
            distance: "On Campus",
            price: "₹",
            imageClass: "bg-orange-100",
            imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
            status: "Open Now",
            menuItems: "Chole Bhature, Masala Dosa, Filter Coffee",
            itemPrices: "₹50, ₹40, ₹20",
            userId: user.id
        },
        {
            name: "Spicy Bites",
            cuisine: "Chinese, Fast Food",
            rating: 4.2,
            distance: "0.2 km",
            price: "₹₹",
            imageClass: "bg-red-100",
            imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=600&fit=crop",
            status: "Open Now",
            menuItems: "Hakka Noodles, Momos, Chilli Potato",
            itemPrices: "₹80, ₹60, ₹70",
            userId: user.id
        },
        {
            name: "Burger Point",
            cuisine: "Burgers, Shakes",
            rating: 3.8,
            distance: "0.5 km",
            price: "₹₹",
            imageClass: "bg-yellow-100",
            imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
            status: "Closes in 30m",
            menuItems: "Crispy Chicken Burger, Oreo Shake, Fries",
            itemPrices: "₹120, ₹90, ₹50",
            userId: user.id // Just relating for demo
        }
    ]

    for (const meal of meals) {
        await prisma.meal.create({ data: meal })
    }

    // Seed Notes
    const notes = [
        {
            subject: "Data Structures",
            title: "Trees and Graphs Implementation",
            displayAuthor: "Rahul Kumar",
            semester: "3rd Sem",
            downloads: 120,
            size: "2.5 MB",
            fileType: "PDF",
            userId: user.id
        },
        {
            subject: "Operating Systems",
            title: "Process Scheduling Algorithms",
            displayAuthor: "Sneha Gupta",
            semester: "4th Sem",
            downloads: 85,
            size: "1.8 MB",
            fileType: "DOCX",
            userId: user.id
        }
    ]

    for (const note of notes) {
        await prisma.note.create({ data: note })
    }

    // Seed PYQs
    const pyqs = [
        { year: "2023", subject: "Applied Mathematics-I" },
        { year: "2022", subject: "Engineering Physics" },
        { year: "2021", subject: "Computer Programming" }
    ]

    for (const pyq of pyqs) {
        await prisma.pyq.create({ data: pyq })
    }

    // Seed Events
    const events = [
        {
            title: "HackTheVerse 2024",
            date: "March 15, 2024",
            location: "Main Auditorim",
            category: "Tech",
            description: "24-hour hackathon.",
            participants: "300+ registered"
        },
        {
            title: "Cultural Fest: Aura",
            date: "April 2-4, 2024",
            location: "Campus Grounds",
            category: "Cultural",
            description: "Annual cultural fest.",
            participants: "Open to all"
        }
    ]

    for (const event of events) {
        await prisma.event.create({ data: event })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
