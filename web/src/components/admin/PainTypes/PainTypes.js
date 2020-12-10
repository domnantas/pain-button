import { Link, routes } from '@redwoodjs/router'

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const PainTypesList = ({ painTypes }) => {
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
