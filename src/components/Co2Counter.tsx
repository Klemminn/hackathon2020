import React from 'react'

import { FormatUtils } from 'utils'

type Co2CounterProps = {
  totalOffset: number,
  [rest: string]: any
}

const Co2Counter = ({ totalOffset, ...rest }: Co2CounterProps) => (
  <div {...rest}>
    <p>{FormatUtils.thousandSeparator(Math.round(totalOffset * 10) / 10)}</p>
    <p> tonn jöfnuð</p>
  </div>
)

export default Co2Counter
