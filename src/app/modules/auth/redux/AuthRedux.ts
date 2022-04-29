import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {put, takeLatest, select} from 'redux-saga/effects'
import {UserModel} from '../models/UserModel'
import {getUserByToken, logout} from "./AuthCRUD";
import jwtDecode from 'jwt-decode'
import { getStorageAccessToken } from '../../../helpers/helpers'
import { stat } from 'fs'


export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
  SetUser: '[Set User] Action',
  UpdateUserPersonal:'[UpdateUserPersonal] Action'
}

const initialAuthState: IAuthState = {
  user: undefined,
  accessToken: undefined,
}

export interface IAuthState {
  user?: UserModel
  accessToken?: string
 
}


export const reducer = persistReducer(
 
  {storage, key: 'emaq-usersession', whitelist: ['user', 'accessToken']},
  (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
    switch (action.type) {
      case actionTypes.Login: {
        const accessToken = action.payload?.accessToken
        let user;
        if(accessToken != null){
          var decoded:UserModel = jwtDecode(accessToken);
           return {accessToken, user: decoded}
        }
        return {accessToken, user: user}
      }
      case actionTypes.Register: {
        const accessToken = action.payload?.accessToken
        let user;
        if(accessToken != null){
          var decoded:UserModel = jwtDecode(accessToken);
        
           return {accessToken, user: decoded}
        }
        return {accessToken, user: user}
      }
      case actionTypes.Logout: {
          logout(getStorageAccessToken()).then(response =>{
          })
          localStorage.removeItem('emaq-refreshToken');
          localStorage.removeItem('persist:emaq-usersession');
        return initialAuthState
      }

      case actionTypes.UserLoaded: {
        const user = action.payload?.user
     
        return {...state, user}
      }

      case actionTypes.SetUser: {
       const user = action.payload?.user
   
        console.log(user,"setUser")
        return {...state, user}
      }
      case actionTypes.UpdateUserPersonal:{
        return state;
      }


      default:
        return state
    }
  }
)

export const actions = {
  login: (accessToken: string) => ({type: actionTypes.Login, payload: {accessToken}}),
  register: (accessToken: string) => ({
    type: actionTypes.Register,
    payload: {accessToken},
  }),
  logout: () => ({type: actionTypes.Logout}),
  requestUser: () => ({
    type: actionTypes.UserRequested,
  }),
  fulfillUser: (user: UserModel) => ({type: actionTypes.UserLoaded, payload: {user}}),
  setUser: (user: UserModel) => ({type: actionTypes.SetUser, payload: {user}}),
  UpdateUserPersonal:(obj:any) =>({type:actionTypes.UpdateUserPersonal,payload:{obj}})
}

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.UpdateUserPersonal, function* registerSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    // @ts-ignore
    const getToken = (state) => state.auth.accessToken;
    // @ts-ignore
    let token = yield select(getToken)
    const user:UserModel = yield getUserByToken(token)
    yield put(actions.fulfillUser(user))
  })
}
