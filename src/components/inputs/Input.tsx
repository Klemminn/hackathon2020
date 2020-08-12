import React from 'react'
import { Input as BootstrapInput } from 'reactstrap'

type InputProps = {
  className?: string,
  onChange?(arg0: any): void,
  timeout?: number,
  [rest:string]: any
}

let oldValue: any
const Input = ({ className, onChange, timeout, ...rest }: InputProps) => {
  const classes = ['input-component']
  if (className) {
    classes.push(className)
  }
  return (
    <BootstrapInput
      className={classes.join(' ')}
      onChange={(event) => {
        if (onChange) {
          const { value } = event.target
          if (timeout) {
            oldValue = value
            setTimeout(() => {
              if (oldValue === value) {
                onChange(value)
              }
            }, timeout)
          } else {
            onChange(value)
          }
        }
      }}
      {...rest}
    />
  )
}

export default Input
