/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link,useSearchParams, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import { updateSecurityInformation } from '../../../services/UserServices'
import { getStorageAccessToken } from '../../../helpers/helpers'
import { RootState } from '../../../../setup'
import { UserModel } from '../../auth/models/UserModel'

const SecurityInformationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Pogresan format email-a')
    .min(3, 'Minimalno 3 karaktera')
    .max(30, 'Maksimalno 30 karaktera')
    .required('Email je obavezan'),
      password: Yup.string()
      .min(3, 'Minimalno 3 karaktera')
      .max(15, 'Maksimalno 15 karaktera')
      .required('Lozinka je obavezna'),
      passwordConfirmation: Yup.string()
      .required('Potvrda lozinke je obavezna')
      .when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref('password')], "Lozinke se ne podudaraju"),
        })
  })

  

export function SecurityInformation(){
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
    const initialValues = {
        email: user.email,
        password:'',
        passwordConfirmation:''
      } 
  const [loading, setLoading] = useState(false)
     
    const formik = useFormik({
        initialValues,
        validationSchema: SecurityInformationSchema,
        onSubmit:  async (values, {setStatus, setSubmitting}) => {
         setLoading(true);
         updateSecurityInformation(values, getStorageAccessToken() ).then(response =>{
           console.log(response);
            setLoading(false);
          }).catch((error) => {
             console.log(error);
             setLoading(false);
           
        })
}
})
    return (
        <div className="card mb-5 mb-xl-10">
        <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
            <div className="card-title m-0">
                <h3 className="fw-bolder m-0">Detalji</h3>
            </div>
        </div>
        <div id="kt_account_settings_profile_details" className="collapse show">
            <form id="kt_account_profile_security_form" className="form" onSubmit={formik.handleSubmit}
          noValidate encType='multipart/form-data'>
                <div className="card-body border-top p-9">
                
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-bold fs-6">
                            <span className="required">Email</span>
                            <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input   placeholder='Email'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {'is-invalid': formik.touched.email && formik.errors.email},
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
              type='email'
              name='email'
              autoComplete='off' />
                {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            )}
                        </div>
                    </div>

                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-bold fs-6">
                            <span className="required">Lozinka</span>
                            <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input   placeholder='Lozinka'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {'is-invalid': formik.touched.password && formik.errors.password},
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
              type='password'
              name='password'
              autoComplete='off' />
                {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            )}
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-bold fs-6">
                            <span className="required">Potvrdi lozinku</span>
                            <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input   placeholder='Potvrdi lozinku'
              {...formik.getFieldProps('confirmPassword')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {'is-invalid': formik.touched.passwordConfirmation && formik.errors.passwordConfirmation},
                {
                  'is-valid': formik.touched.passwordConfirmation && !formik.errors.passwordConfirmation,
                }
              )}
              type='password'
              name='passwordConfirmation'
              autoComplete='off' />
                {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.passwordConfirmation}</span>
              </div>
            )}
                        </div>
                    </div>
                
            
                </div>
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                    <button type="reset" className="btn btn-light btn-active-light-primary me-2">Otkaži</button>
                    <button type="submit" className="btn btn-primary" id="kt_account_profile_security_submit">{ !loading && <span className='indicator-label'>Spasi promjene</span>}
            {loading && (
             <span className='indicator-label'>
                Pričekajte..
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}</button>
                </div>
            </form>
        </div>
    </div>
    )
}