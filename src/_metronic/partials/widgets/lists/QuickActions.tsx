/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import data from '../../../../demodata/quickactions.json'

type Props = {
  className: string
}

const QuickActions: React.FC<Props> = ({className}) => {

  return (
    
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 '>
        <h3 className=' card-title align-items-start flex-column'>
          <span className='fw-bolder  text-dark'>Brze akcije</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
        {/* begin::Timeline */}
        <div className='row g-5 g-xxl-8 mb-10 '>
          {/* begin::Item */}
          {
              data.tenants?.map((tenant)=>{
               return tenant.applications?.map((application)=>{
                return  application.quickActions?.map((quickaction)=>{
                  return <div className='col-md-3 text-center' key={quickaction.Id}>
                  <div className='symbol symbol-100px '>
                 <img src={toAbsoluteUrl(quickaction.Icon)} className='text-center' alt='' />
               </div>
                 <div className=' fw-bold text-gray-800 fs-6'>{application.Name}</div>
                 <span className='text-muted d-block fw-bold'>{quickaction.Name}</span>
               </div>
                  })
                })
              })
               
  }

          {/* end::Item */}
        </div>
        {/* end::Timeline */}
      {/* end: Card Body */}
    </div>
  )
}

export {QuickActions}
