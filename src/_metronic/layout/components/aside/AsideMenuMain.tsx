/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import jwtDecode from 'jwt-decode'
import { getUserApplications } from '../../../../app/services/ApplicationServices'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStorageAccessToken } from '../../../../app/helpers/helpers'


export function AsideMenuMain() {
  const intl = useIntl()
  const [apps,setApps] = useState([])
  const [hasApps, setHasApps] = useState(false);
  useEffect(()=>{
      getUserApplications(getStorageAccessToken()).then(response=>{
        if(response.data.resultList != null){
          setApps(response.data.resultList) 
          setHasApps(true);
        }
        else setHasApps(false);
      })
  },[])
  
  return (
    <>
{hasApps && apps.map((app:any)=>{
  return <AsideMenuItem
  key={app.id}
  to={app.redirectUrl}
  title={app.name}
  icon={toAbsoluteUrl('/media/logos/app-icon.png')}
  ></AsideMenuItem>
})
}

{!hasApps &&  
  <p>Aplikacije se ucitavaju!</p>
}
  </>
  )
}

