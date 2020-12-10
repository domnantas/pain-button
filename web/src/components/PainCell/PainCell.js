import { useMutation } from '@redwoodjs/web'
import PainButton from 'src/components/PainButton/PainButton'
import Words from 'src/components/Words'
import Flashbang from 'src/components/Flashbang'
import styles from './PainCell.module.css'
import { useRef } from 'react'
import styled from 'styled-components'

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

const TitleText = styled.h2`
  font-size: 32px;
  letter-spacing: 4px;

  @media (min-width: 900px) {
    font-size: 48px;
  }
`

export const Loading = () => <TitleText>Loading...</TitleText>

export const Empty = () => <TitleText>Empty</TitleText>

export const Failure = ({ error }) => (
  <TitleText>Error: {error.message}</TitleText>
)

export const Success = ({ painTypes }) => {
  const [createPainTrigger] = useMutation(CREATE_PAIN_TRIGGER_MUTATION)
  const [hovered, setHovered] = React.useState(true)
  const flashbangRef = useRef(null)

  return (
    <>
      <Flashbang ref={flashbangRef} />
      {hovered && <Words>Pain</Words>}
      {painTypes.map((painType) => (
        <div className={styles['pain-cell']} key={painType.id}>
          <TitleText>{painType.title}</TitleText>
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
