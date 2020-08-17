import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Label } from 'reactstrap'

import './Inputs.scss'

type FormInputProps = {
  name: string,
  label: string,
  onChange?(arg0: any): void,
  [rest:string]: any
}

const FormInput = ({ name, label, onChange, ...rest }: FormInputProps) => {
  const { register, errors } = useFormContext()
  const hasError = errors && errors[name]
  const inputClasses = ['form-control']
  hasError && inputClasses.push('hasError')
  return (
    <div className='input-component'>
      {label && <Label>{label}</Label>}
      <input
        className={inputClasses.join(' ')}
        ref={register}
        name={name}
        onChange={(e) => onChange && onChange(e?.target?.value)}
        {...rest}
      />
      {hasError && (
        <div className='error'>{errors[name]?.message}</div>
      )}
    </div>
  )
}

export default FormInput
