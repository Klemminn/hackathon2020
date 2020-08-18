import React from 'react'

import { Modal, MunicipalityProgress } from 'components'
import { Municipality } from 'types'

import './MunicipalitiesModal.scss'

type MunicipalitiesModalProps = {
  municipalities: Municipality[],
  totalPopulation: number,
  totalCo2: number,
  [rest:string]: any
}

const MunicipalitiesModal = ({ municipalities, totalPopulation, totalCo2, ...rest }: MunicipalitiesModalProps) => {


  return (
    <Modal
      className='municipalities-modal-component'
      size='xl'
      header='Staða sveitarfélaga'
      {...rest}
    >
      <div className="municipalities-progress">
        {municipalities.map((m, idx) => (
          <MunicipalityProgress
            key={m.id}
            municipality={m}
            totalPopulation={totalPopulation}
            totalCo2={totalCo2}
            rank={idx + 1}
          />
        ))}
      </div>
    </Modal>
  )
}

export default MunicipalitiesModal
