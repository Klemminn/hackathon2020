import React, { useState } from 'react'
import { Button, CurvedProgressBar, TreeCounter, LeaderboardModal } from 'components'
import { Co2EmissionService } from 'services'

import './Home.scss'

const Home = () => {
  const [openModal, setOpenModal] = useState('')
  return (
    <div className='home-page'>
      <section className='intro_section'>
        <div className='counter_and_logo_outer_container'>
          <div className='counter_and_logo_container'>
            <TreeCounter className='treecounter' totalTreesPlanted={5555} />
            <img className='logo' alt='Our logo' src='/assets/logo-200x200.png' />
          </div>
          <CurvedProgressBar
            emissionData={Co2EmissionService.getCo2EmissionData()}
            totalTreesPlanted={5555}
          />
        </div>
      </section>
      <Button onClick={() => setOpenModal('leaderboard')}>
        Sjá stigatöflu
      </Button>
      <LeaderboardModal
        isOpen={openModal === 'leaderboard'}
        toggle={() => setOpenModal('')}
      />
    </div>
  )
}

export default Home
// Photo by Jon Flobrant on Unsplash
