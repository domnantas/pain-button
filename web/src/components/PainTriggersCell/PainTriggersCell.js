import { Link, routes } from '@redwoodjs/router'

import PainTriggers from 'src/components/PainTriggers'

export const QUERY = gql`
  query PAIN_TRIGGERS {
    painTriggers {
      id
      painTypeId
      triggeredAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No painTriggers yet. '}
      <Link to={routes.newPainTrigger()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ painTriggers }) => {
  return <PainTriggers painTriggers={painTriggers} />
}
