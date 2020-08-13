import React from 'react'
import { FaSpinner } from 'react-icons/fa'

import './Spinner.scss'

type SpinnerProps = {
  size?: number
}

const Spinner = ({ size = 2 }: SpinnerProps) => {
  return (
    <div className='spinner-component'>
      <FaSpinner className='icon-spin' size={`${size}em`} />
    </div>
  )
}

export default Spinner
