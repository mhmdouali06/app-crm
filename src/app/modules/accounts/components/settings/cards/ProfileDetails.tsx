import React, {useContext, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {IProfileDetails, profileDetailsInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import FileInput from '../../../../../../_metronic/layout/forms/files/FileInput'
import Input from '../../../../../../_metronic/layout/forms/Inputs/Input'
import {useAuth} from '../../../../auth'
import axios from 'axios'
import {
  ObjectToArrayFormData,
  ObjectToFormData,
} from '../../../../../../_metronic/helpers/function/ObjectToFormData'
import {AppContext} from '../../../../../../AppContext'
const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

const profileDetailsSchema = Yup.object().shape({})

const ProfileDetails: React.FC = () => {
  const {errorToast, successToast} = useContext(AppContext)
  const {currentUser, setCurrentUser} = useAuth()

  const [data, setData] = useState<any>(initialValues)
  // console.log(currentUser?.image_url);

  // useEffect(() => {
  //   setData({
  //     ...data,
  //     image: currentUser?.image_url,
  //   })
  // }, [])

  // const updateData = (fieldsToUpdate: Partial<IProfileDetails>): void => {
  //   const updatedData = Object.assign(data, fieldsToUpdate)
  //   setData(updatedData)
  // }
  // setData({
  //   ...data,
  //   image: data.image_url || blankImg,
  // })
  // const updateProfile= async(data:any)=>{
  //   setData(data)
  // }
  const [intil, setIntil] = useState<any>(currentUser)

  const updateProfile = (data: any): Promise<any> => {
    return axios
      .post(`${process.env.REACT_APP_API_URL2}/api/update_profile/${intil.id}`, data)
      .then((response: any) => response.data)
      .then((response: any) => response.data)
  }

  console.log(currentUser)

  const [loading, setLoading] = useState(false)
  const formik = useFormik<IProfileDetails>({
    initialValues: intil,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const dataTosend = await ObjectToArrayFormData(values)

        const data = await updateProfile(dataTosend)
        if (data) {
          setCurrentUser(data)
        }
        successToast('Profile updated successfully')
      } catch (error: any) {
        errorToast(error.response.data.message)
      } finally {
        setLoading(false)
      }
      setTimeout(() => {
        values.communications.email = data.communications.email
        values.communications.phone = data.communications.phone
        values.allowMarketing = data.allowMarketing
        const updatedData = Object.assign(data, values)
        setData(updatedData)
        setLoading(false)
      }, 1000)
    },
  })
  // useEffect(() => {
  //   formik.values.image = currentUser?.image_url || blankImg
  // }, [currentUser,intil])
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        // role='button'
        // data-bs-toggle='collapse'
        // data-bs-target='#kt_account_profile_details'
        // aria-expanded='true'
        // aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'></h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row my-7 '>
              <div className='col-sm-12 col-md-6 col-lg-6 '>
                <FileInput formik={formik} name='image_url' label='Image' isRequired={true} />
              </div>
            </div>
            <div className='row mb-7 '>
              <div className='col-sm-12 col-md-6 col-lg-6 '>
                <Input
                  type='string'
                  name='first_name'
                  formik={formik}
                  label='Nom'
                  isUserLoading={loading}
                  isRequired={true}
                />
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6 '>
                <Input
                  type='string'
                  name='last_name'
                  formik={formik}
                  label='Prénom'
                  isUserLoading={loading}
                  isRequired={true}
                />
              </div>
            </div>
            <div className='row mb-7 '>
              <div className='col-sm-12 col-md-6 col-lg-6 '>
                <Input
                  type='phone'
                  name='phone'
                  formik={formik}
                  label='Téléphone'
                  isUserLoading={loading}
                  isRequired={true}
                />
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6 '>
                <Input
                  type='email'
                  name='email'
                  formik={formik}
                  label='Email'
                  isUserLoading={loading}
                  isRequired={true}
                />
              </div>
            </div>
            <div className='row mb-7 '>
              <div className='col-sm-12 col-md-6 col-lg-6 '>
                <Input
                  type='password'
                  name='old_password'
                  formik={formik}
                  label='Ancien mot de passe'
                  isUserLoading={loading}
                  isRequired={false}
                />
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6 '>
                <Input
                  type='password'
                  name='new_password'
                  formik={formik}
                  label='Nouveau mot de passe'
                  isUserLoading={loading}
                  isRequired={false}
                />
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && 'Enregistré'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please ...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ProfileDetails}
