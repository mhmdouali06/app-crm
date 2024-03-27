import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup'

import { User } from '../../core/_models';
import { updatePack } from '../../core/_requests';
import { ObjectToArrayFormData } from '../../../../../../../_metronic/helpers/function/ObjectToFormData';
import { AppContext } from '../../../../../../../AppContext';
import Input from '../../../../../../../_metronic/layout/forms/Inputs/Input';

type Props = {
  variantes: any;
  id: number;
};
const editUserSchema = Yup.object().shape({
  
  smallPrice: Yup.number().min(1, 'Le prix doit etre superieur a 0'),
  mediumPrice: Yup.number().min(1, 'Le prix doit etre superieur a 0'),
  grandePrice: Yup.number().min(1, 'Le prix doit etre superieur a 0'),
  smallQuantity: Yup.number().min(1, 'La quantité doit etre superieur a 0'),
  mediumQuantity: Yup.number().min(1, 'La quantité doit etre superieur a 0'),
  grandeQuantity: Yup.number().min(1, 'La quantité doit etre superieur a 0'),
  
  // image: Yup.mixed().required('Le fichier est requis'),

})
const ListeVariant: React.FC<Props> = ({ variantes, id }) => {
  const refButtonCloseModel=React.useRef<any>(null)
  const {successToast, errorToast} = React.useContext(AppContext)
  const [userForEdit] = useState <User>({
    
    
  })

  const formik = useFormik ({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {

      
      const variantss = [
        {
          quantity:0,
          price: 0,
          id:  '',
          // id: variantes && variantes[0]?.id ? variantes[0]?.id : '',
          size: "S"
        },
        
      ];
      

      setSubmitting(true)
      try {
        
        const  dataToSend= await ObjectToArrayFormData ({variants:variantss})
                  
          await  updatePack (dataToSend,id)
          await successToast("Bougie mise a jour avec succès");
          if(refButtonCloseModel.current){
            refButtonCloseModel.current.click()
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
  return (
    <div>
      <button
        type="button"
        className="btn btn-icon btn-light-primary btn-sm"
        data-bs-toggle="modal"
        data-bs-target={`#modal_${id}`}
      >
        <i className='bi bi-eye-fill fs-4'></i>
      </button>
      <form onSubmit={formik.handleSubmit} className='form' noValidate>


      <div className="modal fade" id={`modal_${id}`} tabIndex={-1} aria-labelledby={`#modal_${id}`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`modal_label${id}`}>
             Liste des tailles
              </h5>
              <button type="button" className="btn-close" ref={refButtonCloseModel} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <table className='table text-center '>
              <thead className='table table-bordered'>
                <tr>
                  <th scope='col'>Taille</th>
                  <th scope='col'>Quantite</th>
                  <th scope='col'>Prix</th>
                </tr>
              </thead>
              <tbody className='table text-center vertical-align-middle '>
                {variantes?.map((variant:any , index:number) => (
                  <tr key={index}>
                    <td  scope={'row'} style={{verticalAlign: 'middle' }}>{variant.size =='S' ? 'Petite' : variant.size =='M' ? 'Moyenne' : 'Grande'} </td>
                    <td>
                    <Input type='string' name={variant.size==='S' ? 'smallQuantity' : variant.size==='M' ? 'mediumQuantity' : 'grandeQuantity'} formik={formik}   isUserLoading={false}  />   
                    </td>
                    <td>  <Input type='string' name={variant.size==='S' ? 'smallPrice' : variant.size==='M' ? 'mediumPrice' : 'grandePrice'} formik={formik}   isUserLoading={false}  />   </td>
                  </tr>
                ))}
              </tbody>
            </table>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Annuler
              </button>
              <button type="submit" className="btn btn-primary" data-kt-users-modal-action='submit'>
   Valider
</button>

            </div>
          </div>
        </div>
      </div>
      </form>

    </div>
  );
};

export default ListeVariant;
