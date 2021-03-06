import clsx from "clsx";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { addAddress, getCities, getCountries } from "../../../services/AddressesServices";


const addressesSchema = Yup.object().shape({
  streetName: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 20 symbols')
      .required('Ulica je obavezna'),
      streetNumber: Yup.string()
      .min(1, 'Minimum 1 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Broj je obavezan'),
      city: Yup.string()
      .required('Grad je obavezan'),
      country: Yup.string()
      .required('Grad je obavezan'),
      zipPostalCode: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Zip je obavezan'),
      addressType: Yup.string()
      .required('Tip je obavezan'),
  })
  
  

export function AddAddress(props:any){
  const [hasLift, setHasLift] = useState(false)
  const [isDefault, setIsDefault] = useState(false)
    const [showForm, setShowForm] = useState(true);
    const [cities, setCities] = useState([
      {
        id:0,
        name:"",
        countryId:0
      }
    ])
    const [countries, setCountries] = useState([
      {
        id:0,
        name:""
      }
    ])
  var initialValues = {
    streetName:"",
    streetNumber:"",
    floor:"",
    country:"",
  city:"",
  zipPostalCode:"",
  addressType:"",
  hasLift:"",
  }

    const formik = useFormik({
      initialValues,
      enableReinitialize: true,
        validationSchema: addressesSchema,
        onSubmit: (values, {setStatus, setSubmitting,resetForm}) => {
          var address = {
            streetName:values.streetName,
            streetNumber:values.streetNumber,
            zipPostalCode:values.zipPostalCode,
            addressType:values.addressType,
            extUserId:1,
            cityId:values.city,
            countryId:values.country,
            isDefault:isDefault,
            floor:values.floor,
            hasLift:hasLift
          }
          setIsDefault(false);
          setHasLift(false);
          resetForm();
          addAddress(address).then(response=>{
          props.addressHandler()
          }).catch(err=>{
            console.log(err)
          })
        }

      })
 useEffect(()=>{
   getCountries().then(response=>{
     setCountries(response.data.resultList)
   }).catch(err =>{
     console.log(err);
   })
  getCities().then(response=>{
    setCities(response.data.resultList)
  }).catch(err =>{
    console.log(err);
  })
 },[])


    return (
        <>
        <div className="col-12">
    <form className="form" onSubmit={formik.handleSubmit}>
        <div className="card-body">
            <div id="kt_repeater_1">
                <div className="form-group row" id="kt_repeater_1">
                    <div data-repeater-list="" className="col-lg-12">
                        <div data-repeater-item className="form-group row align-items-center">

                        <div className="col-md-2">
                                <select
                                 {...formik.getFieldProps('addressType')}
                                 className={clsx(
                                   'form-select form-control-lg form-control-solid',
                                   {'is-invalid': formik.touched.addressType && formik.errors.addressType},
                                   {
                                     'is-valid': formik.touched.addressType && !formik.errors.addressType,
                                   }
                                 )} 
                                 name="addressType"
                                  id="addressType"
                                   placeholder="Type">
                                   <option value="" disabled  hidden>Tip adrese</option>
                                    <option value="1">Ku??a</option>
                                    <option value="2">Posao</option>
                                    <option value="3">Ostalo</option>
                                </select>
                                <div className="d-md-none mb-2"></div>
                            </div>


                           
                            <div className="col-md-3">
                            <select
                                 {...formik.getFieldProps('country')}
                                 className={clsx(
                                   'form-select form-control-lg form-control-solid',
                                   {'is-invalid': formik.touched.country && formik.errors.country},
                                   {
                                     'is-valid': formik.touched.country && !formik.errors.country,
                                   }
                                 )} 
                                 name="country"
                                  id="country"
                                   placeholder="Country">
                                   <option defaultValue="" disabled  hidden>Drzava</option>
                                     {countries.map((country,key)=>{
                                   return <option key={country.id} value={country.id}>{country.name}</option>
                                     })}
                                   
                                </select>
                            </div>
                            <div className="col-md-2 mt-2 mt-md-0">
                            <select
                                 {...formik.getFieldProps('city')}
                                 className={clsx(
                                   'form-select form-control-lg form-control-solid',
                                   {'is-invalid': formik.touched.city && formik.errors.city},
                                   {
                                     'is-valid': formik.touched.city && !formik.errors.city,
                                   }
                                 )} 
                                 name="city"
                                  id="city"
                                   placeholder="City">
                                   <option defaultValue="" disabled  hidden>Grad</option>
                                     {cities.map((city,key)=>{
                                   return <option key={city.id} value={city.id}>{city.name}</option>
                                     })}
                                   
                                </select>
                            </div>
                            <div className="col-md-2 mt-2 mt-md-0">
                                <input
                                 {...formik.getFieldProps('zipPostalCode')}
                                 className={clsx(
                                   'form-control form-control-lg form-control-solid',
                                   {'is-invalid': formik.touched.zipPostalCode && formik.errors.zipPostalCode},
                                   {
                                     'is-valid': formik.touched.zipPostalCode && !formik.errors.zipPostalCode,
                                   }
                                 )} 
                                 type="text" 
                                 name="zipPostalCode"
                                 placeholder="ZIP"/>
                                <div className="d-md-none mb-2"></div>
                            </div>
                         
                            <div className="col-md-3">
                                <input
                                 {...formik.getFieldProps('streetName')}
                                 className={clsx(
                                   'form-control form-control-lg form-control-solid',
                                   {'is-invalid': formik.touched.streetName && formik.errors.streetName},
                                   {
                                     'is-valid': formik.touched.streetName && !formik.errors.streetName,
                                   }
                                 )} 
                                type="text"
                                name="streetName" 
                                placeholder="Ulica"/>
                                <div className="d-md-none mb-2"></div>
                            </div>
                         
                            </div>
                            <div data-repeater-item className="form-group row align-items-center mt-0 mt-lg-5">
                          

                            <div className="col-md-2">
                                <input 
                                 {...formik.getFieldProps('streetNumber')}
                                 className={clsx(
                                   'form-control form-control-lg form-control-solid',
                                   {'is-invalid': formik.touched.streetNumber && formik.errors.streetNumber},
                                   {
                                     'is-valid': formik.touched.streetNumber && !formik.errors.streetNumber,
                                   }
                                 )} 
                                type="number" 
                                name="streetNumber"
                                 placeholder="Br."/>
                                <div className="d-md-none mb-2"></div>
                            </div>
                        

                            <div className="col-md-2">
                                <input 
                                 {...formik.getFieldProps('floor')}
                                 className={clsx(
                                   'form-control form-control-lg form-control-solid',
                                   {'is-invalid': formik.touched.floor && formik.errors.floor},
                                   {
                                     'is-valid': formik.touched.floor && !formik.errors.floor,
                                   }
                                 )} 
                                type="number" 
                                name="floor"
                                 placeholder="Sprat"/>
                                <div className="d-md-none mb-2"></div>
                            </div>


                            <div className="col-md-1 btn-group mt-1 mt-md-0">
                            <div className="form-check">
                          <input {...formik.getFieldProps('hasLift')} className="form-check-input" checked={hasLift} onClick={()=> hasLift==true ? setHasLift(false): setHasLift(true) } type="checkbox"  id="lift" />
                          <label className="form-check-label" htmlFor="lift">
                            Lift
                           </label>
                               </div>
                            </div>
                            <div className="col-md-4 btn-group mt-2 mt-md-0">
                            <div className="form-check">
                          <input {...formik.getFieldProps('isDefault')} className="form-check-input" type="checkbox" checked={isDefault} onClick={()=> isDefault==true ? setIsDefault(false) : setIsDefault(true) }  id="default" />
                          <label className="form-check-label" htmlFor="default">
                            Primarna adresa
                           </label>
                               </div>
                            </div>
                            <div className="col-md-3 btn-group mt-5 mt-md-0 ">
                            <button onClick={()=> formik.resetForm()} type="button"  className="btn btn-sm font-weight-bolder btn-light-danger">
                                    <i className="la la-trash-o"></i>O??isti
                           </button>
                                <button type='submit' className="btn btn-sm font-weight-bolder btn-light-success">
                                    <i className="la la-check"></i>Spasi
                                </button>
                             
                                </div>
                            </div>
                        </div>

                </div>
            </div>
               
        </div>
                
    </form>
</div>
        </>
    )

}