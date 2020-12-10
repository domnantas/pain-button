import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const PainTriggerForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.painTrigger?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="painTypeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pain type id
        </Label>
        <NumberField
          name="painTypeId"
          defaultValue={props.painTrigger?.painTypeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="painTypeId" className="rw-field-error" />

        <Label
          name="triggeredAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Triggered at
        </Label>
        <TextField
          name="triggeredAt"
          defaultValue={props.painTrigger?.triggeredAt}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="triggeredAt" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PainTriggerForm
