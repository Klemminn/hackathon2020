import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { FaLeaf } from 'react-icons/fa'

import { IconButton } from 'components'
import { FormatUtils } from 'utils'
import { Participant } from 'types'

type ParticipantDropdownProps = {
  participant?: Participant,
  logout(): void,
  myPurchases() : void
}

const ParticipantDropdown = ({ participant, logout, myPurchases }: ParticipantDropdownProps) => (
  <>
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav>
        <IconButton
          text={FormatUtils.getFirstName( participant ? participant.name : "")}
          subtext = {(participant?.title || "") + "\n" +  FormatUtils.thousandSeparator((participant?.co2Offset || 0) * 10) +  " tré"}
          icon={FaLeaf}
        />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={myPurchases}>
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
