import React from 'react'

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap'
import { User } from 'types'

type UserDropdownProps = {
  user?: User,
  logout(): void
}

const UserDropdown = ({ user, logout }: UserDropdownProps) => (
  <UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav caret>
      {`${user?.name} - ${user?.trees} trjám plantað`}
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem>
        Stillingar
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem onClick={logout}>
        Útskrá
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
)

export default UserDropdown
