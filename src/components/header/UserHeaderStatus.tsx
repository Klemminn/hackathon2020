/* global FB */
import React, { useEffect, useState } from 'react'

import { Loading, FacebookLoginButton, UserDropdown } from 'components'
import { User } from 'types'

const UserHeaderStatus = () => {
  const [status, setStatus] = useState('')
  const [user, setUser]: [User, any] = useState(null)

  const checkFacebookStatus = () => {
    setStatus('loading')
    if (typeof FB !== 'undefined') {
      FB.getLoginStatus((response: any) => {
        console.log(response)
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
      console.log(response)
      setUser(null)
      setStatus('')
    })
  }

  const facebookLogin = () => {
    FB.login((response) => {
      getFacebookInfo()
    }, { scope: 'public_profile,email' })
  }

  const getFacebookInfo = () => {
    FB.api('/me', { fields: 'name, email' }, (user) => {
      console.log(user)
      // todo: get from our own database the points for the given email
      setUser(user)
      setStatus('connected')
    })
  }

  useEffect(() => {
    checkFacebookStatus()
  // eslint-disable-next-line
  }, [])

  const UserState = () => {
    if (status === 'loading') {
      return <Loading />
    } else if (!user) {
      return <FacebookLoginButton onClick={facebookLogin} />
    }
    return <UserDropdown
      user={user}
      logout={facebookLogout}
    />
  }

  return <UserState />
}

export default UserHeaderStatus
