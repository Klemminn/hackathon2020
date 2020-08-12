import React from 'react'
import { Link } from 'react-router-dom'
import { Button as BootstrapButton } from 'reactstrap'

import { Spinner } from 'components'

type ButtonProps = {
  children: any,
  className?: string,
  loading?: boolean,
  disabled?: boolean,
  link?: string,
  [rest:string]: any
}

const Button = ({ children, className, loading, disabled, link, ...rest }: ButtonProps) => {
  const classes = ['button-component']
  if (className) {
    classes.push(className)
  }

  return (
    <BootstrapButton
      className={classes.join(' ')}
      disabled={disabled || loading}
      tag={link ? Link : undefined}
      to={link || undefined}
      {...rest}
    >
      {loading && (
        <Spinner size={1} />
      )}
      {children}
    </BootstrapButton>
  )
}

export default Button
