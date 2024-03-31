import React, {useContext, useEffect} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {useAuth} from '../../modules/auth'
import {getUserByToken} from '../../modules/auth/core/_requests'
import UsersPage from '../../modules/apps/users-management/UsersPage'
import {AppContext} from '../../../AppContext'

function UsersWrapper() {
  const {auth, logout, setCurrentUser} = useAuth()
  const {setPermission} = useContext(AppContext)

  const CheckIsAuth = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        const {data} = await getUserByToken(auth?.api_token)

        if (data) {
          await setCurrentUser(data)
          await setPermission(data.roles)
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
      <PageTitle>Utilisateurs</PageTitle>
      <UsersPage />
    </>
  )
}

export default UsersWrapper
