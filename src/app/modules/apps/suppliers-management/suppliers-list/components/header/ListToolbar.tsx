import {useContext} from 'react'
import {AppContext} from '../../../../../../../AppContext'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {ListFilter} from './ListFilter'

const ListToolbar = () => {
  const {hasPermission} = useContext(AppContext)
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {hasPermission('create_supplier') && (
        <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Ajouter
        </button>
      )}
      {/* end::Add user */}
    </div>
  )
}

export {ListToolbar}
