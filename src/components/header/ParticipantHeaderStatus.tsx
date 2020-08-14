/* global FB */
import React, { useEffect, useState } from 'react'

import { Loading, FacebookLoginButton, ParticipantDropdown } from 'components'
import { ParticipantService, MunicipalityService } from 'services'
import { Participant } from 'types'

const UserHeaderStatus = () => {
  const [loading, setLoading] = useState(false)
  const [participant, setParticipant]: [Participant, any] = useState(null)

  const checkFacebookStatus = () => {
    setLoading(true)
    if (typeof FB !== 'undefined') {
      FB.getLoginStatus((response: any) => {
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

  const facebookLogout = () => {
    FB.logout(() => {
      setParticipant(null)
      setLoading(false)
    })
  }

  const facebookLogin = () => {
    FB.login(() => {
      getFacebookInfo()
    }, { scope: 'public_profile,email' })
  }

  const getFacebookInfo = () => {
    FB.api('/me', { fields: 'name, email' }, async (response: any) => {
      console.log(response)
      try {
        if (!response.error) {
          const currentParticipant = await ParticipantService.getParticipant(response)
          setParticipant(currentParticipant)
        }
      } finally {
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    checkFacebookStatus()
    MunicipalityService.getMunicipalities()
  // eslint-disable-next-line
  }, [])

  const UserState = () => {
    if (loading) {
      return <Loading />
    } else if (!participant) {
      return <FacebookLoginButton onClick={facebookLogin} />
    }
    return <ParticipantDropdown
      participant={participant}
      logout={facebookLogout}
    />
  }

  return <UserState />
}

export default UserHeaderStatus
