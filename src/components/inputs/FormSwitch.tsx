import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import ReactSwitch from 'react-switch'

import { Label } from 'reactstrap'

type FormSwitchProps = {
  label: string,
  name: string,
  defaultValue: boolean,
  onChange(arg0: any): void,
  [rest:string]: any
}

const FormSwitch = ({ label, name, defaultValue = false, onChange, ...rest }: FormSwitchProps) => {
  const [checked, setChecked] = useState(defaultValue)
  const { register, errors } = useFormContext()
  const hasError = errors && errors[name]

  useEffect(() => {
    setChecked(defaultValue)
  }, [defaultValue])

  const toggleChange = (value: any) => {
    setChecked(value)
    onChange && onChange(value)
  }

  return (
    <div className='input-component switch-component'>
      {label && <Label>{label}</Label>}
      <div>
        <ReactSwitch
          onChange={(e) => toggleChange(e)}
          checked={checked}
          {...rest}
        />
        <input
          className='d-none'
          name={name}
          ref={register}
          type='checkbox'
          checked={checked}
          readOnly
          {...rest}
        />
      </div>
      {hasError && (
        <div className='error'>{errors[name]?.message}</div>
      )}
    </div>
  )
}

export default FormSwitch
