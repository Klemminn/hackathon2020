import { createStateLink } from '@hookstate/core'

import { Participant } from 'types'

const defaultParticipant = {
  name: '',
  email: '',
  co2Offset: 0
}

export const ParticipantState = createStateLink(defaultParticipant)

export const setParticipant = (participant?: Participant) => {
  ParticipantState.set(participant || defaultParticipant)
}
