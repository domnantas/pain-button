import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import PainTriggerForm from 'src/components/PainTriggerForm'

export const QUERY = gql`
  query FIND_PAIN_TRIGGER_BY_ID($id: Int!) {
    painTrigger: painTrigger(id: $id) {
      id
      painTypeId
      triggeredAt
    }
  }
`
const UPDATE_PAIN_TRIGGER_MUTATION = gql`
  mutation UpdatePainTriggerMutation(
    $id: Int!
    $input: UpdatePainTriggerInput!
  ) {
    updatePainTrigger(id: $id, input: $input) {
      id
      painTypeId
      triggeredAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ painTrigger }) => {
  const { addMessage } = useFlash()
  const [updatePainTrigger, { loading, error }] = useMutation(
    UPDATE_PAIN_TRIGGER_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.painTriggers())
        addMessage('PainTrigger updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      painTypeId: parseInt(input.painTypeId),
    })
    updatePainTrigger({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PainTrigger {painTrigger.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PainTriggerForm
          painTrigger={painTrigger}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
