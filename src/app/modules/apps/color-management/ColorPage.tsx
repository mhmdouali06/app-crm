import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { ColorListWrapper } from './color-list/ColorList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des couleurs',
    path: '/color/',
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

const ColorPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/all'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les Couleurs</PageTitle>
              <ColorListWrapper />
            </>
          }
        />
  
    
   
      </Route>
      <Route index element={<Navigate to='/color/all' />} />
    </Routes>
  )
}

export default ColorPage
