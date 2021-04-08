import { gql } from 'apollo-server'
export const item = gql`
  type Item {
    id: Int!
    name: String!
    rarity: Int!
  }
`
