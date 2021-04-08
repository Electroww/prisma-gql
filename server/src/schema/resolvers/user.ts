import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

const expiresIn = '1 day'

export const userResolver = {
  User: {
    profile: (parent, _args, { prisma }) =>
      prisma.user
        .findUnique({
          where: { id: parent?.id },
        })
        .profile(),
    inventory: (parent, _args, { prisma }) =>
      prisma.user
        .findUnique({
          where: { id: parent?.id },
        })
        .inventory(),
  },
  Mutation: {
    // { prisma } -> Context
    async createUser(_parent, { data }, { prisma }) {
      const password = await bcrypt.hash(data.password, 10)
      const user = await prisma.user.create({
        data: {
          ...data,
          password,
          profile: {
            create: {
              bio: '',
              title: '',
            },
          },
          inventory: {
            create: {
              items: {
                create: [],
              },
            },
          },
        },
      })
      const userWithToken = {
        ...user,
        token: jwt.sign(
          { userId: user.id },
          process.env.TOKEN_SECRET,
          { expiresIn },
        ),
      }
      return userWithToken
    },
  },
  Query: {
    async loginUser(_parent, { email, password }, { prisma }) {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) throw new Error('No User Found')
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) throw new Error('Wrong Password')
      const userWithToken = {
        ...user,
        token: jwt.sign(
          { userId: user.id },
          process.env.TOKEN_SECRET,
          { expiresIn },
        ),
      }
      return userWithToken
    },
    async me(_parent, _args, { prisma, user }) {
      try {
        const userInfos = await prisma.user.findUnique({
          where: { id: user.id },
        })
        return userInfos
      } catch (error) {
        throw new Error('You are disconnected')
      }
    },
  },
}
