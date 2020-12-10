import PainTriggersLayout from 'src/layouts/PainTriggersLayout'
import PainTriggerCell from 'src/components/PainTriggerCell'

const PainTriggerPage = ({ id }) => {
  return (
    <PainTriggersLayout>
      <PainTriggerCell id={id} />
    </PainTriggersLayout>
  )
}

export default PainTriggerPage
