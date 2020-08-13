import React from 'react'

import { Spinner } from 'components'

import './Loading.scss'

type LoadingProps = {
  size?: number
}

const Loading = ({ size = 2 }: LoadingProps) => {
  return (
    <div className='loading-component' style={{ marginTop: `${size / 2}em` }}>
      <Spinner size={size} />
    </div>
  )
}

export default Loading
