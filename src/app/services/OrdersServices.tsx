import jwtDecode from 'jwt-decode'
import axios from 'axios';
import axiosInstance from '../../setup/axios/axiosInstance';
import axiosCommerceInstance from '../../setup/axios/axiosCommerceInstance';

const API_URL ="https://testapi-commerce.emaq.ba/api";


export const GET_USER_ORDERS = `${API_URL}/Orders`
export const GET_USER_ORDERS_DETAILS = `${API_URL}/Orders`
export const GET_USER_POINTS = `${API_URL}/PointsLogs`
export async function getUserOrders(pageSize:number,page:number){
 const config ={
    headers: { 
        'Access-Control-Allow-Origin' : 'https://testapi-commerce.emaq.ba',
       }
 };

   // return await axiosCommerceInstance.get(`${GET_USER_ORDERS}?ExtUserId=1&Page=${page}&PageSize=${pageSize}&AdditionalData.IncludeList=Store&IncludeCount=true`,config);
   return await axiosCommerceInstance.get(`${GET_USER_ORDERS}/GetOrderDetails?userId=1&Page=${page}&PageSize=${pageSize}`,config);
}


export async function getUserOrdersDetails(id:number){
   const config ={
      headers: { 
          'Access-Control-Allow-Origin' : 'https://testapi-commerce.emaq.ba',
         }
      };

         return await axiosCommerceInstance.get(`${GET_USER_ORDERS_DETAILS}/${id}?IncludeList=OrderStatus&IncludeList=OrderItems&IncludeList=PaymentType&IncludeList=PaymentType.PaymentTypeTranslations&IncludeList=OrderItems.Item.ItemAttributes&IncludeList=PointsLogs&IncludeList=OrderItems.Item.Images&IncludeList=OrderItems.Item.ItemTranslations&IncludeList=OrderItems.Item.Category&IncludeList=OrderItems.Item.Category.CategoryTranslations`,config);
}

export async function getUserPoints(){
   const config ={
      headers: { 
          'Access-Control-Allow-Origin' : 'https://testapi-commerce.emaq.ba',
         }
      };

         return await axiosCommerceInstance.get(`${GET_USER_POINTS}?ExtUserId=1`,config);
   }