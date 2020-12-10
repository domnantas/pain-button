import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/PainTypesCell'

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
            <tr>
              <th>Triggers</th>
              <td>{jsonDisplay(painType.triggers)}</td>
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
      </nav>
    </>
  )
}

export default PainType
