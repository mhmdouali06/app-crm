import React, {useEffect} from 'react'
import CategoryPage from '../../modules/apps/category-management/CategoryPage'
import {PageTitle} from '../../../_metronic/layout/core'
import {useAuth} from '../../modules/auth'
import {getUserByToken} from '../../modules/auth/core/_requests'

function CategoryWrapper() {
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
      <PageTitle>Categories</PageTitle>
      <CategoryPage />
    </>
  )
}

export default CategoryWrapper
