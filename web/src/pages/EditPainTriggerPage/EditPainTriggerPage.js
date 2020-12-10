import PainTriggersLayout from 'src/layouts/PainTriggersLayout'
import EditPainTriggerCell from 'src/components/EditPainTriggerCell'

const EditPainTriggerPage = ({ id }) => {
  return (
    <PainTriggersLayout>
      <EditPainTriggerCell id={id} />
    </PainTriggersLayout>
  )
}

export default EditPainTriggerPage
