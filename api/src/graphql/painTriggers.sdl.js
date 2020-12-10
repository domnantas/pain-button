export const schema = gql`
  type PainTrigger {
    id: Int!
    painTypeId: Int!
    pain: PainType!
    triggeredAt: DateTime!
  }

  type Query {
    painTriggers: [PainTrigger!]!
    painTrigger(id: Int!): PainTrigger
  }

  input CreatePainTriggerInput {
    painTypeId: Int!
    triggeredAt: DateTime!
  }

  input UpdatePainTriggerInput {
    painTypeId: Int
    triggeredAt: DateTime
  }

  type Mutation {
    createPainTrigger(input: CreatePainTriggerInput!): PainTrigger!
    updatePainTrigger(id: Int!, input: UpdatePainTriggerInput!): PainTrigger!
    deletePainTrigger(id: Int!): PainTrigger!
  }
`
