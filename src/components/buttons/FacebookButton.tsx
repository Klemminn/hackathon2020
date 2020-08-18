import React from 'react'
import { FaFacebook } from 'react-icons/fa'

import { IconButton } from 'components'

import './FacebookButton.scss'

type FacebookButtonProps = {
  onClick(): void,
  text: string
}

const FacebookButton = ({ onClick, text }: FacebookButtonProps) => (
  <IconButton
    className='facebook-button-component'
    onClick={onClick}
    text={text}
    icon={FaFacebook}
  />
)

export default FacebookButton
