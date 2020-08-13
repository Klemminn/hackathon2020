import React, { useEffect } from 'react'
import { Navbar, NavbarBrand, Container, NavItem } from 'reactstrap'

import { FacebookLoginButton } from 'components'

import './Header.scss'

const Header = () => {
  const checkFacebookStatus = () => {
    FB.getLoginStatus((response: any) => {
      if (response.status === 'unknown') {
        FB.login()
      }
      console.log(response)
    })
  }

  useEffect(() => {
    checkFacebookStatus()
  // eslint-disable-next-line
  }, [])

  return (
    <Container className='header-component'>
      <Navbar>
        <NavbarBrand>
          <img alt='Our logo' src='/assets/logo-200x200.png' />
        </NavbarBrand>
        <NavItem>
          <FacebookLoginButton />
        </NavItem>
      </Navbar>
    </Container>
  )
}

export default Header
