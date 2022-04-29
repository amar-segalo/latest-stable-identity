/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, { useEffect } from 'react'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import data from '../../../../demodata/activities.json'

type Props = {
  className: string
}

const Activities: React.FC<Props> = ({className}) => {

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 mt-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-2 text-dark'>Aktivnost</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-5'>
        {/* begin::Timeline */}
        <div className='timeline-label'>
          {/* begin::Item */}

          { data.activities?.map((activity)=>{

       
            return <div className='timeline-item' key={activity.Id}>
             {/* begin::Label */}
             <div className='timeline-label fw-bolder text-gray-800 fs-6'>{activity.time}</div>
             {/* end::Label */}
             {/* begin::Badge */}
    
            {activity.activityType == 1 &&  <div className='timeline-badge'>
              <i className='fa fa-genderless text-success fs-1'></i>
            </div>
           }
            {activity.activityType == 2 &&  <div className='timeline-badge'>
              <i className='fa fa-genderless text-primary fs-1'></i>
            </div>
           }
            {activity.activityType == 3 &&  <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
           }
          
             {/* end::Badge */}
             {/* begin::Text */}
             <div className='fw-bolder text-gray-800 ps-3'>
               {activity.activity}
             </div>
             {/* end::Text */}
           </div>
    })
  }
        </div>
        {/* end::Timeline */}
      </div>
      {/* end: Card Body */}
    </div>
  )
}

export {Activities as ListsWidget5}
