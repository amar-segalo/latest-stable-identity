import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import * as auth from '../../app/modules/auth/redux/AuthRedux'
import {getUserByToken, logout} from '../../app/modules/auth/redux/AuthCRUD'
import {useDispatch} from 'react-redux'
import {actions} from '../../app/modules/auth/redux/AuthRedux'
import {Link, useSearchParams, useNavigate} from 'react-router-dom'
import {getStorageAccessToken} from '../../app/helpers/helpers'
axios.defaults.headers.Accept = 'application/json'
axios.defaults.withCredentials = true

//const baseURL = "https://localapi-accounts.emaq.ba:44389/api"
const baseURL = 'https://testapi-accounts.emaq.ba/api'

const axiosInstance = axios.create({})

axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.headers.Accept = 'application/json'

axiosInstance.interceptors.request.use(async (req) => {
  // if refresh token expired logut
  const date = new Date()
  const seconds = Math.floor(date.getTime() / 1000)
  let refreshData = localStorage.getItem('emaq-refreshToken')
  if (refreshData != null) var refreshToken = JSON.parse(refreshData)
  if (seconds > refreshToken) {
    console.log('refresh token istekao')
    localStorage.removeItem('persist:emaq-usersession')
    localStorage.removeItem('auth-tokens')
    window.location.href = '/auth'

    return req
  }

  // if accessToken not expired continue
  var authTokens
  let data = localStorage.getItem('session-token')
  if (data != null) authTokens = JSON.parse(data)
  req.headers.Authorization = `Bearer ${authTokens?.accessToken}`
  const user: any = jwt_decode(authTokens.accessToken)

  var isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
  if (!isExpired) {
    console.log('access token nije istekao')
    return req
  }

  //if access token expired request new token
  console.log(isExpired)
  if (isExpired) {
    console.log('access token istekao')

    const config = {
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
        ClientId: '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF',
      },
    }

    const refreshData = {
      accessToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken,
    }

    console.log(refreshData)
    const response = await axios.post(`${baseURL}/usersessions/refresh`, refreshData, config)

    localStorage.removeItem('session-token')
    localStorage.setItem('session-token', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.accessToken}`
    isExpired = false
    return req
  }
})

axiosInstance.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    const status = err.response ? err.response.status : null
    if (status === 401) {
      localStorage.removeItem('persist:emaq-usersession')
      localStorage.removeItem('auth-tokens')
      window.location.href = '/auth'
    }
    if (status === 403) {
      localStorage.removeItem('persist:emaq-usersession')
      localStorage.removeItem('auth-tokens')
      window.location.href = '/auth'
    }
    return Promise.reject(err)
  }
)

export default axiosInstance
