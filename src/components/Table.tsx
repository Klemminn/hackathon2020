import React from 'react'
import { Table as BootstrapTable } from 'reactstrap'

type TableProps = {
  [rest: string]: any;
}

const Table = ({ ...rest }: TableProps) => (
  <BootstrapTable>
    null
  </BootstrapTable>
)

export default Table
