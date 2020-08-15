import React from 'react'

import { Button } from 'components'

type IconButtonProps = {
  icon: any,
  text: string,
  [rest:string]: any
}

const IconButton = ({ icon, text, ...rest }: IconButtonProps) => {
  const Icon = icon
  return (
    <Button {...rest}>
      <Icon className={`${text ? 'mr-1' : ''}`} /> {text}
    </Button>
  )
}

export default IconButton
