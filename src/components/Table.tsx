import React from 'react'
import { Table as BootstrapTable } from 'reactstrap'

import { Loading } from 'components'

import { TableHeader, TableRow } from 'types'

type TableProps = {
  headers: TableHeader[],
  rows: TableRow[],
  loading: boolean,
  [rest: string]: any;
}

const Table = ({ headers, rows, loading, ...rest }: TableProps) => (
  <BootstrapTable {...rest}>
    {loading ? <Loading /> : (
      <>
        <thead>
          <tr>
            <th />
            {headers.map((header) => (
              <th key={header.code}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              {headers.map((header) => (
                <td key={header.code}>
                  {row[header.code]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </>
    )}
  </BootstrapTable>
)

export default Table
