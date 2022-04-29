import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  hasBullet?: boolean
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  hasBullet = false,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config
  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link', {active: isActive})} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
       <div className='symbol symbol-50px me-5'>
             <img src={toAbsoluteUrl('/media/logos/app-icon.png')} className='' alt='' />
           </div>
        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
