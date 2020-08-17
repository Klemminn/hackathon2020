import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Label } from 'reactstrap'

import './Inputs.scss'

type FormSelectProps = {
  skipBlank: boolean,
  label: string,
  name: string,
  options: any,
  onChange(arg0: any): void,
  [rest:string]: any
}

const FormSelect = ({ skipBlank, label, name, options = [], onChange, ...rest }: FormSelectProps) => {
  const { register, errors } = useFormContext()
  const hasError = errors && errors[name]

  return (
    <div className='input-component'>
      {label && <Label>{label}</Label>}
      <select
        name={name}
        className='form-control'
        ref={register}
        onChange={(e) => onChange && onChange(e.target.value)}
        {...rest}
      >
        {!skipBlank && <option />}
        {options.map((option: any, index: number) => (
          <option
            key={index}
            disabled={option.disabled}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <div className='error'>{errors[name]?.message}</div>
      )}
    </div>
  )
}

export default FormSelect
