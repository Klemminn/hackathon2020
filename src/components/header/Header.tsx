import React from 'react'
import { Navbar, Container } from 'reactstrap'

import { ParticipantHeaderStatus } from 'components'

import './Header.scss'

const Header = () => {
  return (
    <Container className='header-component'>
      <Navbar>
        <div />
        <img className="logo" alt="Jöfnum okkur" src="/assets/logo-200x200.png" />
        <ParticipantHeaderStatus />
      </Navbar>
    </Container>
  )
}

export default Header
