import {FC, useContext, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {updateRole, createRole, getPermissions} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import FileInput from '../../../../../../_metronic/layout/forms/files/FileInput'
import Input from '../../../../../../_metronic/layout/forms/Inputs/Input'
import Textarea from '../../../../../../_metronic/layout/forms/Inputs/Textarea'
import {
  ObjectToArrayFormData,
  ObjectToFormData,
} from '../../../../../../_metronic/helpers/function/ObjectToFormData'
import {ObjectToUrlEncoded} from '../../../../../../_metronic/helpers/function/ObjectToUrlEncoded'
import {AppContext} from '../../../../../../AppContext'
import SearshSelectMulti from '../../../../../../_metronic/layout/forms/Inputs/SearshSelectMulti'

type Props = {
  isUserLoading: boolean
  user: User
}
const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

const editUserSchema = Yup.object().shape({
  permissions: Yup.array(),
  name: Yup.string()
    .min(3, 'Au moins 3 caractères')
    .max(50, 'Maximum 50 caractères')
    .required('Le nom est requis'),
  // image: Yup.mixed().required('Le fichier est requis'),
})

const EditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const [permissions, setPermissions] = useState<any>([])
  const {errorToast, successToast} = useContext(AppContext)
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [userForEdit, setUserForEdit] = useState<User>({
    ...user,
    permissions: user.permissions ? user.permissions : [],
    name: user.name || initialUser.name,
  })

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          const dataToSend: any = await ObjectToArrayFormData(values)
          await updateRole(dataToSend, values.id)
          await successToast('Role mise a jour avec succès')
          await cancel(true)
        } else {
          console.log(values)

          const dataToSend: any = await ObjectToArrayFormData(values)
          console.log(dataToSend)

          await createRole(dataToSend)
          await successToast('Role crée avec succès')
          await cancel(true)
        }
      } catch (ex: any) {
        if (ex.response && ex.response.data && ex.response.data.error) {
          const detailedError = ex.response.data.error
          console.error('Detailed Error:', detailedError)
          errorToast(detailedError)
        } else {
          console.error('Generic Error:', ex.message)
          errorToast('An error occurred. Please try again.')
        }

        console.error(ex)
      } finally {
        setSubmitting(true)
      }
    },
  })
  useEffect(() => {
    if (user.permissions) {
      formik.setFieldValue(
        'permissions',
        user.permissions.map((permission: any) => permission.name)
      )
    }
  }, [user.permissions])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }
  const getPermissionsListe = async () => {
    const data: any = await getPermissions('')
    const modifiedData = await data.map((item: any) => ({
      label: item.label,
      value: item.name,
    }))
    setPermissions(modifiedData)
  }

  useEffect(() => {
    getPermissionsListe()
  }, [])
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

          <div className='fv-row mb-7'>
            <Input
              type='string'
              name='name'
              formik={formik}
              label='Nom'
              isUserLoading={isUserLoading}
              isRequired={true}
            />
          </div>

          <div className='fv-row mb-7'>
            <SearshSelectMulti
              options={permissions.length > 0 ? permissions : []}
              name='permissions'
              formik={formik}
              label='Permissions'
              isUserLoading={isUserLoading}
              isRequired={true}
            />
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
