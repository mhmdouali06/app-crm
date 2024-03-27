import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Settings} from '../accounts/components/settings/Settings'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profil',
    path: '/crafted/pages/profile/seting',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ProfilePage = () => (
  <Routes>
    <Route
      path='seting'
      element={
        <>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Profil</PageTitle>

          <Settings />
        </>
      }
    />

    <Route index element={<Navigate to='/crafted/pages/profile/seting' />} />
  </Routes>
)

export default ProfilePage
