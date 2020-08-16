import React, { useState, useEffect } from 'react'
import { CurvedProgressBar, LineProgressBar, Co2Counter, LeaderboardModal } from 'components'
import { Co2EmissionService, PurchaseService, MunicipalityService } from 'services'
import { Municipality } from 'types'

import './Home.scss'
import MunicipalityProgress from 'components/MunicipalityProgress'

const Home = () => {
  const [openModal, setOpenModal] = useState('')
  const [totalOffset, setTotalOffset] = useState(0)
  const [totalCo2, setTotalCo2] = useState(0)
  const [totalPopulation, setTotalPopulation] = useState(0)
  const [progress, setProgress] = useState(0)
  const [municipalities, setMunicipalities]: [Municipality[], any] = useState([])

  useEffect(() => {
    getProgress()
    getMunicipalities()
    getTotalPopulation()
    getTotalCo2()
    // eslint-disable-next-line
  }, [])

  const getProgress = async () => {
    const offset = await PurchaseService.getTotalOffset()
    const co2Total = await Co2EmissionService.getTotalCo2()
    let status = offset / co2Total
    setTotalOffset(offset)
    if (status > 1) {
      status = 1
    }
    setProgress(status)
  }

  const getTotalPopulation = async () => {
    const population = await MunicipalityService.getTotalPopulation()
    setTotalPopulation(population)
  }

  const getTotalCo2 = async () => {
    const co2 = await Co2EmissionService.getTotalCo2()
    setTotalCo2(co2)
  }

  const getMunicipalities = async () => {
    try {
      const response = await MunicipalityService.getMunicipalities()
      response.sort((a: Municipality, b: Municipality) => (b.co2Offset / a.population) - (a.co2Offset / b.population))
      setMunicipalities(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='home-page'>
      <section className='intro_section'>
        <div className='counter_and_logo_outer_container'>
          <div className='counter_and_logo_container'>
            <Co2Counter className='co2counter' totalOffset={totalOffset} />
            <img className='logo' alt='Our logo' src='/assets/logo-200x200.png' />
          </div>
          <CurvedProgressBar
            progress={progress}
          />
        </div>
        <div className='municipalities-progress'>
          {municipalities.map((m, idx) => (
            idx >= 5 ? null : (
              <MunicipalityProgress
                key={m.id}
                municipality={m}
                totalPopulation={totalPopulation}
                totalCo2={totalCo2}
              />
            )
          ))}
        </div>
      </section>
      {/* <Button onClick={() => setOpenModal('leaderboard')}>
        Sjá stigatöflu
      </Button> */}
      <LeaderboardModal
        isOpen={openModal === 'leaderboard'}
        toggle={() => setOpenModal('')}
      />
    </div>
  )
}

export default Home
// Photo by Jon Flobrant on Unsplash
