import React from 'react'
import { Navbar, Container } from 'reactstrap'

import { ParticipantHeaderStatus } from 'components'

import './Header.scss'

const Header = () => {
  return (
    <Container className='header-component'>
      <Navbar>
        <div />
        <ParticipantHeaderStatus />
      </Navbar>
    </Container>
  )
}

export default Header
