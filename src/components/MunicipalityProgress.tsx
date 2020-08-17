import React from 'react'

import { Progress } from 'reactstrap'
import { Municipality } from 'types'
import { FormatUtils } from 'utils'

import './MunicipalityProgress.scss'

type MunicipalityProgressProps = {
  municipality: Municipality,
  totalPopulation: number,
  totalCo2: number,
  [rest:string]: any
}

const MunicipalityProgress = ({ municipality, totalPopulation, totalCo2, ...rest }: MunicipalityProgressProps) => {
  const co2PerPerson = totalCo2 / totalPopulation
  const progress = (100 * municipality.co2Offset / (co2PerPerson * municipality.population))
  const progressString = `${FormatUtils.round(progress, 1)}%`

  return (
    <div className='municipality-progress-component'>
      <div className='name'>{municipality.name}</div>
      <Progress multi>
        <Progress className='offset' bar value={progress}>{progress >= 50 ? progressString : ''}</Progress>
        <Progress className='remaining' bar value={100 - progress}>{progress < 50 ? progressString : ''}</Progress>
      </Progress>
    </div>
  )
}

export default MunicipalityProgress
