import React, { useState, useEffect } from 'react'
import { CurvedProgressBar, LineProgressBar, TreeCounter, LeaderboardModal } from 'components'
import { Co2EmissionService, PurchaseService, MunicipalityService } from 'services'
import { Municipality } from 'types'

import './Home.scss'

const Home = () => {
  const [openModal, setOpenModal] = useState('')
  const [plantedTrees, setPlantedTrees] = useState(0)
  const [progress, setProgress] = useState(0)
  const [municipalities, setMunicipalities]: [Municipality[], any] = useState([])

  useEffect(() => {
    getProgress()
    getMunicipalities()
    // eslint-disable-next-line
  }, [])

  const getProgress = async () => {
    const trees = await PurchaseService.getTreesPlanted()
    const co2Total = await Co2EmissionService.getTotalCo2()
    const co2Countered = Co2EmissionService.getCo2TonnesForTreeCount(trees)
    let status = co2Countered / co2Total
    setPlantedTrees(trees)
    if (status > 1) {
      status = 1
    }
    setProgress(status)
  }

  const getMunicipalities = async () => {
    try {
      const response = await MunicipalityService.getMunicipalities()
      response.sort((a: Municipality, b: Municipality) => a.trees - b.trees)
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
            <TreeCounter className='treecounter' totalTreesPlanted={plantedTrees} />
            <img className='logo' alt='Our logo' src='/assets/logo-200x200.png' />
          </div>
          <CurvedProgressBar
            progress={progress}
          />
        </div>
        <div><LineProgressBar progress={1} /></div>
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
