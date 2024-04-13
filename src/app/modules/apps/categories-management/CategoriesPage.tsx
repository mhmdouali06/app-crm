import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CategoriesListWrapper} from './categories-list/CategoriesList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des categories',
    path: '/categories/liste/all',
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

const CategoriesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='all'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les Categories </PageTitle>
              <CategoriesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/categories/liste/all' />} />
    </Routes>
  )
}

export default CategoriesPage
