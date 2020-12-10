import PainTypesLayout from 'src/layouts/PainTypesLayout'
import PainTypeCell from 'src/components/admin/PainTypeCell'

const PainTypePage = ({ id }) => {
  return (
    <PainTypesLayout>
      <PainTypeCell id={id} />
    </PainTypesLayout>
  )
}

export default PainTypePage
