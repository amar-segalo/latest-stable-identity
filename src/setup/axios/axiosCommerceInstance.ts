import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import * as auth from '../../app/modules/auth/redux/AuthRedux'
import {getUserByToken, logout} from "../../app/modules/auth/redux/AuthCRUD";
import { useDispatch } from 'react-redux';
import {actions} from "../../app/modules/auth/redux/AuthRedux"
import {Link,useSearchParams, useNavigate} from 'react-router-dom'
import { getStorageAccessToken } from '../../app/helpers/helpers';



const axiosCommerceInstance = axios.create({
});

axiosCommerceInstance.defaults.withCredentials = false
axiosCommerceInstance.defaults.headers.Accept = 'application/json'





export default axiosCommerceInstance;

