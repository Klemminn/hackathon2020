import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { FaLeaf } from 'react-icons/fa'

import { IconButton } from 'components'
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
        <IconButton
          text={`${FormatUtils.getFirstName((participant?.name || ''))} - ${FormatUtils.thousandSeparator(participant?.co2Offset || 0)} tonn jöfnuð`}
          icon={FaLeaf}
        />
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
