import jwtDecode from 'jwt-decode'
import axiosCommerceInstance from '../../setup/axios/axiosCommerceInstance';

const API_URL ="https://testapi-commerce.emaq.ba/api";

export const GET_USER_ADDRESSES = `${API_URL}/Addresses?AdditionalData.IncludeList=City&AdditionalData.IncludeList=Country`
export const GET_CITIES = `${API_URL}/Cities`
export const ADD_ADDRESS =  `${API_URL}/Addresses`
export const REMOVE_ADDRESS = `${API_URL}/Addresses`
export const UPDATE_ADDRESS = `${API_URL}/Addresses`
export const GET_COUNTRIES = `${API_URL}/Countries`


export async function getUserAddresses(){
 const config ={
    headers: { 
        'Access-Control-Allow-Origin' : 'https://testapi-commerce.emaq.ba',
       }
 };

    return await axiosCommerceInstance.get(GET_USER_ADDRESSES,config);

}

export async function getCities() {
    const config ={
        headers: { 
            'Access-Control-Allow-Origin' : 'https://testapi-commerce.emaq.ba',
           }
     };
    
        return await axiosCommerceInstance.get(GET_CITIES,config);
}

export async function getCountries() {
    const config ={
        headers: { 
            'Access-Control-Allow-Origin' : 'https://testapi-commerce.emaq.ba',
           }
     };
    
        return await axiosCommerceInstance.get(GET_COUNTRIES,config);
}


export async function addAddress(address:any) {
    const config ={
        headers: { 
            'Access-Control-Allow-Origin' : 'https://testapi-commerce.emaq.ba',
           }
     };
    
        return await axiosCommerceInstance.post( ADD_ADDRESS,address,config);
}

export async function removeAddress(id:any) {
    const config ={
        headers: { 
            'Access-Control-Allow-Origin' : 'https://testapi-commerce.emaq.ba',
           }
     };
    
        return await axiosCommerceInstance.delete( `${ADD_ADDRESS}/${id}`,config);
}


export async function updateAddress(id:any,address:any) {
    const config ={
        headers: { 
            'Access-Control-Allow-Origin' : 'https://testapi-commerce.emaq.ba',
           }
     };
    
        return await axiosCommerceInstance.patch( `${UPDATE_ADDRESS}/${id}`,address,config);
}
