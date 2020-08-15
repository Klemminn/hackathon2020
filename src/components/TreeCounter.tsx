import React from 'react'

import { FormatUtils } from 'utils'

type TreeCounterProps = {
  totalTreesPlanted: number,
  [rest: string]: any
}

const TreeCounter = ({ totalTreesPlanted, ...rest }: TreeCounterProps) => {
  var readableString = FormatUtils.thousandSeparator(totalTreesPlanted)

  return (
    <div {...rest}>
      <p>{readableString}</p>
      <p> tré gróðursett</p>
    </div>
  )
}

export default TreeCounter
