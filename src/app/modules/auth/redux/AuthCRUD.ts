import axios from 'axios'
import {UserModel} from '../models/UserModel'
import jwtDecode from 'jwt-decode'
import { User } from '../../apps/user-management/users-list/core/_models';


//const API_URL ="https://localapi-accounts.emaq.ba:44389/api";
const API_URL ="https://testapi-accounts.emaq.ba/api";


export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/users/signin`
export const REGISTER_URL = `${API_URL}/users/signup`
export const REQUEST_PASSWORD_URL = `${API_URL}/userrequests/email`
export const REQUEST_PASSWORD_CHANGE_URL = `${API_URL}/userrequests/password`
export const CONFIRM_REGISTRATION_URL =  `${API_URL}/users/signupconfirmation`
export const LOGOUT_URL = `${API_URL}/usersessions/signout`

// Server should return AuthModel
export function login(email: string, password: string) {
  var data = {
    email :email,
    password :password
  }
  return axios.post(LOGIN_URL,data,{
    headers:{
      clientId : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF',
      'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',
    }
  })
}
export function logout(token:string){
  var data={
    accessToken : token
  }
  return axios.get(LOGOUT_URL,{
    headers:{
      clientId : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',
    }
  })
}

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string, password_confirmation: string,phoneNumber:string) {
  var data ={
    email:email,
    firstName: firstname,
    lastName: lastname,
    password:password,
    passwordConfirmation:password_confirmation,
    phoneNumber:phoneNumber
  }
  return axios.post(REGISTER_URL,data,{
    headers:{
      clientId : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF',
      'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',
    }
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  var data = {
    email:email
  }
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL,data,{
    headers:{
      clientId : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF',
      'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',
    }
  })
}
export function resetPassword(email: string, code:string, password:string, confirmPassword:string) {
  var data = {
    email:email,
    resetCode:code,
    password:password,
    passwordConfirmation:confirmPassword
  }
  console.log(data)
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_CHANGE_URL,data, {
    headers:{
      clientId : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF',
      'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',
    }
  })
  
}
export function getUserByToken(token:string) {
  if(token != null){
    var decoded:UserModel = jwtDecode(token);
  
    return decoded;
}
}

export function signUpConfirmation(code: string) {
  var data = {
    code:code
  }
  return axios.post(CONFIRM_REGISTRATION_URL,data,{
    headers:{
      clientId : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF',
      'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',
    }
  })
}
