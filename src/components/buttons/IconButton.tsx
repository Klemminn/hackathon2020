import React from 'react'

import { Button } from 'components'

type IconButtonProps = {
  icon: any,
  text: string,
  subtext?:string,
  [rest:string]: any
}

const IconButton = ({ icon, text, subtext, ...rest }: IconButtonProps) => {
  const Icon = icon
  return (
    <Button {...rest}>
      <Icon className={`${text ? 'mr-1' : ''}`} /> {text} {subtext ? "\n" + subtext : ""}
    </Button>
  )
}

export default IconButton
