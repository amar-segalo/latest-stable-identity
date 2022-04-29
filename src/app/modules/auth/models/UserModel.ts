import {AuthModel} from './AuthModel'
import {UserAddressModel} from './UserAddressModel'
import {UserCommunicationModel} from './UserCommunicationModel'
import {UserEmailSettingsModel} from './UserEmailSettingsModel'
import {UserSocialNetworksModel} from './UserSocialNetworksModel'

export interface UserModel {
  applicationClientId: string,
  applicationId:string,
  aud:string,
  axp:string,
  cliendId:string,
  email:string,
  exp:number,
  iat:number,
  iss:string,
  nbf:number,
  photoUrl:string,
  rlt:string,
  roleIdList:string,
  rxp:string,
  tenantId:string,
  userId:string,
  username:string
  
}
