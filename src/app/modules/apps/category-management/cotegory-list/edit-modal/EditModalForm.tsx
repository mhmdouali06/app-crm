import {FC, useContext, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import { updateCategory,createCategory} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import FileInput from '../../../../../../_metronic/layout/forms/files/FileInput'
import Input from '../../../../../../_metronic/layout/forms/Inputs/Input'
import Textarea from '../../../../../../_metronic/layout/forms/Inputs/Textarea'
import { ObjectToFormData } from '../../../../../../_metronic/helpers/function/ObjectToFormData'
import { ObjectToUrlEncoded } from '../../../../../../_metronic/helpers/function/ObjectToUrlEncoded'
import { AppContext } from '../../../../../../AppContext'

type Props = {
  isUserLoading: boolean
  user: User
}
const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

const editUserSchema = Yup.object().shape({
  description: Yup.string(),
  name: Yup.string()
  .min(3, 'Au moins 3 caractères')
  .max(50, 'Maximum 50 caractères')
  .required('Le nom est requis'),
  // image: Yup.mixed().required('Le fichier est requis'),

})

const EditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {errorToast, successToast} = useContext(AppContext)
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [userForEdit] = useState<User>({
    ...user,
    // avatar: user.avatar || initialUser.avatar,
    // role: user.role || initialUser.role,
    // position: user.position || initialUser.position,
    description:user.description?user.description:' ',
    name: user.name || initialUser.name,
    email: user.email || initialUser.email,
    image:user.image ? user.image_url:blankImg
  })
  

 


  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          
          const  dataToSend= await ObjectToFormData(values)
          await  updateCategory(dataToSend,values.id)
          await successToast("Catégorie mise a jour avec succès");
          await cancel(true)

        } else {
          const dataToSend= await ObjectToFormData(values)
          
           await createCategory(dataToSend)
          await successToast("Catégorie crée avec succès");
          await cancel(true)
         
        }
      } catch (ex:any) {
        if (ex.response && ex.response.data && ex.response.data.error) {
          const detailedError = ex.response.data.error;
          console.error("Detailed Error:", detailedError);
          errorToast(detailedError);
        } else {
          console.error("Generic Error:", ex.message);
          errorToast("An error occurred. Please try again."); 
        }
        
        console.error(ex)
      } finally {
        setSubmitting(true)
      }
    },
  })
  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
     setItemIdForUpdate(undefined)
  }
  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          {/* begin::Input group */}
          <div className='fv-row my-7 '>
          <FileInput formik={formik} name='image' label='Image' isRequired={true}  />        
          </div>
          <div className='fv-row mb-7'>
          <Input type='string' name='name' formik={formik} label='Nom' isUserLoading={isUserLoading} isRequired={true} />   
          </div>
        
          <div className='fv-row mb-7'>
          <Textarea  name='description' formik={formik} label='Description' isUserLoading={isUserLoading}  />   
          </div>

        </div>
    
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Annuler
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Valider</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
