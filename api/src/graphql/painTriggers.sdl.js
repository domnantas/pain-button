export const schema = gql`
  type PainTrigger {
    id: Int!
    painTypeId: Int!
    pain: PainType!
    triggeredAt: DateTime!
  }

  type Query {
    painTriggers: [PainTrigger!]!
  }

  input CreatePainTriggerInput {
    painTypeId: Int!
  }

  type Mutation {
    createPainTrigger(input: CreatePainTriggerInput!): PainTrigger!
  }
`
