import PainTrigger from 'src/components/PainTrigger'

export const QUERY = gql`
  query FIND_PAIN_TRIGGER_BY_ID($id: Int!) {
    painTrigger: painTrigger(id: $id) {
      id
      painTypeId
      triggeredAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PainTrigger not found</div>

export const Success = ({ painTrigger }) => {
  return <PainTrigger painTrigger={painTrigger} />
}
