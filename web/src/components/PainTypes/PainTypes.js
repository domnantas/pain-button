import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/PainTypesCell'

const DELETE_PAIN_TYPE_MUTATION = gql`
  mutation DeletePainTypeMutation($id: Int!) {
    deletePainType(id: $id) {
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

const PainTypesList = ({ painTypes }) => {
  const { addMessage } = useFlash()
  const [deletePainType] = useMutation(DELETE_PAIN_TYPE_MUTATION, {
    onCompleted: () => {
      addMessage('PainType deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete painType ' + id + '?')) {
      deletePainType({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {painTypes.map((painType) => (
            <tr key={painType.id}>
              <td>{truncate(painType.id)}</td>
              <td>{truncate(painType.title)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.painType({ id: painType.id })}
                    title={'Show painType ' + painType.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPainType({ id: painType.id })}
                    title={'Edit painType ' + painType.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete painType ' + painType.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(painType.id)}
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

export default PainTypesList
