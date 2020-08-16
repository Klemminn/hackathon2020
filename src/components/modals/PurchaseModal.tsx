import React, { useState, useEffect } from 'react'

import { Modal } from 'components'

import './PurchaseModal.scss'

type PurchaseModalProps = {
  [rest:string]: any
}

const PurchaseModal = ({ ...rest }: PurchaseModalProps) => {

  return (
    <Modal
      className='leaderboard-modal-component'
      size='xl'
      {...rest}
    >
    </Modal>
  )
}

export default PurchaseModal
