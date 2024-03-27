import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { OrderListWrapper } from './order-list/OrderList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des commandes',
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

const OrderPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/liste'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Les commandes </PageTitle>
              <OrderListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/orders/liste' />} />
    </Routes>
  )
}

export default OrderPage
