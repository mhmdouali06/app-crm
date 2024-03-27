import React from 'react'
import { KTSVG } from '../../../../../../../_metronic/helpers';
import { useQueryResponse } from '../../core/QueryResponseProvider';
import { updateStatusOrder } from '../../core/_requests';
import { object } from 'yup';
import { ObjectToFormData } from '../../../../../../../_metronic/helpers/function/ObjectToFormData';
type Props={
    id:number
}
const  ChangeStatus:React.FC<Props>=({id})=> {
const {refetch} = useQueryResponse()
const updateStatus = async (status: string) => {
    const data: any = ObjectToFormData({ status: status });
    const res = await updateStatusOrder(data, id);
    await refetch()

     
  };
  
  return (
    <div>  <>
    <a
      className='d-flex btn btn-light btn-active-light-primary btn-sm'
      data-kt-menu-trigger='click'
      data-kt-menu-placement='bottom-end'
    >
      status
      <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 m-0' />
    </a>
   
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
      data-kt-menu='true'
    >
   
      <div className='menu-item px-3'>
        <a className='menu-link px-3' onClick={()=>{updateStatus('En cours')}} >
        En cours
        </a>
      </div>
      <div className='menu-item px-3'>
        <a className='menu-link px-3'  onClick={()=>{updateStatus('En livraison')}}>
        En livraison
        </a>
      </div>
  
      <div className='menu-item px-3'>
        <a
          className='menu-link px-3'
          data-kt-users-table-filter='delete_row' onClick={()=>{updateStatus('Livré')}}
                  >
          Livré
        </a>
      </div>
      <div className='menu-item px-3'>
        <a
          className='menu-link px-3'
          data-kt-users-table-filter='delete_row' onClick={()=>{updateStatus(' Annuler')}} >
          Annuler
        </a>
      </div>
    </div>
   {/* end::Menu */}
  </></div>
  )
}

export default ChangeStatus