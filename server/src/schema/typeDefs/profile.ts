import { gql } from 'apollo-server'

export const profile = gql`
  type Profile {
    id: Int!
    bio: String
    user: User
    title: String
  }
`
