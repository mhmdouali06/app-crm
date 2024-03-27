import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { EventsListWrapper } from './events-list/EventsList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Liste des evenments ',
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

const EventsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/liste'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Tous les evenments</PageTitle>
              <EventsListWrapper />
            </>
          }
        />
        
      </Route>
      <Route index element={<Navigate to='/events/liste' />} />
    </Routes>
  )
}

export default EventsPage
