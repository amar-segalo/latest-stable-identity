import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {Postavke} from './components/Postavke'
import {Campaigns} from './components/Campaigns'
import {Documents} from './components/Documents'
import {Connections} from './components/Connections'
import {ProfileHeader} from './ProfileHeader'
import { Sessions } from './components/Sessions'
import { Orders } from './components/Orders'
import { Addresses } from './components/Addresses'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profil',
    path: '/overview',
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
      element={
        <>
          <ProfileHeader />
          <Outlet />
        </>
      }
    >
      <Route
        path='overview'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Pregled</PageTitle>
            <Overview />
          </>
        }
      />
      <Route
        path='projects'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Postavke</PageTitle>
            <Postavke />
          </>
        }
      />
       <Route
        path='documents'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Dokumenti</PageTitle>
            <Documents />
          </>
        }
      />
         <Route
        path='logs'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Sesije</PageTitle>
            <Sessions />
          </>
        }
      />
          <Route
        path='orders'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Narudžbe</PageTitle>
            <Orders />
          </>
        }
      />

<Route
        path='addresses'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Adrese</PageTitle>
            <Addresses />
          </>
        }
      />
     
     
  
      <Route index element={<Navigate to='/crafted/pages/profile/overview' />} />
    </Route>
  </Routes>
)

export default ProfilePage
