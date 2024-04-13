import React, {useContext, useEffect} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {useAuth} from '../../modules/auth'
import {getUserByToken} from '../../modules/auth/core/_requests'
import {AppContext} from '../../../AppContext'
import CategoriesPage from '../../modules/apps/categories-management/CategoriesPage'

function CategoriesWrapper() {
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
      <PageTitle>Categories</PageTitle>
      <CategoriesPage />
    </>
  )
}

export default CategoriesWrapper
