/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {UserModel} from '../../../../app/modules/auth/models/UserModel'
import {RootState} from '../../../../setup'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {UserMenu} from '../user-menu/UserMenu'

const AsideUserMenu: FC = () => {
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel

  return (
    <>
      <div className='d-flex flex-stack'>
        {/* begin::Wrapper */}
        <div className='d-flex align-items-center'>
          {/* begin::Avatar */}
          <div className='symbol symbol-circle symbol-40px'>
            <img src={toAbsoluteUrl(user.photoUrl)} alt='avatar' />
          </div>
          {/* end::Avatar */}
          {/* begin::User info */}
          <div className='ms-2'>
            <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bolder lh-1'>
              {user.username} 
            </a>
           {/* <span className='text-muted fw-bold d-block fs-7 lh-1'>Python Dev</span>*/}
          </div>
          {/* end::User info */}
        </div>
        {/* end::Wrapper */}

        {/* begin::User menu */}
        <div className='ms-1'>
          <div
            className='btn btn-sm btn-icon btn-active-color-primary position-relative me-n2'
            data-kt-menu-trigger='click'
            data-kt-menu-overflow='false'
            data-kt-menu-placement='top-end'
          >
            <KTSVG path='/media/icons/duotune/coding/cod001.svg' className='svg-icon-1' />
          </div>
          <UserMenu />
        </div>
        {/* end::User menu */}
      </div>
    </>
  )
}

export {AsideUserMenu}
