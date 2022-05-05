import {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getStorageAccessToken} from '../../../helpers/helpers'
import {getUserOrders} from '../../../services/OrdersServices'
import {OrderDetails} from './OrderDetails'
import Pagination from 'react-bootstrap/Pagination'
import {current} from '@reduxjs/toolkit'
import {couldStartTrivia} from 'typescript'
export function Orders() {
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [ordersCount, setOrdersCount] = useState(0)
  const [order, setOrder] = useState()
  const [maxPage, setMaxPage] = useState(0)
  const [orders, setOrders] = useState([
    {
      id: 0,
      orderNumber: '',
      createdOn: '',
      orderStatusId: 0,
      store: {
        name: '',
        address: '',
      },
      orderStatus: {
        orderStatusTranslations: [
          {
            languageId: 0,
            name: '',
          },
        ],
      },
      paymentType: {
        paymentTypeTranslations: [
          {
            languageId: 0,
            name: '',
          },
        ],
      },
      orderTotal: 0,
    },
  ])
  useEffect(() => {
    getUserOrders(pageSize, page)
      .then((response) => {
        setOrders(response.data)
        setOrdersCount(response.data.length)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [pageSize, page])
  function hasDecimal(num: any) {
    return !!(num % 1)
  }
  function showOrderDetails() {
    setShowDetails(true)
  }
  function changePageSize(e: any) {
    setPageSize(e.target.value)
  }
  function nextPage() {
    /* var p = page;
  console.log("p",p);

  var nmb = ordersCount/pageSize;
 //var maxPage = hasDecimal(nmb)? Number.isInteger(Math.round(nmb)) ? Math.round(nmb)-1 : Math.round(nmb) : nmb;
 var maxPage = hasDecimal(nmb)? Math.ceil(nmb) : nmb; 
  console.log("maxpage",maxPage);
   if(p+1 < maxPage )
   {
    setPage(p+1)
   }
  
   else if(p >= maxPage)
   setPage(p);
   return*/
    var p = page
    if (ordersCount == pageSize) setPage(p + 1)
    else setPage(p)
  }

  function previousPage() {
    var p = page
    if (p > 0) setPage(p - 1)
    else setPage(p)
  }
  function handler(newState: boolean) {
    setShowDetails(newState)
  }

  function modalHandler(order: any) {
    setShowDetails(true)

    setOrder(order)
  }

  return (
    <>
      {orders.length == 1 && <p>Učitavanje..</p>}
      {orders.length > 1 && (
        <div className='card mb-5 mb-xl-10'>
          <div className='card-header border-0 pt-5'>
            <div>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bolder fs-3 mb-1'>Moje narudžbe</span>
              </h3>
            </div>
            <div className='col-2' style={{marginRight: '10px'}}>
              <label style={{marginRight: '10px'}} htmlFor='pageSize'>
                Broj zapisa:
              </label>
              <select name='pageSize' id='pageSize' onChange={changePageSize}>
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </select>
            </div>
          </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted'>
                    <th className='min-w-100px'>Broj narudžbe</th>
                    <th className='min-w-100px'>Radnja</th>
                    <th className='min-w-100px'>Status narudžbe</th>
                    <th className='min-w-100px'>Tip plaćanja</th>
                    <th className='min-w-100px'>Ukupno</th>
                    <th className='min-w-100px'></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr key={order.id}>
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='d-flex justify-content-start flex-column'>
                              <a
                                className='text-dark fw-bolder text-hover-primary fs-6'
                                onClick={() => modalHandler(order)}
                              >
                                {order.orderNumber}
                              </a>
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {new Date(order.createdOn).toLocaleString(`fr-CH`, {
                                  timeStyle: 'short',
                                  dateStyle: 'short',
                                })}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='d-flex justify-content-start flex-column'>
                              <div className='d-flex justify-content-start flex-column'>
                                <a className='text-dark fw-bolder text-hover-primary fs-6'>
                                  {order.store.name}
                                </a>
                                <span className='text-muted fw-bold text-muted d-block fs-7'>
                                  {order.store.address}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='d-flex justify-content-start flex-column'>
                              <p className='text-dark  d-block fs-6'>
                                <span className='badge badge-secondary'>
                                  {
                                    order.orderStatus.orderStatusTranslations.find(
                                      (x) => x.languageId == 1
                                    )?.name
                                  }
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='d-flex justify-content-start flex-column'>
                              <p className='text-dark  d-block fs-6'>
                                {
                                  order.paymentType?.paymentTypeTranslations.find(
                                    (x) => x.languageId == 1
                                  )?.name
                                }
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className='d-flex align-items-center '>
                            <div className='d-flex justify-content-start flex-column'>
                              <p className='text-dark  d-block fs-6 ml-5'>
                                {order.orderTotal.toFixed(2)} KM
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {order.orderStatusId != 4 && (
                            <div>
                              <button
                                className='btn btn-danger btn-sm '
                                type='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                              >
                                Otkaži
                              </button>
                              <ul
                                className='dropdown-menu text-center'
                                aria-labelledby='dropdownMenuButton1'
                              >
                                <h6>Da li ste sigurni?</h6>
                                <li>
                                  <a className='dropdown-item' href='#'>
                                    Da
                                  </a>
                                </li>
                                <li>
                                  <p className='dropdown-item' data-bs-toggle='dropdown'>
                                    Ne
                                  </p>
                                </li>
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-12 d-flex justify-content-center mb-5'>
            <div className='col-2'>
              <button
                type='button'
                className='btn '
                style={{backgroundColor: '#36b3a2', color: 'white'}}
                onClick={previousPage}
              >
                Prethodna
              </button>
            </div>
            <div className='col-2'>
              <button
                type='button'
                className='btn  '
                style={{backgroundColor: '#36b3a2', color: 'white'}}
                onClick={nextPage}
              >
                Sljedeća
              </button>
            </div>
          </div>

          {showDetails && (
            <OrderDetails showModal={showDetails} handler={handler} order={order}></OrderDetails>
          )}
        </div>
      )}
    </>
  )
}
