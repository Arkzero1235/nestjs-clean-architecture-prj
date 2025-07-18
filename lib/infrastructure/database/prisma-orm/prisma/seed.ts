import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.admin.create({
        data: {
            name: "Admin 1",
            email: "admin@example.com",
            password: "$argon2id$v=19$m=65536,t=3,p=4$3GyGSzioaOW/1slbvw7dEQ$NWafVno7hyATXRYR/pznbbOJ0Bu0FJoxyki//hbuvJE",
            phone: "0123456789",
            role: "ADMIN"
        }
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

// npx prisma db seed
