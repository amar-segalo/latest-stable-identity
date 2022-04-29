import axios from 'axios'
import jwtDecode from 'jwt-decode'
import axiosInstance from '../../setup/axios/axiosInstance';

//const API_URL ="https://localapi-accounts.emaq.ba:44389/api";
const API_URL ="https://testapi-accounts.emaq.ba/api";

export const GET_USER_INFO = `${API_URL}/users/userspersonalinformation`
export const UPDATE_PERSONAL_INFO = `${API_URL}/users/userspersonalinformation`
export const UPDATE_SECURITY_INFO = `${API_URL}/users/userssecurityinformation`
export const GET_USER_ACTIVESESSIONS = `${API_URL}/usersessions/activesessions`



export async function getUserInfo(token:string){
 const config ={
    headers: { 
        'Authorization': `Bearer ${token}`,
        'ClientId' : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF' ,
        'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',
       }
 };

    return await axiosInstance.get( GET_USER_INFO, config);

}

export async function updatePersonalInfo(personalInfoData:any,token:string){
    const config = {
        headers:{
            'Authorization': `Bearer ${token}`,
            'ClientId' : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF' ,
        'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',

        }
    }

    return await axiosInstance.post(UPDATE_PERSONAL_INFO,personalInfoData,config);
}

export async function updateSecurityInformation(securityInfoData:any,token:string){
    console.log(securityInfoData)
    const config = {
        headers:{
            'Authorization': `Bearer ${token}`,
            'ClientId' : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF' ,
        'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',

        }
    }

    return await axiosInstance.post(UPDATE_SECURITY_INFO,securityInfoData,config);
}

export async function getUserActiveSessions(token:string){
    const config ={
       headers: { 
           'Authorization': `Bearer ${token}`,
           'ClientId' : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF' ,
        'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',

          }
    };
   
       return await axiosInstance.get( GET_USER_ACTIVESESSIONS, config);
   
   }