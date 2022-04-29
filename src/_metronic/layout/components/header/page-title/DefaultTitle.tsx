import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLayout} from '../../../core/LayoutProvider'
import {usePageData} from '../../../core/PageData'
import { UserModel } from '../../../../../app/modules/auth/models/UserModel'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../../setup'
const DefaultTitle = () => {
  const {pageTitle, pageDescription, pageBreadcrumbs} = usePageData()
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel

  const {config} = useLayout()
  return (
    <div
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_container'}"
      className='page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-5 pb-lg-0'
    >
      {/* begin::Heading */}
      {pageTitle && (
        <h1 className='d-flex flex-column text-dark fw-bolder my-0 fs-1'>
          Pozdrav, {user.username}
          
        </h1>
      )}
      {/* end::Heading */}

      {pageBreadcrumbs &&
        pageBreadcrumbs.length > 0 &&
        config.pageTitle &&
        config.pageTitle.breadCrumbs && (
          <ul className='breadcrumb breadcrumb-dot fw-bold fs-base my-1'>
            {Array.from(pageBreadcrumbs)
              .filter((b) => !b.isSeparator)
              .map((item, index) => (
                <li
                  className={clsx('breadcrumb-item', {
                    'text-dark': !item.isSeparator && item.isActive,
                    'text-muted': !item.isSeparator && !item.isActive,
                  })}
                  key={`${item.path}${index}`}
                >
                  <Link className='text-muted' to={item.path}>
                    {item.title}
                  </Link>
                </li>
              ))}
            <li className='breadcrumb-item text-dark'>{pageTitle}</li>
          </ul>
        )}
    </div>
  )
}

export {DefaultTitle}
