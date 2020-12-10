import PainTypesLayout from 'src/layouts/PainTypesLayout'
import EditPainTypeCell from 'src/components/admin/EditPainTypeCell'

const EditPainTypePage = ({ id }) => {
  return (
    <PainTypesLayout>
      <EditPainTypeCell id={id} />
    </PainTypesLayout>
  )
}

export default EditPainTypePage
