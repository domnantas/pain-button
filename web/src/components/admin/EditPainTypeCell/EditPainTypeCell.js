import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import PainTypeForm from 'src/components/admin/PainTypeForm'

export const QUERY = gql`
  query FIND_PAIN_TYPE_BY_ID($id: Int!) {
    painType: painType(id: $id) {
      id
      title
    }
  }
`
const UPDATE_PAIN_TYPE_MUTATION = gql`
  mutation UpdatePainTypeMutation($id: Int!, $input: UpdatePainTypeInput!) {
    updatePainType(id: $id, input: $input) {
      id
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ painType }) => {
  const { addMessage } = useFlash()
  const [updatePainType, { loading, error }] = useMutation(
    UPDATE_PAIN_TYPE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.painTypes())
        addMessage('PainType updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updatePainType({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PainType {painType.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PainTypeForm
          painType={painType}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
