import { merge } from 'lodash'
import { makeExecutableSchema } from 'apollo-server'
import { userResolver } from './resolvers/user'
import { item } from './typeDefs/item'
import { profile } from './typeDefs/profile'
import { inventory } from './typeDefs/inventory'
// import { GraphQLDateTime } from 'graphql-iso-date'

import { user } from './typeDefs/user'

const resolvers = merge({}, userResolver)

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs: [user, profile, inventory, item],
})
