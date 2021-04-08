import { gql } from 'apollo-server'

export const inventory = gql`
  type Inventory {
    id: Int!
    owner: User!
    items: [Item!]
  }
`
