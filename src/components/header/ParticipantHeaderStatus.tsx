/* global FB */
import React, { useEffect, useState } from 'react'
import { useStateLink } from '@hookstate/core'

import { FacebookLoginButton, ParticipantDropdown } from 'components'
import { ParticipantService } from 'services'
import { Participant } from 'types'
import { ParticipantState, setParticipant } from 'states'

const UserHeaderStatus = () => {
  const [loading, setLoading] = useState(false)
  const participant: Participant = useStateLink(ParticipantState).get()

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
    } else if (!participant?.name) {
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
