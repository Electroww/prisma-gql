import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  await prisma.user.create({
    data: {
      username: 'Elec',
      email: 'elec@prisma.io',
      password: 'toto',
      inventory: {
        create: {},
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
