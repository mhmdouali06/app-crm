import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { PackListWrapper } from './pack-list/PackList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des packs',
    path: '/packs/all',
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

const PackPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/all'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les packs</PageTitle>
              <PackListWrapper />
            </>
          }
        />

       
       
      </Route>
      <Route index element={<Navigate to='/packs/all' />} />
    </Routes>
  )
}

export default PackPage
