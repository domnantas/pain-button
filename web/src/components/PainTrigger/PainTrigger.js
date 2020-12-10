import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/PainTriggersCell'

const DELETE_PAIN_TRIGGER_MUTATION = gql`
  mutation DeletePainTriggerMutation($id: Int!) {
    deletePainTrigger(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const PainTrigger = ({ painTrigger }) => {
  const { addMessage } = useFlash()
  const [deletePainTrigger] = useMutation(DELETE_PAIN_TRIGGER_MUTATION, {
    onCompleted: () => {
      navigate(routes.painTriggers())
      addMessage('PainTrigger deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete painTrigger ' + id + '?')) {
      deletePainTrigger({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PainTrigger {painTrigger.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{painTrigger.id}</td>
            </tr>
            <tr>
              <th>Pain type id</th>
              <td>{painTrigger.painTypeId}</td>
            </tr>
            <tr>
              <th>Triggered at</th>
              <td>{timeTag(painTrigger.triggeredAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPainTrigger({ id: painTrigger.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(painTrigger.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default PainTrigger
