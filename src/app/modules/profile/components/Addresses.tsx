import {useEffect, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers/components/KTSVG'
import {getUserAddresses, removeAddress} from '../../../services/AddressesServices'
import {AddAddress} from './AddAddress'
import {EditAddress} from './EditAddress'

export function Addresses() {
  const [addressCount, setAddressCount] = useState(0)
  const [isEditAddress, setIsEditAddress] = useState(false)
  const [editAddress, setEditAddress] = useState({
    id: 0,
    addressType: 0,
    streetName: '',
    streetNumber: '',
    zipPostalCode: '',
    cityId: '',
    countryId: '',
    hasLift: '',
    floor: '',
    city: {
      name: '',
    },
    country: {
      name: '',
    },
  })
  const [addresses, setAddresses] = useState([
    {
      id: 0,
      addressType: 0,
      streetName: '',
      streetNumber: '',
      zipPostalCode: '',
      hasLift: '',
      cityId: '',
      countryId: '',
      floor: '',
      city: {
        name: '',
      },
      country: {
        name: '',
      },
    },
  ])
  function removeAddressHandler(id: any) {
    removeAddress(id)
      .then((response) => {
        var previousState = addressCount
        setAddressCount(previousState - 1)
      })
      .catch((err) => console.log(err))
  }
  function addAddress() {
    var previousState = addressCount
    setAddressCount(previousState + 1)
  }
  function clearEdit(isEdit: any) {
    setIsEditAddress(isEdit)
  }
  function editAddressHandler(address: any) {
    setEditAddress(address)
    setIsEditAddress(true)
  }

  useEffect(() => {
    getUserAddresses()
      .then((response) => {
        setAddresses(response.data.resultList)
        console.log(response.data.resultList)
        setAddressCount(response.data.resultList.length)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [addressCount])
  return (
    <>
      {addresses.length == 0 && <p>Učitavanje..</p>}
      {addresses.length >= 1 && (
        <div className='card mb-5 mb-xl-10'>
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bolder fs-3 mb-1'>Adrese</span>
            </h3>
          </div>
          {isEditAddress && (
            <EditAddress
              editAddress={editAddress}
              addressHandler={addAddress}
              editHandler={clearEdit}
            ></EditAddress>
          )}
          {!isEditAddress && <AddAddress addressHandler={addAddress}></AddAddress>}

          <div className='card-body py-3'>
            <div className='table-responsive fs-md'>
              <table className='table mb-0 table-row-dashed table-row-gray-300'>
                <thead>
                  <tr className='fw-bolder text-muted'>
                    <th className='min-w-120px'>Ulica i broj</th>
                    <th className='min-w-100px'>Sprat</th>
                    <th className='min-w-100px'>Lift</th>
                    <th className='min-w-100px'>Grad</th>
                    <th className='min-w-100px'>Zip</th>
                    <th className='min-w-100px'>Država</th>
                    <th className='min-w-100px'></th>
                  </tr>
                </thead>
                <tbody>
                  {addresses.map((address) => {
                    return (
                      <tr key={address.id}>
                        <td className='py-3 align-middle address '>
                          {address.streetName} {address.streetNumber}
                        </td>
                        <td className='py-3 align-middle address'>{address.floor}</td>
                        {address.hasLift && (
                          <td className='py-3 align-middle address'>
                            <span className='badge badge-success'>Ima</span>
                          </td>
                        )}
                        {!address.hasLift && (
                          <td className='py-3 align-middle address'>
                            <span className='badge badge-danger'>Nema</span>
                          </td>
                        )}

                        <td className='py-3 align-middle address'>{address.city.name}</td>
                        <td className='py-3 align-middle address'>{address.zipPostalCode}</td>
                        <td className='py-3 align-middle address'>{address.country.name}</td>
                        {/* <td className="py-3 align-middle address">
                                 {address.addressType == 1 &&
                                <span className="align-center badge bg-success m-2 font-weight-bold text-light">Kuća</span>
                                 }
                                  {address.addressType == 2 &&
                                <span className="align-center badge bg-info m-2 font-weight-bold text-light">Posao</span>
                                 }
                                  {address.addressType == 3 &&
                                <span className="align-center badge bg-danger m-2 font-weight-bold text-light">Ostalo</span>
                                 }
                        </td> 
                         */}
                        <td className='py-3  address d-flex justify-content-end '>
                          <button
                            className='btn btn-sm font-weight-bolder '
                            type='button'
                            onClick={() => editAddressHandler(address)}
                            title='Edit'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </button>
                          <button
                            className='btn btn-sm font-weight-bolder '
                            type='button'
                            data-bs-toggle='dropdown'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </button>
                          <ul
                            className='dropdown-menu text-center'
                            aria-labelledby='dropdownMenuButton1'
                          >
                            <h6 className=''>Da li ste sigurni?</h6>
                            <hr className='bg-danger border-2 border-top border-danger'></hr>
                            <li>
                              <a
                                className='dropdown-item'
                                onClick={() => removeAddressHandler(address.id)}
                                href='#'
                              >
                                Da
                              </a>
                            </li>
                            <li>
                              <p className='dropdown-item' data-bs-toggle='dropdown'>
                                Ne
                              </p>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
