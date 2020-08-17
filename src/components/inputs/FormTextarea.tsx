import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Label } from 'reactstrap'

import './Inputs.scss'

type FormTextareaProps = {
  label: string,
  name: string,
  rows?: number,
  [rest:string]: any
}

const FormTextarea = ({ label, name, rows = 5, ...rest }: FormTextareaProps) => {
  const { register, errors } = useFormContext()
  const hasError = errors && errors[name]
  return (
    <div className='input-component'>
      {label && <Label>{label}</Label>}
      <textarea
        className='form-control'
        ref={register}
        rows={rows}
        name={name}
        {...rest}
      />
      {hasError && (
        <div className='error'>{errors[name]?.message}</div>
      )}
    </div>
  )
}

export default FormTextarea
