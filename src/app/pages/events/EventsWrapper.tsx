import React, {useEffect} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {useAuth} from '../../modules/auth'
import {getUserByToken} from '../../modules/auth/core/_requests'
import EventsPage from '../../modules/apps/events-management/EventsPage'

function EventsWrapper() {
  const {auth, logout, setCurrentUser} = useAuth()

  const CheckIsAuth = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        const {data} = await getUserByToken(auth?.access_token)

        if (data) {
          setCurrentUser(data)
        } else {
          setCurrentUser(undefined)
          logout()
        }
      }
    } catch (error) {
      setCurrentUser(undefined)
      logout()
    }
  }
  useEffect(() => {
    CheckIsAuth()
  }, [])

  return (
    <>
      <PageTitle>les Evènements </PageTitle>
      <EventsPage />
    </>
  )
}

export default EventsWrapper
