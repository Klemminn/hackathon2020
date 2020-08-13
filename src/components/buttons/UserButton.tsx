import React from 'react'

import { Button } from 'components'
import { User } from 'types'

import './FacebookLoginButton.scss'

type UserButtonProps = {
  user?: User
}

const UserButton = ({ user }: UserButtonProps) => (
  <Button
    className='facebook-login-component'
  >
    { user?.name }
  </Button>
)

export default UserButton
