import PainType from 'src/components/admin/PainType'

export const QUERY = gql`
  query FIND_PAIN_TYPE_BY_ID($id: Int!) {
    painType: painType(id: $id) {
      id
      title
      triggers {
        triggeredAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PainType not found</div>

export const Success = ({ painType }) => {
  return <PainType painType={painType} />
}
