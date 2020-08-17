import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Label } from 'reactstrap'
import { useFormContext } from 'react-hook-form'

type FormSearchableSelectProps = {
  defaultValue?: any,
  label: string,
  name: string,
  onChange?(value: any): void,
  [rest:string]: any
}

const FormSearchableSelect = ({ defaultValue, label, name, onChange, ...rest }: FormSearchableSelectProps) => {
  const [value, setValue] = useState(defaultValue)
  const [selectedOption, setSelectedOption] = useState()
  const { register, errors } = useFormContext()
  const hasError = errors && errors[name]

  useEffect(() => {
    handleChange(defaultValue)
    // eslint-disable-next-line
  }, [defaultValue])

  const handleChange = (value: any) => {
    let parsedValue
    if (Array.isArray(value)) {
      parsedValue = value.map((v) => v.value).join(';;;')
    } else {
      parsedValue = value ? value.value : ''
    }
    setValue(parsedValue)
    setSelectedOption(value)
    onChange && onChange(parsedValue)
  }

  return (
    <div className='searchable-select input-component'>
      {label && <Label>{label}</Label>}
      <Select
        onChange={handleChange}
        value={selectedOption}
        {...rest}
      />
      <input
        className='d-none'
        name={name}
        ref={register}
        value={value || ''}
        readOnly
      />
      {hasError && (
        <div className='error'>{errors[name]?.message}</div>
      )}
    </div>
  )
}

export default FormSearchableSelect
