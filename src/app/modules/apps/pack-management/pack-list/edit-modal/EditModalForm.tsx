import {FC, useContext, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {Formik, useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {updatePack, createPack} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import FileInput from '../../../../../../_metronic/layout/forms/files/FileInput'
import Input from '../../../../../../_metronic/layout/forms/Inputs/Input'
import Textarea from '../../../../../../_metronic/layout/forms/Inputs/Textarea'
import {
  ObjectToArrayFormData,
  ObjectToFormData,
} from '../../../../../../_metronic/helpers/function/ObjectToFormData'
import {AppContext} from '../../../../../../AppContext'
import SearshSelect from '../../../../../../_metronic/layout/forms/Inputs/SearshSelect'
import Switch from '../../../../../../_metronic/layout/forms/Inputs/Switch'
import DropZone from '../../../../../../_metronic/layout/forms/files/DropZone'
import {getEventes} from '../../../events-management/events-list/core/_requests'

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
  promotion: Yup.boolean(),
  sold: Yup.number(),
  image: Yup.mixed().required('Le fichier est requis'),
  images: Yup.mixed(),
  price: Yup.number().min(1, 'Le prix doit etre superieur a 0'),
  date_d: Yup.date().required().label('Start Date'),
  date_f: Yup.date()
    .required()
    .label('End Date')
    .min(Yup.ref('date_d'), 'End Date must be after Start Date')
    .typeError('End Date must be a valid datetime format (YYYY-MM-DDTHH:MM)'),
  event: Yup.number().required("L'event est requise"),
  quantity: Yup.number().min(1, 'La quantité doit etre superieur a 0'),
})

const EditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {errorToast, successToast} = useContext(AppContext)
  const [categories, setCategories] = useState<any>([])
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<User>({
    removeFiles: [],
    id: user.id,
    name: user.name ? user.name : '',
    description: user.description ? user.description : '',
    promotion: user.promotion == 1 ? true : user.promotion ? user.promotion : false,
    sold: user.sold ? user.sold : 0,
    price: user.price ? user.price : 0,
    date_d: user.date_d ? user.date_d : '',
    date_f: user.date_f ? user.date_f : '',
    event: user.event ? user.event.id : '',
    quantity: user.quantity ? user.quantity : 0,

    image: user.image ? user.image_url : blankImg,
    images: user.images ? user.images : '',
  })
  //get categories
  const getCategorie = async () => {
    const {data} = await getEventes('')
    if (!data) {
      setCategories([])
      return
    }
    const modifiedData = await data.map((item) => ({
      label: item.name,
      value: item.id,
    }))

    setCategories(modifiedData)
  }
  useEffect(() => {
    getCategorie()
  }, [])

  //formik
  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      const data = {
        ...values,
      }
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          const dataToSend = await ObjectToArrayFormData(data)

          await updatePack(dataToSend, values.id)
          await successToast('Bougie mise a jour avec succès')
          await cancel(true)
        } else {
          const dataToSend = await ObjectToArrayFormData(data)

          await createPack(dataToSend)
          await successToast('Bougie crée avec succès')
          await cancel(true)
        }
      } catch (ex: any) {
        console.log(ex)
        errorToast(ex.message)
        // if (ex.response && ex.response.data && ex.response.data.details) {
        //     const detailedError = ex.response.data.details;
        //     console.error('Detailed Error:', detailedError);

        //     errorToast(detailedError);
        // } else {
        //     console.error('Generic Error:', ex.message);
        //     errorToast(ex.message);
        // }

        console.error(ex)
      } finally {
        setSubmitting(true)
      }
    },
  })
  console.log(formik.errors)

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  //option select variant

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
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
          <div className='row my-7 '>
            <div className='col-sm-12 col-md-6 col-lg-6 '>
              <FileInput formik={formik} name='image' label='Image' isRequired={true} />
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <div className='mb-4'>
                <Input
                  type='string'
                  name='name'
                  formik={formik}
                  label='Nom'
                  isUserLoading={isUserLoading}
                  isRequired={true}
                />
              </div>
              <SearshSelect
                options={categories}
                name='event'
                formik={formik}
                label='Evènement'
                isUserLoading={isUserLoading}
                isRequired={true}
              />
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <DropZone
                formik={formik}
                name='images'
                label='Images secondaires'
                isUserLoading={isUserLoading}
              />
            </div>

            <div className='row mb-4 pe-0 my-5'>
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <Input
                  type='string'
                  name='price'
                  formik={formik}
                  label='Prix'
                  isUserLoading={isUserLoading}
                />
              </div>
              <div className='col-lg-6 col-md-12 col-sm-12 pe-0'>
                <Input
                  type='number'
                  name='quantity'
                  formik={formik}
                  label='Quantité'
                  isUserLoading={isUserLoading}
                />
              </div>
            </div>
          </div>
          <div className='fv-row mb-7'>
            <Switch
              name='promotion'
              formik={formik}
              label='Promotion'
              isUserLoading={isUserLoading}
            />
          </div>
          {formik.values.promotion ? (
            <div className='row mb-7'>
              <div className='col-lg-6 col-md-12 col-sm-12 pe-0'>
                <Input
                  type='datetime-local'
                  name='date_d'
                  formik={formik}
                  label='Date debut'
                  isUserLoading={isUserLoading}
                />
              </div>
              <div className='col-lg-6 col-md-12 col-sm-12 pe-0'>
                <Input
                  type='datetime-local'
                  name='date_f'
                  formik={formik}
                  label='Date fin'
                  isUserLoading={isUserLoading}
                />
              </div>
            </div>
          ) : (
            <div className='fv-row mb-7'>
              <Input
                type='number'
                name='sold'
                formik={formik}
                label='Sold'
                isUserLoading={isUserLoading}
              />
            </div>
          )}

          <div className='fv-row mb-7'>
            <Textarea
              name='description'
              formik={formik}
              label='Description'
              isUserLoading={isUserLoading}
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
            // disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
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
