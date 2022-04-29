import React, {useState, useEffect} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useSearchParams, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword, resetPassword} from '../redux/AuthCRUD'
import { idText } from 'typescript'

const initialValues = {
  email: '',
  password:'',
  confirmPassword:''
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Pogresan format email-a')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})
const forgotPasswordSchema2 = Yup.object().shape({
  password: Yup.string()
  .min(3, 'Minimum 3 symbols')
  .max(50, 'Maximum 50 symbols')
  .required('Lozinka je obavezna'),
  confirmPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Lozinka je obavezna')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Lozinke se ne podudaraju"),
    }),
   
})

export function ForgotPassword() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetPasswordBool, setResetPasswordBool] = useState(false);
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
          requestPassword(values.email)
          .then(({data: {result}}) => {
            setHasErrors(false)
            setLoading(false)
          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })         
        }
  })
  
  const formik2 = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema2,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
         resetPassword(email,code,values.password,values.confirmPassword)
          .then(({data: {result}}) => {
              setHasErrors(false);
              setLoading(false);
                navigate('/auth/login')
          })
          .catch((error) => {
            setLoading(false)
            setResetPasswordBool(false);
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })      
    },
    
  })

   useEffect(() => {
    var data = {
      email:searchParams.get("email"),
      code:searchParams.get("code")
    }
    if(data.email != null && data.code != null){
      setEmail(data.email);
      setCode(data.code);
      setResetPasswordBool(true);
    }
  });

  return (
    <>
    {!resetPasswordBool && 
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Da li ste zaboravili lozinku ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>Unesite vaš email da bi ste resetovali password.</div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Doslo je do greske, pokušajte ponovo.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>Link za resetovanje lozinke je poslan. Provjerite vaš email</div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
          <input
            type='email'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            {!loading && 
           ( <span className='indicator-label'>Pošalji</span>)}
            {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Poništi
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    }

    {resetPasswordBool && 
    
    <form
    className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
    noValidate
    id='kt_login_password_reset_form'
    onSubmit={formik2.handleSubmit}
  >
    <div className='text-center mb-10'>
      {/* begin::Title */}
      <h1 className='text-dark mb-3'>Unesite novu lozinku</h1>
      {/* end::Title */}

      {/* begin::Link */}
      {/* end::Link */}
    </div>

    {/* begin::Title */}
    {hasErrors === true && (
      <div className='mb-lg-15 alert alert-danger'>
        <div className='alert-text font-weight-bold'>
         Doslo je do greske, pokušajte ponovo.
        </div>
      </div>
    )}

    {hasErrors === false && (
      <div className='mb-10 bg-light-info p-8 rounded'>
        <div className='text-info'>Uspješno ste promijenili vašu lozinku.</div>
      </div>
    )}
    {/* end::Title */}

    {/* begin::Form group */}
    <div className='fv-row mb-10'>
      <label className='form-label fw-bolder text-gray-900 fs-6'>Lozinka</label>
      <input
        type='password'
        placeholder=''
        autoComplete='off'
        {...formik2.getFieldProps('password')}
        className={clsx(
          'form-control form-control-lg form-control-solid',
          {'is-invalid': formik2.touched.password && formik2.errors.password},
          {
            'is-valid': formik2.touched.password && !formik2.errors.password,
          }
        )}
      />
      {formik2.touched.password && formik2.errors.password && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik2.errors.password}</span>
          </div>
        </div>
      )}
    </div>
    {/* end::Form group */}

    <div className='fv-row mb-10'>
      <label className='form-label fw-bolder text-gray-900 fs-6'>Potvrdi lozinku</label>
      <input
        type='password'
        placeholder=''
        autoComplete='off'
        {...formik2.getFieldProps('confirmPassword')}
        className={clsx(
          'form-control form-control-lg form-control-solid',
          {'is-invalid': formik2.touched.confirmPassword && formik2.errors.confirmPassword},
          {
            'is-valid': formik2.touched.confirmPassword && !formik2.errors.confirmPassword,
          }
        )}
      />
      {formik2.touched.confirmPassword && formik2.errors.confirmPassword && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik2.errors.confirmPassword}</span>
          </div>
        </div>
      )}
    </div>

    {/* begin::Form group */}
    <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
      <button
        type='submit'
        id='kt_password_reset_submit'
        className='btn btn-lg btn-primary fw-bolder me-4'
      >
        {!loading && (<span className='indicator-label'>Spremi</span>)}
        {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
      </button>
      <Link to='/auth/login'>
        <button
          type='button'
          id='kt_login_password_reset_form_cancel_button'
          className='btn btn-lg btn-light-primary fw-bolder'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Poništi
        </button>
      </Link>{' '}
    </div>
    {/* end::Form group */}
  </form>
    
    
    }
</>

  )
}
