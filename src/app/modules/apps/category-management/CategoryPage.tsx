import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { CategoryListWrapper } from './cotegory-list/CategoryList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des Parfums',
    path: '/category/liste/all',
    isSeparator: false,
    isActive: true,
  },

  {
    title: '',
    path: '/category/liste/grand',
    isSeparator: false,
    isActive: true,
  },
  {
    title: '',
    path: '/category/liste/moyen',
    isSeparator: false,
    isActive: true,
  },
  {
    title: '',
    path: '/category/liste/small',
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

const CategoryPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='all'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les Parfums</PageTitle>
              <CategoryListWrapper />
            </>
          }
        />
        <Route
          path='grand'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Grand Parfums </PageTitle>
              <CategoryListWrapper />
            </>
          }
        />
        <Route
          path='moyen'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Moyen Parfums </PageTitle>
              <CategoryListWrapper />
            </>
          }
        />
        <Route
          path='small'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Petite Parfums </PageTitle>
              <CategoryListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/category/liste/all' />} />
    </Routes>
  )
}

export default CategoryPage
