import React from 'react'

import { OffsetAgent } from 'types'

import './OffsetAgentSelector.scss'

type OffsetAgentSelectorProps = {
  offsetAgents: OffsetAgent[],
  onSelect(agent: OffsetAgent): void,
  selected: OffsetAgent,
  [rest:string]: any
}

type TileProps = {
  agent: OffsetAgent
}

const OffsetAgentSelector = ({ offsetAgents, onSelect, selected, ...rest }: OffsetAgentSelectorProps) => {
  const Tile = ({ agent }: TileProps) => (
    <div className={`tile${selected?.id === agent?.id ? ' selected' : ''}`} onClick={() => onSelect(agent)}>
      <img alt='Carbon offset agent' src={`assets/agent${agent.id}.png`} />
      <div className='info'>
        <div className='name'>
          {agent.name}
        </div>
        <div className='item'>
          {agent.itemLabel}
        </div>
      </div>
    </div>
  )
  return (
    <div className='offset-agent-selector-component'>
      {offsetAgents.map((agent: OffsetAgent) => (
        <Tile
          key={agent.id}
          agent={agent}
        />
      ))}
    </div>
  )
}

export default OffsetAgentSelector
