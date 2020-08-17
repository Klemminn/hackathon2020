import React from 'react'

import { OffsetAgent } from 'types'

type OffsetAgentSelectorProps = {
  offsetAgents: OffsetAgent[],
  onSelect(id: number): void,
  [rest:string]: any
}

const OffsetAgentSelector = ({ offsetAgents, onSelect, ...rest }: OffsetAgentSelectorProps) => {
  return null
}

export default OffsetAgentSelector
