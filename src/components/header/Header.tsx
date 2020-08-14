import React from 'react'
import { Navbar, Container, NavItem } from 'reactstrap'

import { Button, ParticipantHeaderStatus } from 'components'

import './Header.scss'

const Header = () => {
  return (
    <Container className='header-component'>
      <Navbar>
        <NavItem>
          <Button link='/leaderboard'>
            Sjá stigatöflu
          </Button>
        </NavItem>
        <NavItem>
          <ParticipantHeaderStatus />
        </NavItem>
      </Navbar>
    </Container>
  )
}

export default Header
