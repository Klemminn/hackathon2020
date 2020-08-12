import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'

import './Header.scss'

const Header = () => (
  <Navbar className='header-component'>
    <NavbarBrand>
      Jöfnum okkur!
    </NavbarBrand>
  </Navbar>
)

export default Header
