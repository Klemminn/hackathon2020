/* global FB */
import React, { useEffect, useState } from 'react'
import { useStateLink } from '@hookstate/core'

import { FacebookLoginButton, ParticipantDropdown, MyPurchasesModal } from 'components'
import { ParticipantService, MunicipalityService, Co2EmissionService } from 'services'
import { Participant, Municipality,} from 'types'
import { ParticipantState, setParticipant } from 'states'

const UserHeaderStatus = () => {
  const [loading, setLoading] = useState(false)
  const participant: Participant = useStateLink(ParticipantState).get()
  const [openModal, setOpenModal] = useState("");

  const [totalCo2, setTotalCo2] = useState(0);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [municipalities, setMunicipalities]: [Municipality[], any] = useState(
    []
  );

  useEffect(() => {
    getMunicipalities();
    getTotalPopulation();
    getTotalCo2();
    // eslint-disable-next-line
  }, []);

  const getMunicipalities = async () => {
    try {
      const response = await MunicipalityService.getMunicipalities().catch(
        error => console.log(error)
      );
      response.sort(
        (a: Municipality, b: Municipality) =>
          b.co2Offset / a.population - a.co2Offset / b.population
      );
      setMunicipalities(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getTotalPopulation = async () => {
    const population = await MunicipalityService.getTotalPopulation().catch(
      error => console.log(error)
    );
    setTotalPopulation(population);
  };

  const getTotalCo2 = async () => {
    const co2 = await Co2EmissionService.getTotalCo2().catch(error =>
      console.log(error)
    );
    setTotalCo2(co2);
  };


  const checkFacebookStatus = () => {
    setLoading(true)
    if (typeof FB !== 'undefined') {
      FB.getLoginStatus((response: any) => {
        console.log('FB get login status response', response)
        if (response.status === 'connected') {
          getFacebookInfo()
        } else {
          setLoading(false)
        }
      })
    } else {
      setTimeout(() => {
        checkFacebookStatus()
      }, 300)
    }
  }
  const openPurchasesModal = () => {
    setOpenModal('my-purchases');
  }
  const facebookLogout = () => {
    FB.logout(() => {
      setParticipant()
    })
  }

  const facebookLogin = () => {
    FB.login(() => {
      getFacebookInfo()
    }, { scope: 'public_profile,email' })
  }

  const getFacebookInfo = () => {
    FB.api('/me', { fields: 'name, email' }, async (response: any) => {
      console.log('FB /me response', response)
      try {
        if (!response.error) {
          const currentParticipant = await ParticipantService.getParticipant(response)
          setParticipant({ ...response, ...currentParticipant })
        }
      } finally {
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    checkFacebookStatus()
    // eslint-disable-next-line
  }, [])

  const UserState = () => {
    if (loading) {
      return null
    } else if (!participant ?.name) {
      return <FacebookLoginButton onClick={facebookLogin} />
    }
    return (
    <div>
      <ParticipantDropdown
      participant={participant}
      logout={facebookLogout}
      myPurchases={openPurchasesModal}
      />
      <MyPurchasesModal
        isOpen={openModal === "my-purchases"}
        toggle={() => setOpenModal("")}
        emissionPerPerson={totalCo2 / totalPopulation}
        municipalities={municipalities}
      />
      </div>
    )
  }

  return <UserState />
}

export default UserHeaderStatus
