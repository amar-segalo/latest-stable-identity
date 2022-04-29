import {KTSVG} from '../../../helpers'
import {Search} from '../../../partials'

const Topbar = () => {
  return (
    <div className='d-flex align-items-center flex-shrink-0'>
      {/* Search */}
      
      {/* CHAT */}
     

      {/* begin::Sidebar Toggler */}
      <button
        className='btn btn-icon btn-active-icon-primary w-40px h-40px ms-2 '
        id='kt_sidebar_toggler'
      >
        
        <KTSVG path='/media/icons/duotune/coding/cod001.svg' className='svg-icon-2x' />
      </button>
      {/* end::Sidebar Toggler */}
    </div>
  )
}

export {Topbar}
