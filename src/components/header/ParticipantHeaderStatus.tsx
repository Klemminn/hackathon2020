/* global FB */
import React, { useEffect, useState } from 'react'

import { Loading, FacebookLoginButton, ParticipantDropdown } from 'components'
import { ParticipantService, MunicipalityService } from 'services'
import { Participant } from 'types'

const UserHeaderStatus = () => {
  const [status, setStatus] = useState('')
  const [participant, setParticipant]: [Participant, any] = useState(null)

  const checkFacebookStatus = () => {
    setStatus('loading')
    if (typeof FB !== 'undefined') {
      FB.getLoginStatus((response: any) => {
        if (response.status === 'connected') {
          getFacebookInfo()
        } else {
          setStatus(response.status)
        }
      })
    } else {
      setTimeout(() => {
        checkFacebookStatus()
      }, 300)
    }
  }

  const facebookLogout = () => {
    FB.logout((response) => {
      setParticipant(null)
      setStatus('')
    })
  }

  const facebookLogin = () => {
    FB.login((response) => {
      getFacebookInfo()
    }, { scope: 'public_profile,email' })
  }

  const getFacebookInfo = () => {
    FB.api('/me', { fields: 'name, email' }, async (response: any) => {
      console.log(response)
      if (!response.error) {
        const currentParticipant = await ParticipantService.getParticipant(response)
        setParticipant(currentParticipant)
        setStatus('connected')
      }
    })
  }

  useEffect(() => {
    checkFacebookStatus()
    MunicipalityService.getMunicipalities()
  // eslint-disable-next-line
  }, [])

  const UserState = () => {
    if (status === 'loading') {
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
