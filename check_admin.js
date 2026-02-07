const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function main() {
    const email = 'demo@campus-amigo.com'
    const admin = await db.user.findUnique({
        where: { email }
    })

    if (!admin) {
        console.log(`User ${email} not found. Creating...`)
        await db.user.create({
            data: {
                name: 'Demo Admin',
                email: email,
                role: 'admin',
                karma: 1000
            }
        })
        console.log(`Created admin user: ${email}`)
    } else {
        console.log(`User ${email} found. Role: ${admin.role}`)
        if (admin.role !== 'admin') {
            console.log('Updating role to admin...')
            await db.user.update({
                where: { email },
                data: { role: 'admin' }
            })
            console.log('Role updated.')
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await db.$disconnect())
