/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useSearchParams, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {PersonalInformation} from './PersonalInformations'
import {getUserInfo} from '../../../services/UserServices'
import {SecurityInformation} from './SecurityInformation'
import {getStorageAccessToken} from '../../../helpers/helpers'

export interface UserModel {
  emailStripped: string
  phone: string
  photoUrl: string
  privateIndividual: {
    firstName: string
    lastName: string
  }
}

export function Postavke() {
  const obj: UserModel = {
    emailStripped: '',
    phone: '',
    photoUrl: '',
    privateIndividual: {
      firstName: '',
      lastName: '',
    },
  }
  const [userData, setUserData] = useState(obj)
  const [hasData, setHasData] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserInfo(getStorageAccessToken()).then((response) => {
      setUserData(response.data)
      console.log(response)
      setLoading(false)
      setHasData(true)
    })
  }, [])

  return (
    <>
      {loading && <p>Učitavanje..</p>}
      {!loading && hasData && <PersonalInformation data={userData}></PersonalInformation>}
      {!loading && hasData && <SecurityInformation></SecurityInformation>}
    </>
  )
}
