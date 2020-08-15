import React from 'react'
import { FaFacebook } from 'react-icons/fa'

import { IconButton } from 'components'

import './FacebookLoginButton.scss'

type FacebookLoginButtonProps = {
  onClick(): void
}

const FacebookLoginButton = ({ onClick }: FacebookLoginButtonProps) => (
  <IconButton
    className='facebook-login-button-component'
    onClick={onClick}
    text='Innskrá með Facebook'
    icon={FaFacebook}
  />
)

export default FacebookLoginButton
