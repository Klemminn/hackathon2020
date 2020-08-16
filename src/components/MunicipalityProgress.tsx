import React from 'react'

import { LineProgressBar } from 'components'
import { Municipality } from 'types'

import './MunicipalityProgress.scss'

type MunicipalityProgressProps = {
  municipality: Municipality,
  totalPopulation: number,
  totalCo2: number,
  [rest:string]: any
}

const MunicipalityProgress = ({ municipality, totalPopulation, totalCo2, ...rest }: MunicipalityProgressProps) => {
  const co2PerPerson = totalCo2 / totalPopulation
  const progress = municipality.co2Offset / (co2PerPerson * municipality.population)

  return (
    <div className='municipality-progress-component'>
      <div className='name'>{municipality.name}</div>
      <LineProgressBar
        progress={progress}
        {...rest}
      />
    </div>
  )
}

export default MunicipalityProgress
