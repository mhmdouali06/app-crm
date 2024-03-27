import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { CodoPromoListWrapper } from './codePromo-list/CodoPromoList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des codes promo',
    path: '/',
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

const CodePromoPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/liste'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les codes promo</PageTitle>
              <CodoPromoListWrapper />
            </>
          }
        />
        <Route
          path='grand'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Code promo </PageTitle>
              <CodoPromoListWrapper />
            </>
          }
        />
        <Route
          path='moyen'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Moyen Parfums </PageTitle>
              <CodoPromoListWrapper />
            </>
          }
        />
        <Route
          path='small'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Petite Parfums </PageTitle>
              <CodoPromoListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/code-promo/liste' />} />
    </Routes>
  )
}

export default CodePromoPage
