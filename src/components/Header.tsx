import React from 'react'
import { Navbar, NavbarBrand, Container, NavItem } from 'reactstrap'

import { UserHeaderStatus } from 'components'

import './Header.scss'

const Header = () => {
  return (
    <Container className='header-component'>
      <Navbar>
        <NavbarBrand>
          <img alt='Our logo' src='/assets/logo-200x200.png' />
        </NavbarBrand>
        <NavItem>
          <UserHeaderStatus />
        </NavItem>
      </Navbar>
    </Container>
  )
}

export default Header
