import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/PainTypesCell'

const DELETE_PAIN_TYPE_MUTATION = gql`
  mutation DeletePainTypeMutation($id: Int!) {
    deletePainType(id: $id) {
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

const PainType = ({ painType }) => {
  const { addMessage } = useFlash()
  const [deletePainType] = useMutation(DELETE_PAIN_TYPE_MUTATION, {
    onCompleted: () => {
      navigate(routes.painTypes())
      addMessage('PainType deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete painType ' + id + '?')) {
      deletePainType({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PainType {painType.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{painType.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{painType.title}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPainType({ id: painType.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(painType.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default PainType
