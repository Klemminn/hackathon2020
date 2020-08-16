import React, { useState, useEffect } from 'react'

import { Button, Modal, Table } from 'components'
import { TableHeader, TableRow } from 'types'
import { MunicipalityService, ParticipantService } from 'services'

import './LeaderboardModal.scss'

type TableData = {
  headers: TableHeader[],
  rows: TableRow[]
}

type LeaderboardModalProps = {
  [rest:string]: any
}

let municipalityData: any
let participantData: any

const LeaderboardModal = ({ ...rest }: LeaderboardModalProps) => {
  const [loading, setLoading] = useState(false)
  const [isParticipants, setIsParticipants] = useState(true)
  const [tableData, setTabledata]: [TableData, any] = useState({
    headers: [],
    rows: []
  })

  useEffect(() => {
    switchType()
    // eslint-disable-next-line
  }, [])

  const switchType = () => {
    if (isParticipants) {
      getMunicipalities()
    } else {
      getParticipants()
    }
    setIsParticipants(!isParticipants)
  }

  const getMunicipalities = async () => {
    if (!municipalityData) {
      setLoading(true)
      try {
        const response = await MunicipalityService.getMunicipalities()
        municipalityData = response.sort((a: TableRow, b: TableRow) => a.co22Offset - b.co22Offset)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    setTabledata({
      headers: [
        {
          code: 'name',
          label: 'Sveitarfélag'
        },
        {
          code: 'population',
          label: 'Íbúafjöldi'
        },
        {
          code: 'ton',
          label: 'Tonn'
        }
      ],
      rows: municipalityData
    })
  }

  const getParticipants = async () => {
    if (!participantData) {
      setLoading(true)
      try {
        const response = await ParticipantService.getParticipants()
        participantData = response.sort((a: TableRow, b: TableRow) => a.co22Offset - b.co22Offset)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    setTabledata({
      headers: [
        {
          code: 'name',
          label: 'Þátttakandi'
        },
        {
          code: 'ton',
          label: 'Tonn'
        }
      ],
      rows: participantData
    })
  }

  return (
    <Modal
      className='leaderboard-modal-component'
      size='xl'
      {...rest}
    >
      <Button onClick={() => switchType()}>
        {isParticipants ? 'Sjá sveitarfélög' : 'Sjá þátttakendur'}
      </Button>
      <Table
        headers={tableData.headers}
        rows={tableData.rows}
        loading={loading}
        hover
      />
    </Modal>
  )
}

export default LeaderboardModal
