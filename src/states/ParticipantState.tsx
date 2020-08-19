import { createStateLink } from '@hookstate/core'

import { ParticipantService } from 'services'
import { Participant } from 'types'

const defaultParticipant = {
  name: '',
  email: '',
  co2Offset: 0,
  title: ''
}

export const ParticipantState = createStateLink(defaultParticipant)

export const setParticipant = (participant?: Participant) => {
  console.log(participant)
  ParticipantState.set(participant || defaultParticipant)
}

export const updateCo2 = async () => {
  const current = ParticipantState.get()
  const { co2Offset, title } = await ParticipantService.getParticipant(current)
  ParticipantState.set({ ...current, co2Offset, title })
}
