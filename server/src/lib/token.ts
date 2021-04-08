import { DecodedToken } from './../types/token.interface'
import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

export const getUserFromToken = async (
  token: string,
  prisma: PrismaClient,
) => {
  try {
    const { userId } = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
    ) as DecodedToken
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    return user
  } catch (error) {
    return false
  }
}
