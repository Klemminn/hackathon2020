import React from 'react'
import { FaSpinner } from 'react-icons/fa'

import './Spinner.scss'

const Spinner = ({ size = 4 }) => {
  return (
    <div className='spinner-component'>
      <FaSpinner className='icon-spin' size={`${size}em`} />
    </div>
  )
}

export default Spinner
