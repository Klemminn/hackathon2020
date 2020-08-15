import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import { Button } from 'components'
import { FormatUtils } from 'utils'
import { Participant } from 'types'

type ParticipantDropdownProps = {
  participant?: Participant,
  logout(): void
}

const ParticipantDropdown = ({ participant, logout }: ParticipantDropdownProps) => (
  <>
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav>
        <Button>{`${FormatUtils.getFirstName((participant?.name || ''))} - ${FormatUtils.thousandSeparator(participant?.trees || 0)} ${((participant && participant?.trees % 10 === 1) && (participant && participant?.trees !== 11)) ? 'tré' : 'trjám'} plantað`}</Button>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          Skógurinn minn
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={logout}>
          Útskrá
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </>
)

export default ParticipantDropdown
