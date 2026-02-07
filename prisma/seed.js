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

    // Create admin user
    const admin = await prisma.user.upsert({
        where: { email: 'admin@campus-amigo.com' },
        update: {},
        create: {
            email: 'admin@campus-amigo.com',
            name: 'Admin User',
            role: 'admin',
            karma: 5000,
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
            latitude: 28.5457,
            longitude: 77.2732,
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
            latitude: 28.5465,
            longitude: 77.2750,
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
            latitude: 28.5440,
            longitude: 77.2700,
            userId: user.id // Just relating for demo
        },
        {
            name: "The Java Cafe",
            cuisine: "Cafe, Beverages",
            rating: 4.7,
            distance: "0.3 km",
            price: "₹₹",
            imageClass: "bg-blue-100",
            imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
            status: "Open Now",
            menuItems: "Cappuccino, Blueberry Muffin, Croissant",
            itemPrices: "₹60, ₹45, ₹35",
            userId: user.id
        },
        {
            name: "Sushi Corner",
            cuisine: "Japanese, Sushi",
            rating: 4.4,
            distance: "0.8 km",
            price: "₹₹₹",
            imageClass: "bg-pink-100",
            imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
            status: "Open Now",
            menuItems: "California Roll, Salmon Sashimi, Miso Soup",
            itemPrices: "₹180, ₹220, ₹60",
            userId: user.id
        },
        {
            name: "Veggie Delight",
            cuisine: "Vegetarian, Healthy",
            rating: 4.3,
            distance: "0.1 km",
            price: "₹₹",
            imageClass: "bg-green-100",
            imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
            status: "Closes in 1hr",
            menuItems: "Quinoa Salad, Avocado Toast, Fresh Juice",
            itemPrices: "₹120, ₹80, ₹40",
            userId: user.id
        }
    ]

    for (const meal of meals) {
        await prisma.meal.create({ data: meal })
    }

    // Seed Notes
    const notes = [
        // 1st Semester
        {
            title: "Engineering Mathematics - Calculus Fundamentals",
            subject: "Engineering Mathematics",
            displayAuthor: "Prof. Sharma",
            semester: "1st Semester",
            size: "2.4 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/engineering_math_calculus.pdf",
            userId: user.id
        },
        {
            title: "Basic Physics - Mechanics & Thermodynamics",
            subject: "Engineering Physics",
            displayAuthor: "Dr. Patel",
            semester: "1st Semester",
            size: "1.8 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/basic_physics_mechanics.pdf",
            userId: user.id
        },
        // 2nd Semester
        {
            title: "Advanced Calculus - Differential Equations",
            subject: "Engineering Mathematics",
            displayAuthor: "Prof. Sharma",
            semester: "2nd Semester",
            size: "2.1 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/advanced_calculus_diff_eq.pdf",
            userId: user.id
        },
        {
            title: "Chemistry - Organic & Inorganic Compounds",
            subject: "Engineering Chemistry",
            displayAuthor: "Dr. Verma",
            semester: "2nd Semester",
            size: "2.7 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/chemistry_compounds.pdf",
            userId: user.id
        },
        // 3rd Semester
        {
            title: "Data Structures - Trees and Graphs",
            subject: "Computer Science",
            displayAuthor: "Dr. Kumar",
            semester: "3rd Semester",
            size: "3.2 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/data_structures_trees_graphs.pdf",
            userId: user.id
        },
        {
            title: "Digital Logic Design - Gates & Circuits",
            subject: "Electronics",
            displayAuthor: "Prof. Singh",
            semester: "3rd Semester",
            size: "2.5 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/digital_logic_gates_circuits.pdf",
            userId: user.id
        },
        // 4th Semester
        {
            title: "Algorithms - Sorting & Searching",
            subject: "Computer Science",
            displayAuthor: "Dr. Kumar",
            semester: "4th Semester",
            size: "2.9 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/algorithms_sorting_searching.pdf",
            userId: user.id
        },
        {
            title: "Database Systems - SQL & Design",
            subject: "Computer Science",
            displayAuthor: "Prof. Gupta",
            semester: "4th Semester",
            size: "3.1 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/database_systems_sql_design.pdf",
            userId: user.id
        },
        // 5th Semester
        {
            title: "Computer Networks - Protocols & Security",
            subject: "Computer Science",
            displayAuthor: "Dr. Mishra",
            semester: "5th Semester",
            size: "3.4 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/computer_networks_protocols_security.pdf",
            userId: user.id
        },
        {
            title: "Software Engineering - SDLC & Testing",
            subject: "Computer Science",
            displayAuthor: "Prof. Agarwal",
            semester: "5th Semester",
            size: "2.8 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/software_engineering_sdlc_testing.pdf",
            userId: user.id
        },
        // 6th Semester
        {
            title: "Machine Learning - Supervised Learning",
            subject: "Computer Science",
            displayAuthor: "Dr. Sharma",
            semester: "6th Semester",
            size: "4.1 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/machine_learning_supervised.pdf",
            userId: user.id
        },
        {
            title: "Compiler Design - Lexical Analysis",
            subject: "Computer Science",
            displayAuthor: "Prof. Tiwari",
            semester: "6th Semester",
            size: "3.3 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/compiler_design_lexical_analysis.pdf",
            userId: user.id
        },
        // 7th Semester
        {
            title: "Artificial Intelligence - Neural Networks",
            subject: "Computer Science",
            displayAuthor: "Dr. Patel",
            semester: "7th Semester",
            size: "3.7 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/ai_neural_networks.pdf",
            userId: user.id
        },
        {
            title: "Data Mining - Clustering & Classification",
            subject: "Computer Science",
            displayAuthor: "Prof. Joshi",
            semester: "7th Semester",
            size: "3.0 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/data_mining_clustering_classification.pdf",
            userId: user.id
        },
        // 8th Semester
        {
            title: "Cloud Computing - AWS & Deployment",
            subject: "Computer Science",
            displayAuthor: "Dr. Shah",
            semester: "8th Semester",
            size: "2.6 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/cloud_computing_aws_deployment.pdf",
            userId: user.id
        },
        {
            title: "Big Data Analytics - Hadoop & Spark",
            subject: "Computer Science",
            displayAuthor: "Prof. Mehta",
            semester: "8th Semester",
            size: "3.8 MB",
            fileType: "PDF",
            downloads: 0,
            fileUrl: "/samples/big_data_analytics_hadoop_spark.pdf",
            userId: user.id
        }
    ];

    for (const note of notes) {
        await prisma.note.create({ data: note })
    }

    // Seed PYQs
    const pyqs = [
        // 1st Semester
        { year: "2024", subject: "Engineering Mathematics-I", semester: "1st Semester", fileUrl: "/samples/eng_math_1_2024_pyq.pdf" },
        { year: "2025", subject: "Engineering Physics", semester: "1st Semester", fileUrl: "/samples/eng_physics_2025_pyq.pdf" },
        // 2nd Semester
        { year: "2024", subject: "Engineering Mathematics-II", semester: "2nd Semester", fileUrl: "/samples/eng_math_2_2024_pyq.pdf" },
        { year: "2025", subject: "Basic Electrical Eng", semester: "2nd Semester", fileUrl: "/samples/basic_electrical_2025_pyq.pdf" },
        // 3rd Semester
        { year: "2024", subject: "Data Structures", semester: "3rd Semester", fileUrl: "/samples/data_structures_2024_pyq.pdf" },
        { year: "2025", subject: "Digital Logic Design", semester: "3rd Semester", fileUrl: "/samples/digital_logic_2025_pyq.pdf" },
        // 4th Semester
        { year: "2024", subject: "Algorithms", semester: "4th Semester", fileUrl: "/samples/algorithms_2024_pyq.pdf" },
        { year: "2025", subject: "Database Management", semester: "4th Semester", fileUrl: "/samples/dbms_2025_pyq.pdf" },
        // 5th Semester
        { year: "2024", subject: "Computer Networks", semester: "5th Semester", fileUrl: "/samples/computer_networks_2024_pyq.pdf" },
        { year: "2025", subject: "Software Engineering", semester: "5th Semester", fileUrl: "/samples/sw_eng_2025_pyq.pdf" },
        // 6th Semester
        { year: "2024", subject: "Compiler Design", semester: "6th Semester", fileUrl: "/samples/compiler_design_2024_pyq.pdf" },
        { year: "2025", subject: "Operating Systems", semester: "6th Semester", fileUrl: "/samples/os_2025_pyq.pdf" },
        // 7th Semester
        { year: "2024", subject: "Machine Learning", semester: "7th Semester", fileUrl: "/samples/ml_2024_pyq.pdf" },
        { year: "2025", subject: "Artificial Intelligence", semester: "7th Semester", fileUrl: "/samples/ai_2025_pyq.pdf" },
        // 8th Semester
        { year: "2024", subject: "Cloud Computing", semester: "8th Semester", fileUrl: "/samples/cloud_computing_2024_pyq.pdf" },
        { year: "2025", subject: "Big Data Analytics", semester: "8th Semester", fileUrl: "/samples/big_data_2025_pyq.pdf" }
    ];

    for (const pyq of pyqs) {
        await prisma.pyq.create({ data: pyq })
    }

    // Seed Events
    const events = [
        // Tech Category
        {
            title: "HackTheVerse 2024",
            date: "March 15, 2024",
            location: "Main Auditorium",
            category: "Tech",
            description: "24-hour hackathon with exciting prizes for innovative projects.",
            participants: "300+ registered"
        },
        {
            title: "AI Innovation Challenge",
            date: "April 20, 2024",
            location: "Computer Science Building",
            category: "Tech",
            description: "AI-focused hackathon with workshops and networking opportunities.",
            participants: "150+ registered"
        },
        // Hackathon Category
        {
            title: "CodeFest 2026",
            date: "February 25, 2026",
            location: "Engineering Block, Auditorium",
            category: "Hackathon",
            description: "Annual coding competition with challenges for beginners to experts. Multiple tracks including web dev, mobile apps, and algorithms.",
            participants: "200+ registered"
        },
        {
            title: "Global Hackathon Series",
            date: "March 10, 2026",
            location: "Innovation Center",
            category: "Hackathon",
            description: "International hackathon focusing on sustainable solutions and social impact projects.",
            participants: "180+ registered"
        },
        // Workshop Category
        {
            title: "WebDev Workshop Series",
            date: "May 5, 2024",
            location: "IT Lab 1",
            category: "Workshop",
            description: "Hands-on web development workshop covering React, Node.js, and MongoDB.",
            participants: "40+ seats"
        },
        {
            title: "Cybersecurity Bootcamp",
            date: "May 12, 2024",
            location: "Cybersecurity Lab",
            category: "Workshop",
            description: "Intensive bootcamp covering ethical hacking, penetration testing, and security protocols.",
            participants: "25+ seats"
        },
        // Cultural Category
        {
            title: "Cultural Fest: Aura",
            date: "April 2-4, 2024",
            location: "Campus Grounds",
            category: "Cultural",
            description: "Annual cultural fest with performances, competitions, and food stalls.",
            participants: "Open to all"
        },
        {
            title: "Music Symphony Night",
            date: "June 10, 2024",
            location: "Campus Amphitheater",
            category: "Cultural",
            description: "Evening of classical and contemporary music performances by talented students.",
            participants: "200+ expected"
        }
    ]

    for (const event of events) {
        await prisma.event.create({ data: event })
    }

    // Seed Products
    const products = [
        {
            title: "Engineering Mechanics (Stark)",
            price: 450,
            description: "Used for one semester, good condition. No markings.",
            category: "Books",
            status: "Available",
            sellerId: user.id
        },
        {
            title: "Scientific Calculator CASIO fx-991EX",
            price: 800,
            description: "Essential for exams. Works perfectly.",
            category: "Electronics",
            status: "Available",
            sellerId: user.id
        },
        {
            title: "Drafting Kit",
            price: 200,
            description: "Complete kit for engineering drawing.",
            category: "Stationery",
            status: "Sold",
            sellerId: user.id
        }
    ]

    for (const product of products) {
        await prisma.product.create({ data: product })
    }

    // Seed Lost Items
    const lostItems = [
        {
            title: "Blue Water Bottle",
            description: "Milton brand, left in Library Room 3.",
            location: "Library",
            status: "Lost",
            userId: user.id
        },
        {
            title: "Black Wireless Earbuds Case",
            description: "Found on the basketball court bench.",
            location: "Sports Complex",
            status: "Found",
            contactInfo: "Collected at Security Desk",
            userId: user.id
        }
    ]

    for (const item of lostItems) {
        await prisma.lostItem.create({ data: item })
    }

    // Seed Posts
    const posts = [
        {
            content: "Has anyone found a blue notebook in the cafeteria? It has my physics notes!",
            likes: 5,
            authorId: user.id
        },
        {
            content: "The cultural fest rehearsals are starting from 5 PM today at the Audi. Be there!",
            likes: 24,
            authorId: user.id
        },
        {
            content: "Selling my old bicycle. DM me if interested.",
            likes: 2,
            authorId: user.id
        }
    ]

    for (const post of posts) {
        await prisma.post.create({ data: post })
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
