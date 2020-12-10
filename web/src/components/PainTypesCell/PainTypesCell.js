import { Link, routes } from '@redwoodjs/router'

import PainTypes from 'src/components/PainTypes'

export const QUERY = gql`
  query PAIN_TYPES {
    painTypes {
      id
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No painTypes yet. '}
      <Link to={routes.newPainType()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ painTypes }) => {
  return <PainTypes painTypes={painTypes} />
}
