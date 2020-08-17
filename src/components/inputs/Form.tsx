import React from 'react'
import useForm, { FormContext } from 'react-hook-form'

type FormProps = {
  children: any,
  name: string,
  validationSchema: any,
  [rest:string]: any
}

const Form = ({ children, name, onSubmit, validationSchema, ...rest }: FormProps) => {
  const methods = useForm({
    validationSchema
  })
  return (
    <FormContext {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        name={name}
        key={name}
        {...rest}
      >
        {children}
        <input className='d-none' id={`${name}SubmitButton`} type='submit' />
      </form>
    </FormContext>
  )
}

export default Form
