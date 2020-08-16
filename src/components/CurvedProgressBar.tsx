import React from 'react'
import { ProgressBar } from 'components'

type ProgressBarProps = {
  [rest:string]: any
}

const CurvedProgressBar = ({ ...rest }: ProgressBarProps) => {
  const fillColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--progress-bar-fill')

  const trailColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--progress-bar-trail')

  return (
    <ProgressBar.SemiCircle
      options={{
        strokeWidth: 4,
        color: fillColor,
        trailColor: trailColor,
        duration: 1500
      }}
      initialAnimate={true}
      {...rest}
    />
  )
}

export default CurvedProgressBar
