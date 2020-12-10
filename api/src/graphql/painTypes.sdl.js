export const schema = gql`
  type PainType {
    id: Int!
    title: String!
    triggers: [PainTrigger]!
  }

  type Query {
    painTypes: [PainType!]!
    painType(id: Int!): PainType
  }

  input CreatePainTypeInput {
    title: String!
  }

  input UpdatePainTypeInput {
    title: String
  }

  type Mutation {
    createPainType(input: CreatePainTypeInput!): PainType!
    updatePainType(id: Int!, input: UpdatePainTypeInput!): PainType!
    deletePainType(id: Int!): PainType!
  }
`
