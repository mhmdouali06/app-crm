import {FC, useContext, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {updateProduct, createProduct} from '../core/_requests'
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
import SearshSelect from '../../../../../../_metronic/layout/forms/Inputs/SearshSelect'
import {useQueryResponseData} from '../../../category-management/cotegory-list/core/QueryResponseProvider'
import {getCategories} from '../../../category-management/cotegory-list/core/_requests'
import Switch from '../../../../../../_metronic/layout/forms/Inputs/Switch'
import DropZone from '../../../../../../_metronic/layout/forms/files/DropZone'
import ColorZone from '../../../../../../_metronic/layout/forms/Inputs/ColorZone'
import SearshSelectMulti from '../../../../../../_metronic/layout/forms/Inputs/SearshSelectMulti'
import {getColors} from '../../../color-management/color-list/core/_requests'

type Props = {
  isUserLoading: boolean
  user: User
}
const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

const editUserSchema = Yup.object().shape({
  colors: Yup.array().required('La couleur est requise'),
  categories: Yup.array().required('la categories est requise'),
  images: Yup.array().required('Le fichier est requis'),
  description: Yup.string(),
  name: Yup.string()
    .min(3, 'Au moins 3 caractères')
    .max(50, 'Maximum 50 caractères')
    .required('Le nom est requis'),
  // category: Yup.number().required('La categorie est requise'),
  image: Yup.mixed().required('Le fichier est requis'),
  price: Yup.number().min(1, 'Le prix doit etre superieur a 0'),
  smallPrice: Yup.number()
    .min(1, 'Le prix doit etre superieur a 0')
    .required('Le prix doit etre superieur a 0'),
  mediumPrice: Yup.number().min(1, 'Le prix doit etre superieur a 0'),
  grandePrice: Yup.number().min(1, 'Le prix doit etre superieur a 0'),
  smallQuantity: Yup.number()
    .min(1, 'La quantité doit etre superieur a 0')
    .required('La quantité doit etre superieur a 0'),
  mediumQuantity: Yup.number().min(1, 'La quantité doit etre superieur a 0'),
  grandeQuantity: Yup.number().min(1, 'La quantité doit etre superieur a 0'),
  quantity: Yup.number().min(1, 'La quantité doit etre superieur a 0'),

  // image: Yup.mixed().required('Le fichier est requis'),
})

const EditModalForm: FC<Props> = ({user, isUserLoading}) => {  
  const {errorToast, successToast} = useContext(AppContext)
  const [categories, setCategories] = useState<any>([])
  const [colors, setColors] = useState<any>([])

  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    colors: user.colors ? user.colors : '',
    categories: user.categories ? user.categories : '',
    removeFiles: [],
    id: user.id,
    image: user.image ? user.image_url : blankImg,
    images: user.images ? user.images : '',
    name: user.name ? user.name : '',
    category: user.category ? user.category.id : '',
    smallQuantity: user.variants ? user.variants[0].quantity : '',
    smallPrice: user.variants ? user.variants[0].price : '',
    mediumQuantity: user.variants ? user.variants[1].quantity : '',
    mediumPrice: user.variants ? user.variants[1].price : '',
    grandeQuantity: user.variants ? user.variants[2].quantity : '',
    grandePrice: user.variants ? user.variants[2].price : '',
    display: user?.display == '1' ? true : false,
    dsiplayBy: user?.dsiplayBy == '1' ? true : false,
    description: user.description ? user.description : '',
  })
  console.log(userForEdit);
  
  useEffect(() => {
    let listeColors:any = []
    let listCategories:any = []
    if(userForEdit.colors[0]?.id){
      userForEdit.colors.map((color:any) => {
        
        listeColors.push(color.id)
      })
      userForEdit.colors = listeColors
    }
    if(userForEdit.categories[0]?.id){
      userForEdit.categories.map((category:any) => {
        listCategories.push(category.id)
      })
      userForEdit.categories = listCategories

    }
  },[])
  console.log("after edit", userForEdit);
  
  //get categories
  const getCategorie = async () => {
    const {data} = await getCategories('items=all')
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
  const getColorss = async () => {
    const {data} = await getColors('items=all' )
    if (!data) {
      setColors([])
      return
    } else {
      const modifiedData = await data.map((item) => ({
        label: item.name,
        value: item.id,
      }))
      setColors(modifiedData)
    }
  }
  useEffect(() => {
    getColorss()
    getCategorie()
  }, [])

  //formik
  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      const variants = [
        {
          quantity: values.smallQuantity,
          price: values.smallPrice,
          id: user.variants && user.variants[0]?.id ? user.variants[0]?.id : '',
          size: 'S',
        },
        {
          quantity: values.mediumQuantity,
          price: values.mediumPrice,
          id: user.variants && user.variants[1]?.id ? user.variants[1]?.id : '',
          size: 'M',
        },
        {
          quantity: values.grandeQuantity,
          price: values.grandePrice,
          id: user.variants && user.variants[2]?.id ? user.variants[2]?.id : '',
          size: 'G',
        },
      ]
      let listeCategorys:any = []
      let listeColors:any = []
      values.colors.map((item:any) => {
        listeColors.push({id: item})
      })

      values.categories.map((item:any) => {
        listeCategorys.push({id: item })
      })
      const data = {
        ...values,
        variants,
        colors: listeColors,
        categories: listeCategorys,
      }
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          const dataToSend = await ObjectToArrayFormData(data)

          await updateProduct(dataToSend, values.id)
          await successToast('Bougie mise a jour avec succès')
          await cancel(true)
        } else {
          
          const dataToSend = await ObjectToArrayFormData(data)
          
          await createProduct(dataToSend)
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
              {/* <SearshSelect
                options={categories}
                name='category'
                formik={formik}
                label='Parfum'
                isUserLoading={isUserLoading}
                isRequired={true}
              /> */}

              <SearshSelectMulti
                options={categories}
                name='categories'
                formik={formik}
                label='Parfum'
                isUserLoading={isUserLoading}
                isRequired={true}
              />
            </div>
          </div>
          <div className='row mb-4'>
            <SearshSelectMulti
              options={colors.length > 0 ? colors : []}
              name='colors'
              formik={formik}
              label='Couleurs'
              isUserLoading={isUserLoading}
              isRequired={true}
            />
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

            <div className='row mb-4 pe-0'>
              <label
                htmlFor='smallVariant'
                className='form-label fw-bold fs-6 border-top pt-3 mb-4'
              >
                Petite taille
              </label>
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <Input
                  type='string'
                  name='smallPrice'
                  formik={formik}
                  label='Prix'
                  isUserLoading={isUserLoading}
                />
              </div>
              <div className='col-lg-6 col-md-12 col-sm-12 pe-0'>
                <Input
                  type='number'
                  name='smallQuantity'
                  formik={formik}
                  label='Quantité'
                  isUserLoading={isUserLoading}
                />
              </div>
            </div>
            <div className='row mb-4 pe-0'>
              <label
                htmlFor='smallVariant'
                className='form-label fw-bold fs-6 border-top pt-3 mb-4'
              >
                Moyenne taille{' '}
              </label>
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <Input
                  type='string'
                  name='mediumPrice'
                  formik={formik}
                  label='Prix'
                  isUserLoading={isUserLoading}
                />
              </div>
              <div className='col-lg-6 col-md-12 col-sm-12 pe-0'>
                <Input
                  type='number'
                  name='mediumQuantity'
                  formik={formik}
                  label='Quantité'
                  isUserLoading={isUserLoading}
                />
              </div>
            </div>
            <div className='row mb-4 pe-0'>
              <label
                htmlFor='smallVariant'
                className='form-label fw-bold fs-6 border-top pt-3 mb-4'
              >
                Grande taille{' '}
              </label>
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <Input
                  type='string'
                  name='grandePrice'
                  formik={formik}
                  label='Prix'
                  isUserLoading={isUserLoading}
                />
              </div>
              <div className='col-lg-6 col-md-12 col-sm-12 pe-0'>
                <Input
                  type='number'
                  name='grandeQuantity'
                  formik={formik}
                  label='Quantité'
                  isUserLoading={isUserLoading}
                />
              </div>
            </div>
          </div>
          <div className='fv-row mb-7'>
            <Textarea
              name='description'
              formik={formik}
              label='Description'
              isUserLoading={isUserLoading}
            />
          </div>
          <div className='fv-row mb-7'>
            <Switch
              name='display'
              formik={formik}
              label='Afficher '
              isUserLoading={isUserLoading}
            />
          </div>
          <div className='fv-row mb-7'>
            <Switch
              name='dsiplayBy'
              formik={formik}
              label='Ventes'
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
