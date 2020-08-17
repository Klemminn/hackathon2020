import { createStateLink } from '@hookstate/core'

import { ParticipantService } from 'services'
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

export const updateCo2 = async () => {
  const current = ParticipantState.get()
  const { co2Offset } = await ParticipantService.getParticipant(current)
  ParticipantState.set({ ...current, co2Offset })
}
