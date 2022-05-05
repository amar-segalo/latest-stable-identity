import React, {useEffect, useState} from 'react'
import sessions from './../../../../demodata/sessions.json'
import {getUserActiveSessions} from '../../../services/UserServices'
import {getStorageAccessToken} from '../../../helpers/helpers'

function getDate() {
  var date = new Date()
  return date.getHours() + ' : ' + date.getMinutes()
}
export function Sessions() {
  const [sessions, setSessions] = useState([
    {
      applicationName: ' ',
      clientName: ' ',
      ipAddress: ' ',
      isCurrentSession: '',
    },
  ])
  const [loading, setLoding] = useState(true)
  useEffect(() => {
    getUserActiveSessions(getStorageAccessToken())
      .then((response: any) => {
        setSessions(response.data.sessions)
        console.log(response.data.sessions)
        setLoding(false)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {!loading && (
        <div className='card mb-5 mb-lg-10'>
          <div className='card-header'>
            <div className='card-title'>
              <h3>Aktivne korisničke sesije</h3>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table table-flush align-middle table-row-bordered table-row-solid gy-4 gs-9'>
                <thead className='border-gray-200 fs-5 fw-bold bg-lighten'>
                  <tr>
                    <th className='min-w-250px'>Aplikacija</th>
                    <th className='min-w-150px'>Klijent</th>
                    <th className='min-w-150px'>IP Adresa</th>
                    <th className='min-w-150px'>Vrijeme</th>
                    <th className='min-w-100px'>Status</th>
                  </tr>
                </thead>
                <tbody className='fw-6 fw-bold text-gray-600'>
                  {sessions.map((session: any, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <a href='#' className='text-hover-primary text-gray-600'>
                            {session.applicationNames}
                          </a>
                        </td>

                        <td>{session.clientName}</td>
                        <td>{session.ipAddress}</td>
                        <td>{session.createdOn}</td>
                        <td>
                          {session.isCurrentSession == true && (
                            <span
                              className='badge badge-success fs-7 fw-bolder'
                              style={{backgroundColor: '#36b3a2', color: 'white'}}
                            >
                              Aktivno
                            </span>
                          )}
                          {session.isCurrentSession == false && (
                            <span className='badge badge-danger fs-7 fw-bolder'>Neaktivno</span>
                          )}
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

      {loading && <p>Učitavanje...</p>}
    </>
  )
}
