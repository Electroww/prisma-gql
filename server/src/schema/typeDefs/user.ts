import { gql } from 'apollo-server'

export const user = gql`
  type User {
    id: Int!
    email: String!
    username: String
    password: String!
    inventory: Inventory!
    profile: Profile!
    token: String
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
  }

  type Query {
    loginUser(email: String!, password: String!): User!
    me: User!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }
`
