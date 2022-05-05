import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useSearchParams, useNavigate} from 'react-router-dom'
import {Formik, useFormik} from 'formik'
import {updatePersonalInfo} from '../../../services/UserServices'
import {resolve} from 'path'
import {getStorageAccessToken} from '../../../helpers/helpers'
import {logout} from '../../auth/redux/AuthCRUD'
import * as auth from '../../auth/redux/AuthRedux'
import {UserPersonalInformationModel} from '../../auth/models/UserPersonalInfromationModel'
import store from '../../../../setup/redux/Store'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const personalInfoSchema = Yup.object().shape({
  ime: Yup.string()
    .min(2, 'Minimalno 2 karaktera')
    .max(50, 'Maximum 50 symbols')
    .required('Ime je obavezno'),
  prezime: Yup.string()
    .min(3, 'Minimum 3 karaktera')
    .max(50, 'Maximum 50 symbols')
    .required('Lozinka je obavezna'),
  brojTelefona: Yup.string()
    .min(3, 'Minimum 11 brojeva')
    .max(50, 'Maximum 50 symbols')
    .required('Broj telefona je obavezan'),
})

export function PersonalInformation(props: any) {
  const [startDate, setStartDate] = useState(new Date())
  const [image, setImage] = useState(props.data.photoUrl)
  const [formImage, setFormImage] = useState(props.data.photoUrl)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    setImage(props.data.photoUrl)
    setFormImage(props.data.photoUrl)
  }, [])
  console.log(props.data)
  const initialValues = {
    ime: props.data.privateIndividual.firstName,
    prezime: props.data.privateIndividual.lastName,
    brojTelefona: props.data.phone,
  }
  const [imageChanged, setImageChanged] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: personalInfoSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      var personalInfoData = {
        Email: props.data.emailStripped,
        Phone: state,
        File: imageChanged ? formImage : image,
        PrivateIndividual: {
          FirstName: values.ime,
          LastName: values.prezime,
        },
      }

      updatePersonalInfo(personalInfoData, getStorageAccessToken())
        .then((response) => {
          var usr = store.getState()
          if (usr.auth.user) {
            usr.auth.user.username = values.ime + ' ' + values.prezime
            usr.auth.user.photoUrl = imageChanged ? formImage : image
          }
          dispatch(auth.actions.setUser(usr.auth.user!))
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    },
  })

  async function profileImageChange(event: any) {
    var img = URL.createObjectURL(event.target.files[0])
    setImage(img)
    setFormImage(event.target.files[0])
    var convertedImg = await convertToBase64(event.target.files[0])
    setFormImage(convertedImg)
    setImageChanged(true)
  }

  function changePhoneNumber(e: any) {
    console.log(e)
    setState(e)
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div
          className='card-header border-0 cursor-pointer'
          role='button'
          data-bs-toggle='collapse'
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Lični i kontakt podaci</h3>
          </div>
        </div>
        <div id='kt_account_settings_profile_details' className='collapse show'>
          <form
            id='kt_account_profile_details_form'
            className='form'
            onSubmit={formik.handleSubmit}
            noValidate
            encType='multipart/form-data'
          >
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Slika</label>
                <div className='col-lg-8'>
                  <div
                    className='image-input image-input-outline'
                    data-kt-image-input='true'
                    style={{backgroundImage: `url(${image}`}}
                  >
                    <div
                      className='image-input-wrapper w-125px h-125px'
                      style={{backgroundImage: `url(${image}`}}
                    ></div>
                    <label
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='change'
                      data-bs-toggle='tooltip'
                      title='Change avatar'
                    >
                      <i className='bi bi-pencil-fill fs-7'></i>
                      <input
                        type='file'
                        name='avatar'
                        accept='.png, .jpg, .jpeg'
                        onChange={profileImageChange}
                      />
                      <input type='hidden' name='avatar_remove' />
                    </label>
                    <span
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='cancel'
                      data-bs-toggle='tooltip'
                      title='Cancel avatar'
                    >
                      <i className='bi bi-x fs-2'></i>
                    </span>
                    <span
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='remove'
                      data-bs-toggle='tooltip'
                      title='Remove avatar'
                    >
                      <i className='bi bi-x fs-2'></i>
                    </span>
                  </div>
                  <div className='form-text'>Dozvoljeni tip fajla: png, jpg, jpeg.</div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  Ime i prezime
                </label>
                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <input
                        {...formik.getFieldProps('ime')}
                        className={clsx(
                          'form-control form-control-lg form-control-solid  mb-3 mb-lg-0',
                          {'is-invalid': formik.touched.ime && formik.errors.ime},
                          {
                            'is-valid': formik.touched.ime && !formik.errors.ime,
                          }
                        )}
                        type='text'
                        name='ime'
                        autoComplete='off'
                        placeholder='Ime'
                      />
                      {formik.touched.ime && formik.errors.ime && (
                        <div className='fv-plugins-message-container'>
                          <span role='alert'>{formik.errors.ime}</span>
                        </div>
                      )}
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <input
                        placeholder='Prezime'
                        {...formik.getFieldProps('prezime')}
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          {'is-invalid': formik.touched.prezime && formik.errors.prezime},
                          {
                            'is-valid': formik.touched.prezime && !formik.errors.prezime,
                          }
                        )}
                        type='text'
                        name='prezime'
                        autoComplete='off'
                      />
                      {formik.touched.prezime && formik.errors.prezime && (
                        <div className='fv-plugins-message-container'>
                          <span role='alert'>{formik.errors.prezime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  Broj telefona i datum rodjenja
                </label>
                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <PhoneInput
                        inputStyle={{width: '100%'}}
                        buttonStyle={{backgroundColor: '#36b3a2'}}
                        {...formik.getFieldProps('brojTelefona')}
                        inputClass={'form-control form-control-lg form-control-solid'}
                        country={'ba'}
                        regions={['europe']}
                        masks={{ba: '(..) ...-...-.'}}
                        onChange={changePhoneNumber}
                      />
                      {formik.touched.brojTelefona && formik.errors.brojTelefona && (
                        <div className='fv-plugins-message-container'>
                          <span role='alert'>{formik.errors.brojTelefona}</span>
                        </div>
                      )}
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        className={'form-control form-control-lg form-control-solid'}
                      />

                      {formik.touched.prezime && formik.errors.prezime && (
                        <div className='fv-plugins-message-container'>
                          <span role='alert'>{formik.errors.prezime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button type='reset' className='btn btn-light btn-active-light-primary me-2'>
                Otkaži
              </button>
              <button
                type='submit'
                className='btn'
                style={{backgroundColor: '#36b3a2', color: 'white'}}
                id='kt_account_profile_details_submit'
              >
                {!loading && <span className='indicator-label'>Spasi promjene</span>}
                {loading && (
                  <span className='indicator-label'>
                    Pričekajte..
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
