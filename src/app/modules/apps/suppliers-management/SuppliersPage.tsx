import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {SuppliersListWrapper} from './suppliers-list/SuppliersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des fournisseurs',
    path: '/suppliers/liste/all',
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

const SuppliersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='all'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les fournisseurs </PageTitle>
              <SuppliersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/suppliers/liste/all' />} />
    </Routes>
  )
}

export default SuppliersPage
