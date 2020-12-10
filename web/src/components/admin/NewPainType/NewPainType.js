import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import PainTypeForm from 'src/components/admin/PainTypeForm'

const CREATE_PAIN_TYPE_MUTATION = gql`
  mutation CreatePainTypeMutation($input: CreatePainTypeInput!) {
    createPainType(input: $input) {
      id
    }
  }
`

const NewPainType = () => {
  const { addMessage } = useFlash()
  const [createPainType, { loading, error }] = useMutation(
    CREATE_PAIN_TYPE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.painTypes())
        addMessage('PainType created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createPainType({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New PainType</h2>
      </header>
      <div className="rw-segment-main">
        <PainTypeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPainType
