import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des utilisateurs',
    path: '/users/liste/all',
    isSeparator: false,
    isActive: true,
  },

  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='all'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les utilisateurs</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/users/liste/all' />} />
    </Routes>
  )
}

export default UsersPage
