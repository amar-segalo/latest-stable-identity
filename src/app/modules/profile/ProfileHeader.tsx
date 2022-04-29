/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useLocation} from 'react-router-dom'
import { UserModel } from '../auth/models/UserModel'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../setup'
import { Topbar } from '../../../_metronic/layout/components/header/Topbar'
import { getUserInfo } from '../../services/UserServices'
import { object } from 'yup'
import { UserHeaderModel } from '../auth/models/UserHeaderModel'
import { getStorageAccessToken } from '../../helpers/helpers'
import { getUserPoints } from '../../services/OrdersServices'

const ProfileHeader: React.FC = () => {
 
  const [hasData, setHasData] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [spentTotal, setSpentTotal] = useState(0);
  const [gainedTotal, setGainedTotal] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0); 

  function calculatePoints(pointslogs:any){
    pointslogs.forEach((log: any) => {
      var totalPrev = totalPoints;
      if(log.points > 0 ){
        var gainedPrev = gainedTotal;
        setGainedTotal(gainedPrev + log.points)
        setTotalPoints(totalPrev + log.points)
      }
      else if(log.points < 0){
        var spentPrev = spentTotal;
        setSpentTotal(spentPrev + (log.points * - 1))
        setTotalPoints(totalPrev + (log.points * - 1))
      }
   });
  }


useEffect(()=>{
  getUserInfo(getStorageAccessToken()).then(response=>{
setHasData(true);
  })

  getUserPoints().then(response =>{
    calculatePoints(response.data.resultList);
    setTotalOrders(response.data.resultList.length)
  }).catch(err =>{
    console.log(err);
  })
},[])




  const location = useLocation()
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>

            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
             {hasData && <img src={user.photoUrl} alt='Metornic' />}
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {user.username}
                  </a>
                  <a href='#'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen026.svg'
                      className='svg-icon-1 svg-icon-primary'
                    />
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
               
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                   {user.email}
                  </a>
                </div>
              </div>

            

            </div>
            <div className='row'>
            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3 col-2">
														
                            <div className="d-flex align-items-center">
                              <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                               
                              </span>
                              <div className="fs-2 fw-bolder" data-kt-countup="true" data-kt-countup-value="4500" >{totalPoints.toFixed(1)}</div>
                            </div>
                            <div className="fw-bold fs-6 text-gray-400">Ukupno bodova</div>
                          </div>

                          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3 col-2">
														
                            <div className="d-flex align-items-center">
                              <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                               
                              </span>
                              <div className="fs-2 fw-bolder" data-kt-countup="true" data-kt-countup-value="4500" >{spentTotal}</div>
                            </div>
                            <div className="fw-bold fs-6 text-gray-400">Ukupno potrošeno</div>
                          </div>


                          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3 col-2">
														
                            <div className="d-flex align-items-center">
                              <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                               
                              </span>
                              <div className="fs-2 fw-bolder" data-kt-countup="true" data-kt-countup-value="4500" >{gainedTotal.toFixed(1)}</div>
                            </div>
                            <div className="fw-bold fs-6 text-gray-400">Ukupno prikupljeno</div>
                          </div>

                          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3 col-2">
														
                            <div className="d-flex align-items-center">
                              <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                               
                              </span>
                              <div className="fs-2 fw-bolder" data-kt-countup="true" data-kt-countup-value="4500" >{totalOrders}</div>
                            </div>
                            <div className="fw-bold fs-6 text-gray-400">Ukupno narudžbi</div>
                          </div>

                          </div>
           {/* <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2'
                      />
                      <div className='fs-2 fw-bolder'>4500$</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Earnings</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr065.svg'
                        className='svg-icon-3 svg-icon-danger me-2'
                      />
                      <div className='fs-2 fw-bolder'>75</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Projects</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2'
                      />
                      <div className='fs-2 fw-bolder'>60%</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Success Rate</div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                  <span className='fw-bolder fs-6'>50%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: '50%'}}
                  ></div>
                </div>
              </div>
            </div>
*/}

          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/overview' && 'active')
                }
                to='/crafted/pages/profile/overview'
              >
                Pregled
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/projects' && 'active')
                }
                to='/crafted/pages/profile/projects'
              >
                Postavke
              </Link>
            </li>
          {/*  <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/campaigns' && 'active')
                }
                to='/crafted/pages/profile/campaigns'
              >
                Campaigns
              </Link>
              </li> */}
              <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/documents' && 'active')
                }
                to='/crafted/pages/profile/documents'
              >
                Dokumenti
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/logs' && 'active')
                }
                to='/crafted/pages/profile/logs'
              >
                Sesije
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/orders' && 'active')
                }
                to='/crafted/pages/profile/orders'
              >
                Narudžbe
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/addresses' && 'active')
                }
                to='/crafted/pages/profile/addresses'
              >
                Adrese
              </Link>
            </li>
           {/*  <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/connections' && 'active')
                }
                to='/crafted/pages/profile/connections'
              >
                Connections
              </Link>
            </li>*/}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {ProfileHeader}
