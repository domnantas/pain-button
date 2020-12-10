import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import PainTriggerForm from 'src/components/PainTriggerForm'

import { QUERY } from 'src/components/PainTriggersCell'

const CREATE_PAIN_TRIGGER_MUTATION = gql`
  mutation CreatePainTriggerMutation($input: CreatePainTriggerInput!) {
    createPainTrigger(input: $input) {
      id
    }
  }
`

const NewPainTrigger = () => {
  const { addMessage } = useFlash()
  const [createPainTrigger, { loading, error }] = useMutation(
    CREATE_PAIN_TRIGGER_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.painTriggers())
        addMessage('PainTrigger created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      painTypeId: parseInt(input.painTypeId),
    })
    createPainTrigger({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New PainTrigger</h2>
      </header>
      <div className="rw-segment-main">
        <PainTriggerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPainTrigger
