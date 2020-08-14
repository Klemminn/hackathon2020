import React from 'react'

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap'
import { Participant } from 'types'

type ParticipantDropdownProps = {
  participant?: Participant,
  logout(): void
}

const ParticipantDropdown = ({ participant, logout }: ParticipantDropdownProps) => (
  <UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav caret>
      {`${participant?.name} - ${participant?.trees} trjám plantað`}
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

export default ParticipantDropdown
