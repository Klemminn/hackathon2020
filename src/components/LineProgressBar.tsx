import React from 'react'
import { ProgressBar } from 'components'

type ProgressBarProps = {
  [rest:string]: any
}

const LineProgressBar = ({ ...rest }: ProgressBarProps) => {
  const fillColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--progress-bar-fill')

  const trailColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--progress-bar-trail')

  return (
    <ProgressBar.Line
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

export default LineProgressBar
