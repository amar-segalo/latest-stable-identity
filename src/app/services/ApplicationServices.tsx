import jwtDecode from 'jwt-decode'
import axios from 'axios';
import axiosInstance from '../../setup/axios/axiosInstance';

//const API_URL ="https://localapi-accounts.emaq.ba:44389/api";
const API_URL ="https://testapi-accounts.emaq.ba/api";

export const GET_USERAPPLICATIONS_URL = `${API_URL}/userapplications`
export async function getUserApplications(token:string){
 const config ={
    headers: { 
        'Authorization': `Bearer ${token}`,
        'ClientId' : '1CAA63AA-45ED-48AE-8572-F7E9BDDAA3EF',
        'Access-Control-Allow-Origin' : 'https://testapi-accounts.emaq.ba',

       }
 };

    return await axiosInstance.get(GET_USERAPPLICATIONS_URL,config);

}