import { PrismaClient, User } from '@prisma/client'
import { getUserFromToken } from './lib/token'

export interface Context {
  prisma: PrismaClient
  user: User | boolean
}

const prisma = new PrismaClient()

export const context = async ({ req }): Promise<Context> => {
  const token = req.headers.token || ''
  const user = await getUserFromToken(token, prisma)
  return {
    prisma,
    user,
  }
}
