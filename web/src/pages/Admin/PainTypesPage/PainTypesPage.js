import PainTypesLayout from 'src/layouts/PainTypesLayout'
import PainTypesCell from 'src/components/admin/PainTypesCell'
import PainTriggersCell from 'src/components/admin/PainTriggersCell'

const PainTypesPage = () => {
  return (
    <PainTypesLayout>
      <PainTypesCell />
      <PainTriggersCell />
    </PainTypesLayout>
  )
}

export default PainTypesPage
