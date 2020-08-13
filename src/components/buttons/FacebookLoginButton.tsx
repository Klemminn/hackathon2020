import React from 'react'

import { Button } from 'components'

import './FacebookLoginButton.scss'

type FacebookLoginButtonProps = {
  onClick(): void
}

const FacebookLoginButton = ({ onClick }: FacebookLoginButtonProps) => (
  <Button
    className='facebook-login-component'
    onClick={onClick}
  >
    Innskrá með Facebook
  </Button>
)

export default FacebookLoginButton
