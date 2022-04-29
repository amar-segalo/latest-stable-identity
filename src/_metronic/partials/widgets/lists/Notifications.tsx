/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import data from '../../../../demodata/notifications.json'
type Props = {
  className: string
}


const ListsWidget2: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bolder text-dark'>Notifikacije</h3>
      </div>
      {/* begin::Body */}
      <div className='card-body pt-2'>
        {/* begin::Item */}
        {data.tenants?.map((tenant)=>{
            return tenant.applications?.map((application)=>{
              return application.notifications?.map((notification)=>{
                return <div className='d-flex align-items-center mb-7' key={notification.Id}>
                {/* begin::Avatar */}
                <div className='symbol symbol-50px me-5'>
                  <img src={toAbsoluteUrl(application.Icon)} className='' alt='' />
                </div>
                {/* end::Avatar */}
                <div className='flex-grow-1'>
                  <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                   {application.Name}
                  </a>
                  {notification.Count > 0 &&
                  <span className='text-primary d-block fw-bold'>Imate {notification.Count} nove notifikacije</span>
                  }
                  {notification.Count == 0 &&
                  <span className='text-muted d-block fw-bold'>Nema novih notifikacija</span>
                  }
                </div>
                {/* end::Text */}
              </div>
              })
            })
          })
           
        }
       
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget2}
