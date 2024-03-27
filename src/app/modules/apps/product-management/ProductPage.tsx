import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { ProductListWrapper } from './product-list/ProductList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des Bougies',
    path: '/product/all',
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

const ProductPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/all'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les Bougies</PageTitle>
              <ProductListWrapper />
            </>
          }
        />

       
       
      </Route>
      <Route index element={<Navigate to='/product/all' />} />
    </Routes>
  )
}

export default ProductPage
