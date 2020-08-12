import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'
import { FaCloudSun } from 'react-icons/fa'

import './Header.scss'

type HeaderProps = {
  toggleTheme?(): void
}

const Header = ({ toggleTheme }: HeaderProps) => (
  <Navbar className='header-component'>
    <NavbarBrand>
      Look at Iceland!
      {toggleTheme && (
        <FaCloudSun onClick={toggleTheme} />
      )}
    </NavbarBrand>
  </Navbar>
)

export default Header
