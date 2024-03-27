import React, {useEffect} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import ColorPage from '../../modules/apps/color-management/ColorPage'
import {useAuth} from '../../modules/auth'
import {getUserByToken} from '../../modules/auth/core/_requests'

function ColorWrapper() {
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
      <PageTitle>Couleurs</PageTitle>
      <ColorPage />
    </>
  )
}

export default ColorWrapper
