import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/PainTriggersCell'

const DELETE_PAIN_TRIGGER_MUTATION = gql`
  mutation DeletePainTriggerMutation($id: Int!) {
    deletePainTrigger(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const PainTriggersList = ({ painTriggers }) => {
  const { addMessage } = useFlash()
  const [deletePainTrigger] = useMutation(DELETE_PAIN_TRIGGER_MUTATION, {
    onCompleted: () => {
      addMessage('PainTrigger deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete painTrigger ' + id + '?')) {
      deletePainTrigger({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Pain type id</th>
            <th>Triggered at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {painTriggers.map((painTrigger) => (
            <tr key={painTrigger.id}>
              <td>{truncate(painTrigger.id)}</td>
              <td>{truncate(painTrigger.painTypeId)}</td>
              <td>{timeTag(painTrigger.triggeredAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.painTrigger({ id: painTrigger.id })}
                    title={'Show painTrigger ' + painTrigger.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPainTrigger({ id: painTrigger.id })}
                    title={'Edit painTrigger ' + painTrigger.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete painTrigger ' + painTrigger.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(painTrigger.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PainTriggersList
