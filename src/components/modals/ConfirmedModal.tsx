/* global FB */
import React from 'react'

import { Modal, InfoSection, FacebookButton } from 'components'

import './ConfirmedModal.scss'

type ConfirmedModalProps = {
  [rest:string]: any
}

const ConfirmedModal = ({ municipalities, totalPopulation, totalCo2, ...rest }: ConfirmedModalProps) => {
  const shareOnFacebook = () => {
    FB.ui({
      method: 'share',
      href: 'https://jofnumokkur.xyz',
      quote: 'Ég var að kolefnisjafna mig, vilt þú ekki gera það líka?'
    }, (response) => {

    })
  }

  return (
    <Modal
      className='confirmed-modal-component'
      size='xl'
      {...rest}
    >
      <InfoSection
        title="Framlag móttekið!"
        text="Takk fyrir að taka fyrsta skrefið í átt að grænni framtíð.  Næsta skref er að hvetja fjölskyldu, vini, kunningja, vinnufélaga, og jú, bara hvern sem er til að gera slíkt hið sama!"
        imagePath="/assets/seed.png"
      />
      <div className='share-options'>
        <FacebookButton text='Deila á Facebook' onClick={() => shareOnFacebook()} />
      </div>
    </Modal>
  )
}

export default ConfirmedModal
