/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link,useSearchParams, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import { login,signUpConfirmation} from '../redux/AuthCRUD'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Pogresan format email-a')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email je obavezan'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Lozinka je obavezna'),
})
const initialValues = {
  email: '',
  password: '',
}



export function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmCodeBool, setConfirmCodeBool] = useState(false);
  const [confirmCode, setConfirmCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
     setLoading(true);
      login(values.email, values.password).then(response =>{
          const date = new Date();
         const seconds = Math.floor(date.getTime() / 1000)
          localStorage.setItem('emaq-refreshToken',JSON.stringify(response.data.refreshTokenExpiresIn + seconds))
          setLoading(false);
          localStorage.setItem('session-token',JSON.stringify(response.data));
          dispatch(auth.actions.login(response.data.accessToken));
        }).catch((error) => {
          setLoading(false);
          setSubmitting(false);
        let msg = error.response.data["users.AccessCredentials"][0];
        setStatus(msg);
         
      })
  }})

  const confirmRegistration = () => {
   signUpConfirmation(confirmCode).then(response=>{
     if(response.data == true){
       setHasErrors(false);
        navigate('/');
        setConfirmCodeBool(false);
     }
   })
   
  }

  useEffect(() => {

    var data = {
      confirmCode:searchParams.get("confirmCode"),
    }
    if(data.confirmCode != null ){
    setConfirmCode(data.confirmCode)
    setConfirmCodeBool(true);
    }
  });

  return (
    <>
    {!confirmCodeBool &&
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Prijava</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          Nemate račun?{' '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            Registrujte se
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div>
         
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
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
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Lozinka</label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Zaboravljena lozinka ?
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          placeholder="Lozinka"
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Prijavi se</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        {/* begin::Separator */}
       {/* <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div>*/}
        {/* end::Separator */}

        {/* begin::Google link */}
       { /*<a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className='h-20px me-3'
          />
          Prijavi se putem Google
        </a>
        {/* end::Google link */}

        {/* begin::Google link */}
        {/*<a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
            className='h-20px me-3'
          />
          Prijavi se putem Facebook
          </a>*/}
        {/* end::Google link */}

        {/* begin::Google link */}
       {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
            className='h-20px me-3'
          />
          Prijavi se putem Apple
        </a>*/}
        {/* end::Google link */}
      </div>
      {/* end::Action */}
    </form>
    }

    {confirmCodeBool &&
    <div>
       <div className='text-center mb-10'>
       {/* begin::Title */}
       <h1 className='text-dark mb-3'>Potvrdite vašu registraciju</h1>
       {/* end::Title */}

       {/* begin::Link */}
       <div className='text-gray-400 fw-bold fs-4'>Klikom na dugme Potvrdi potvrđujete vašu registraciju</div>
       {/* end::Link */}
     </div>
     {hasErrors ===false && (
          <div className='mb-lg-15 alert alert-success'>
            <div className='alert-text font-weight-bold'>
              Vaša registracija je potvrđena.
            </div>
          </div>
        )}
     <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
     <Link to='/auth/login'>
     <button
            type='submit'
            onClick={confirmRegistration}
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            <span className='indicator-label'>Potvrdi</span>
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          </Link>
        
     </div>
     </div>
    }
</>

  )
 
}