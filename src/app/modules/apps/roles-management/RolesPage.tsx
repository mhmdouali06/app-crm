import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {RolesListWrapper} from './roles-list/RolesList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des roles',
    path: '/roles/liste/all',
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

const RolesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='all'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les roles</PageTitle>
              <RolesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/roles/liste/all' />} />
    </Routes>
  )
}

export default RolesPage
