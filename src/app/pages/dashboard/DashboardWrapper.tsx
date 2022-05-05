/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
// import {useIntl} from 'react-intl'
import {EnableSidebar, PageLink, PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget4,
  ListsWidget5,
  TablesWidget9,
  MixedWidget13,
  MixedWidget14,
  MixedWidget15,
} from '../../../_metronic/partials/widgets'
import { Addresses } from '../../modules/profile/components/Addresses'
import { Documents } from '../../modules/profile/components/Documents'
import { Orders } from '../../modules/profile/components/Orders'
import { Overview } from '../../modules/profile/components/Overview'
import { Postavke } from '../../modules/profile/components/Postavke'
import { Sessions } from '../../modules/profile/components/Sessions'
import { ProfileHeader } from '../../modules/profile/ProfileHeader'
import ProfilePage from '../../modules/profile/ProfilePage'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/crafted/pages/profile/overview',
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


const DashboardPage: FC = () => (
  <>
 <ProfileHeader></ProfileHeader>
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
  </>
)

const DashboardWrapper: FC = () => {
  // const intl = useIntl()
  return (
    <EnableSidebar>
      
      <DashboardPage />
    </EnableSidebar>
  )
}

export {DashboardWrapper}
