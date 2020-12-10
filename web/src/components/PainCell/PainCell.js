import { useMutation } from '@redwoodjs/web'
import PainButton from 'src/components/PainButton/PainButton'
import Words from 'src/components/Words'
import Flashbang from 'src/components/Flashbang'
import styles from './PainCell.module.css'
import { useRef } from 'react'

export const QUERY = gql`
  query PAIN_TYPES {
    painTypes {
      id
      title
    }
  }
`

const CREATE_PAIN_TRIGGER_MUTATION = gql`
  mutation CreatePainTriggerMutation($input: CreatePainTriggerInput!) {
    createPainTrigger(input: $input) {
      id
    }
  }
`

export const Loading = () => <h2>Loading...</h2>

export const Empty = () => <h2>Empty</h2>

export const Failure = ({ error }) => <h2>Error: {error.message}</h2>

export const Success = ({ painTypes }) => {
  const [createPainTrigger] = useMutation(CREATE_PAIN_TRIGGER_MUTATION)
  const [hovered, setHovered] = React.useState(false)
  const flashbangRef = useRef(null)

  return (
    <>
      <Flashbang ref={flashbangRef} />
      {hovered && <Words>Pain</Words>}
      {painTypes.map((painType) => (
        <div className={styles['pain-cell']} key={painType.id}>
          <h2>{painType.title}</h2>
          <PainButton
            onClick={() => {
              flashbangRef.current.flash()
              createPainTrigger({
                variables: { input: { painTypeId: painType.id } },
              })
            }}
            onMouseEnter={() => {
              setHovered(true)
            }}
            onMouseLeave={() => {
              setHovered(false)
            }}
          />
        </div>
      ))}
    </>
  )
}
