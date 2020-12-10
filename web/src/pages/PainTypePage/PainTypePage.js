import PainTypesLayout from 'src/layouts/PainTypesLayout'
import PainTypeCell from 'src/components/PainTypeCell'

const PainTypePage = ({ id }) => {
  return (
    <PainTypesLayout>
      <PainTypeCell id={id} />
    </PainTypesLayout>
  )
}

export default PainTypePage
